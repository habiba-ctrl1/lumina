"""
email-intake.py — write classified inbox emails into the SEM pipeline.

Called by the daily "SEM email intake" scheduled task (Claude desktop app), which
reads Gmail read-only, classifies each new thread, and pipes a JSON list here:

    python scripts/email-intake.py < classified.json

Each item: {gmailThreadId, gmailMessageId, senderEmail, senderName?, companyName?,
  subject?, summary, category: ClientInquiry|ClientReply|Partnership|CV|Spam|Uncertain,
  suggestedAction?, attachmentNames?, phone?, eventType?, eventCity?, eventDate? (YYYY-MM-DD),
  guestCount?, budgetMin?, budgetMax?}

Rules (all idempotent — safe to re-run on the same emails):
  * Every item is upserted into EmailLead by gmailThreadId.
  * ClientInquiry / ClientReply whose sender already has a SEM deal (QuoteRequest.clientEmail)
    -> adds a 'client_reply' timeline entry, bumps lastContactAt and makes the deal due today.
  * ClientInquiry from a new sender on a thread not seen before -> creates a new deal
    (channel=email, stage=new, due today).
  * Everything else (vendors, CVs, spam) stays in EmailLead only.
Reads Supabase credentials from the main checkout's .env.local. Never sends email.
"""
import json, re, sys, uuid, urllib.request, urllib.parse, datetime

ENV_FILE = r'C:\Users\786\Documents\WEBSITES\event management\.env.local'
env = {}
for l in open(ENV_FILE, encoding='utf8'):
    m = re.match(r'\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?', l)
    if m: env[m[1]] = m[2].strip()
URL = env['NEXT_PUBLIC_SUPABASE_URL'].rstrip('/') + '/rest/v1/'
KEY = env['SUPABASE_SERVICE_ROLE_KEY']

def call(method, path, body=None, prefer='return=representation'):
    req = urllib.request.Request(URL + path, method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={'apikey': KEY, 'Authorization': 'Bearer ' + KEY,
                 'Content-Type': 'application/json', 'Prefer': prefer})
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read()
        return json.loads(raw) if raw else None

q = lambda v: urllib.parse.quote(str(v), safe='')
now = datetime.datetime.utcnow()
iso = lambda d: d.isoformat() + 'Z'
today_end = iso(now.replace(hour=20, minute=0, second=0, microsecond=0))
CLIENT = {'ClientInquiry', 'ClientReply'}
ALLOWED = {'ClientInquiry', 'Partnership', 'CV', 'Spam', 'Uncertain'}

items = json.load(sys.stdin)
report = []
for it in items:
    thread, sender = it['gmailThreadId'], it['senderEmail'].strip().lower()
    seen = call('GET', f'EmailLead?select=id&gmailThreadId=eq.{q(thread)}')
    category = it.get('category', 'Uncertain')
    lead = {
        'gmailThreadId': thread, 'gmailMessageId': it['gmailMessageId'], 'senderEmail': sender,
        'senderName': it.get('senderName'), 'companyName': it.get('companyName'),
        'subject': (it.get('subject') or '')[:500], 'summary': (it.get('summary') or '')[:2000],
        'category': category if category in ALLOWED else 'ClientInquiry' if category == 'ClientReply' else 'Uncertain',
        'suggestedAction': it.get('suggestedAction'), 'attachmentNames': it.get('attachmentNames'),
        'updatedAt': iso(now),
    }
    if seen:
        call('PATCH', f'EmailLead?gmailThreadId=eq.{q(thread)}', lead, prefer='return=minimal')
    else:
        call('POST', 'EmailLead', {'id': str(uuid.uuid4()), **lead}, prefer='return=minimal')

    if category not in CLIENT:
        report.append(f'- {category}: {it.get("senderName") or sender} — {it.get("subject")}')
        continue

    deals = call('GET', f'QuoteRequest?select=id,clientName,stage&business=eq.SEM&clientEmail=ilike.{q(sender)}&order=createdAt.desc&limit=1')
    summary = f'Email: {it.get("subject") or "(no subject)"} — {it.get("summary") or ""}'.strip()
    if deals:
        d = deals[0]
        call('POST', 'LeadUpdate', {'id': str(uuid.uuid4()), 'requestId': d['id'], 'kind': 'client_reply',
                                    'author': it.get('senderName') or sender, 'channel': 'email', 'summary': summary[:2000]},
             prefer='return=minimal')
        call('PATCH', f'QuoteRequest?id=eq.{d["id"]}', {'lastContactAt': iso(now), 'nextActionAt': today_end,
             'nextAction': f'Reply to email: {(it.get("subject") or "")[:120]}', 'updatedAt': iso(now)}, prefer='return=minimal')
        report.append(f'- UPDATE on existing deal "{d["clientName"]}" ({d["stage"]}): {it.get("subject")}')
    elif not seen:
        rid = str(uuid.uuid4())
        call('POST', 'QuoteRequest', {
            'id': rid, 'business': 'SEM', 'channel': 'email', 'stage': 'new', 'source': 'email_intake', 'status': 'pending',
            'clientName': it.get('senderName') or sender, 'clientEmail': sender, 'clientPhone': it.get('phone') or '---',
            'clientCompany': it.get('companyName'), 'eventType': it.get('eventType') or 'Event',
            'eventCity': it.get('eventCity') or 'TBC',
            'eventDate': (it['eventDate'] + 'T09:00:00.000Z') if it.get('eventDate') else None,
            'guestCount': it.get('guestCount'), 'budgetMin': it.get('budgetMin'), 'budgetMax': it.get('budgetMax'),
            'budgetKnown': bool(it.get('budgetMin') or it.get('budgetMax')),
            'requirements': (it.get('summary') or '')[:4000],
            'nextAction': 'Qualify (date, city, pax, budget, decision-maker) and reply to the email',
            'nextActionAt': today_end, 'updatedAt': iso(now),
        }, prefer='return=minimal')
        call('POST', 'LeadUpdate', {'id': str(uuid.uuid4()), 'requestId': rid, 'kind': 'note', 'author': 'SEM',
                                    'channel': 'email', 'summary': summary[:2000]}, prefer='return=minimal')
        report.append(f'- NEW DEAL: {it.get("senderName") or sender} — {it.get("subject")}')
    else:
        report.append(f'- (already captured) {it.get("senderName") or sender} — {it.get("subject")}')

print('\n'.join(report) or 'Nothing to record.')
