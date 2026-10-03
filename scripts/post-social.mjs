import { readFileSync } from 'fs';

function loadEnv(path) {
  const lines = readFileSync(path, 'utf-8').split('\n');
  for (const line of lines) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) process.env[match[1]] = match[2].trim();
  }
}
loadEnv('.env.local');

const FB_BASE = 'https://graph.facebook.com/v21.0';
const IG_BASE = 'https://graph.instagram.com/v21.0';
const SITE = 'https://saudieventmanagement.com';

// Realistic, site-vetted photo (real wedding) + varied caption.
const imageUrl = `${SITE}/services/luxury_wedding_couple_guests.webp`;
const caption = `💍 Dreaming of a wedding no one forgets?

From AlUla's ancient canyons to private Red Sea islands, Saudi Arabia has become the world's most exciting luxury wedding destination — exclusive venues, designer décor, and VIP guest experiences.

📖 Read the full guide 👉 saudieventmanagement.com/blog/luxury-weddings-saudi-arabia-destination

📲 WhatsApp for a private consultation: +966 53 938 8072

#LuxuryWeddings #SaudiWedding #DestinationWedding #AlUla #RedSea #SaudiArabia #SaudiEventManagement`;

// The stored FACEBOOK_PAGE_ACCESS_TOKEN is a System User token — exchange it for
// the Page's own token so we publish AS the Page.
async function getPageToken() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const sysToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const res = await fetch(`${FB_BASE}/${pageId}?fields=access_token&access_token=${sysToken}`);
  const data = await res.json();
  return data.access_token || null;
}

async function postToFacebook() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageToken = await getPageToken();
  if (!pageToken) return { error: 'Could not resolve Page token' };
  const res = await fetch(`${FB_BASE}/${pageId}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: imageUrl, caption, access_token: pageToken }),
  });
  const data = await res.json();
  console.log('Facebook:', res.ok ? `posted (id: ${data.post_id || data.id})` : JSON.stringify(data));
  return { ok: res.ok, photoId: data.id, pageToken };
}

// IG rejects .webp; FB stores every photo as JPEG, so reuse that JPEG URL.
async function jpegFromFbPhoto(photoId, pageToken) {
  if (!photoId || !pageToken) return imageUrl;
  const res = await fetch(`${FB_BASE}/${photoId}?fields=images&access_token=${pageToken}`);
  const data = await res.json();
  return data.images?.[0]?.source || imageUrl;
}

async function postToInstagram(fbPhotoId, fbPageToken) {
  const igUserId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const jpegUrl = await jpegFromFbPhoto(fbPhotoId, fbPageToken);

  const createRes = await fetch(`${IG_BASE}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: jpegUrl, caption, access_token: accessToken }),
  });
  const createData = await createRes.json();
  if (!createRes.ok) {
    console.log('Instagram (container):', JSON.stringify(createData));
    return;
  }

  // The container needs a moment to process before it can be published.
  for (let i = 0; i < 12; i++) {
    const statusRes = await fetch(`${IG_BASE}/${createData.id}?fields=status_code&access_token=${accessToken}`);
    const statusData = await statusRes.json();
    if (statusData.status_code === 'FINISHED') break;
    if (statusData.status_code === 'ERROR') {
      console.log('Instagram (container error):', JSON.stringify(statusData));
      return;
    }
    await new Promise((r) => setTimeout(r, 3000));
  }

  const publishRes = await fetch(`${IG_BASE}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: createData.id, access_token: accessToken }),
  });
  const publishData = await publishRes.json();
  console.log('Instagram:', publishRes.ok ? `posted (id: ${publishData.id})` : JSON.stringify(publishData));
}

const fb = await postToFacebook();
await postToInstagram(fb?.photoId, fb?.pageToken);
