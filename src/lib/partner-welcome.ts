// Welcome email for a newly-approved partner. The text is generated as an
// editable draft in the admin panel — nothing sends until the founder clicks
// Send. Deliberately makes NO website-placement promise (site listing is a
// separate SEO decision) and restates the non-circumvention understanding.

export function buildPartnerWelcome({
  contactPerson,
  companyName,
}: {
  contactPerson?: string | null;
  companyName?: string | null;
}): { subject: string; body: string } {
  const name = (contactPerson || '').trim() || 'there';
  const company = (companyName || '').trim() || 'your company';

  const subject = 'Welcome to the Saudi Event Management partner network';
  const body = [
    `Dear ${name},`,
    ``,
    `Thank you for registering with Saudi Event Management. We're pleased to confirm that ${company} has been added to our vetted partner network.`,
    ``,
    `Here's what this means:`,
    `• When a client project matches your services and coverage, we'll reach out to you directly with the brief and request your best quote.`,
    `• All client quotations are issued by SEM. Under our non-circumvention understanding, client contact and pricing stay within SEM — this protects both sides and keeps every partner on equal footing.`,
    `• There's nothing you need to do right now. Keep your profile and rate card current with us, and we'll be in touch as matching opportunities come up.`,
    ``,
    `We look forward to working together.`,
    ``,
    `Warm regards,`,
    `Saudi Event Management`,
    `info@saudieventmanagement.com`,
  ].join('\n');

  return { subject, body };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Wrap the (possibly edited) plain-text draft in a light branded shell for the
// HTML part of the email. Newlines become <br> so the founder's edits render
// exactly as typed.
export function welcomeTextToHtml(text: string): string {
  const safe = escapeHtml(text).replace(/\n/g, '<br>');
  return `<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background:#ffffff; border:1px solid #eaeaea; border-radius:8px;">
  <div style="text-align:center; margin-bottom:32px;">
    <h1 style="color:#000000; font-size:20px; font-weight:300; letter-spacing:2px; text-transform:uppercase; margin:0;">Saudi Event Management</h1>
    <div style="width:40px; height:2px; background:#c5a059; margin:16px auto 0;"></div>
  </div>
  <div style="color:#4a4a4a; font-size:15px; line-height:1.8;">${safe}</div>
</div>`;
}
