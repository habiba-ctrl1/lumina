const GRAPH_API_VERSION = 'v21.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;
const IG_API_BASE = `https://graph.instagram.com/${GRAPH_API_VERSION}`;

interface SocialPostInput {
  imageUrl: string;
  caption: string;
}

interface SocialPostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

// The stored FACEBOOK_PAGE_ACCESS_TOKEN is a long-lived System User token.
// To publish AS the Page we must exchange it for the Page's own access token.
async function getPageToken(): Promise<string | null> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const sysToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !sysToken) return null;
  const res = await fetch(`${GRAPH_API_BASE}/${pageId}?fields=access_token&access_token=${sysToken}`);
  const data = await res.json();
  return data.access_token || null;
}

// Publishes a photo to the Facebook Page. Returns { success, postId } plus the
// photo node id, which we reuse to derive a JPEG URL for Instagram.
export async function postToFacebook(
  { imageUrl, caption }: SocialPostInput,
): Promise<SocialPostResult & { photoId?: string; pageToken?: string }> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageToken = await getPageToken();
  if (!pageId || !pageToken) {
    return { success: false, error: 'Missing/invalid FACEBOOK_PAGE_ID or FACEBOOK_PAGE_ACCESS_TOKEN' };
  }

  const res = await fetch(`${GRAPH_API_BASE}/${pageId}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: imageUrl, caption, access_token: pageToken }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { success: false, error: data?.error?.message || 'Facebook post failed' };
  }
  return { success: true, postId: data.post_id || data.id, photoId: data.id, pageToken };
}

// Instagram's publish API rejects .webp; Facebook stores every uploaded photo as
// JPEG on its CDN, so we reuse that JPEG URL. When Facebook was posted alongside
// (photoId given) we reuse that photo; otherwise (Instagram-only) we upload the
// image to the Page UNPUBLISHED just to obtain the JPEG — no visible FB post.
async function toJpegUrl(originalUrl: string, photoId?: string, pageToken?: string): Promise<string> {
  if (photoId && pageToken) {
    try {
      const res = await fetch(`${GRAPH_API_BASE}/${photoId}?fields=images&access_token=${pageToken}`);
      const data = await res.json();
      if (data.images && data.images.length) return data.images[0].source;
    } catch {
      /* fall through */
    }
    return originalUrl;
  }

  // Instagram-only path: convert via an unpublished FB upload.
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = await getPageToken();
  if (!pageId || !token) return originalUrl;
  try {
    const up = await fetch(`${GRAPH_API_BASE}/${pageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: originalUrl, published: false, access_token: token }),
    });
    const upData = await up.json();
    if (!up.ok || !upData.id) return originalUrl;
    const jpegRes = await fetch(`${GRAPH_API_BASE}/${upData.id}?fields=images&access_token=${token}`);
    const jpegData = await jpegRes.json();
    if (jpegData.images && jpegData.images.length) return jpegData.images[0].source;
  } catch {
    /* fall through */
  }
  return originalUrl;
}

export async function postToInstagram(
  { imageUrl, caption }: SocialPostInput,
  fbPhotoId?: string,
  fbPageToken?: string,
): Promise<SocialPostResult> {
  const igUserId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!igUserId || !accessToken) {
    return { success: false, error: 'Missing INSTAGRAM_USER_ID or INSTAGRAM_ACCESS_TOKEN' };
  }

  const jpegUrl = await toJpegUrl(imageUrl, fbPhotoId, fbPageToken);

  const createRes = await fetch(`${IG_API_BASE}/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: jpegUrl, caption, access_token: accessToken }),
  });
  const createData = await createRes.json();
  if (!createRes.ok) {
    return { success: false, error: createData?.error?.message || 'Instagram media container failed' };
  }

  // The container needs a moment to process before it can be published, or the
  // publish call fails with "Media ID is not available". Poll until it's ready.
  for (let i = 0; i < 12; i++) {
    const statusRes = await fetch(`${IG_API_BASE}/${createData.id}?fields=status_code&access_token=${accessToken}`);
    const statusData = await statusRes.json();
    if (statusData.status_code === 'FINISHED') break;
    if (statusData.status_code === 'ERROR') {
      return { success: false, error: 'Instagram could not process the image' };
    }
    await new Promise((r) => setTimeout(r, 3000));
  }

  const publishRes = await fetch(`${IG_API_BASE}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: createData.id, access_token: accessToken }),
  });
  const publishData = await publishRes.json();
  if (!publishRes.ok) {
    return { success: false, error: publishData?.error?.message || 'Instagram publish failed' };
  }
  return { success: true, postId: publishData.id };
}

// Posts to both platforms. Instagram reuses Facebook's JPEG-converted image, so
// FB runs first; if only IG is requested we upload the original URL directly.
export async function publishToSocial(
  input: SocialPostInput,
  platforms: Array<'facebook' | 'instagram'>,
): Promise<Record<string, SocialPostResult>> {
  const results: Record<string, SocialPostResult> = {};
  let fbPhotoId: string | undefined;
  let fbPageToken: string | undefined;

  if (platforms.includes('facebook')) {
    const fb = await postToFacebook(input);
    results.facebook = { success: fb.success, postId: fb.postId, error: fb.error };
    fbPhotoId = fb.photoId;
    fbPageToken = fb.pageToken;
  }
  if (platforms.includes('instagram')) {
    results.instagram = await postToInstagram(input, fbPhotoId, fbPageToken);
  }
  return results;
}
