/**
 * Non-destructive one-off: rewrite legacy .png/.jpg/.jpeg image paths stored in
 * the local Prisma DB to their .webp equivalents.
 *
 * Safety guarantees:
 *  - No rows are ever deleted or created. Only the `url` string is updated.
 *  - A row is only updated when the target .webp file actually exists in /public,
 *    so we never point the DB at a missing asset.
 *  - Idempotent: re-running it does nothing once everything is already .webp.
 *
 * Run with:  node scripts/fix-image-extensions.mjs
 */
import { PrismaClient } from '@prisma/client';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const LEGACY_EXT = /\.(png|jpe?g)$/i;

/** Map a "/foo/bar.png" public path to its .webp twin, or null if no twin on disk. */
function webpTwin(url) {
  if (typeof url !== 'string' || !LEGACY_EXT.test(url)) return null;
  const webpUrl = url.replace(LEGACY_EXT, '.webp');
  const onDisk = path.join(PUBLIC_DIR, webpUrl.replace(/^\//, ''));
  return existsSync(onDisk) ? webpUrl : null;
}

async function main() {
  // MediaAsset is the actual image store read by the gallery API (/api/gallery).
  const assets = await prisma.mediaAsset.findMany({ select: { id: true, url: true } });

  const changes = [];
  const skipped = [];
  for (const a of assets) {
    if (!LEGACY_EXT.test(a.url || '')) continue;
    const next = webpTwin(a.url);
    if (next) changes.push({ id: a.id, from: a.url, to: next });
    else skipped.push(a.url); // legacy ext but no .webp file on disk — left untouched
  }

  console.log(`Scanned ${assets.length} MediaAsset row(s).`);
  if (assets.length === 0) {
    console.log('Database has no media assets — nothing to update (no-op).');
  }

  for (const c of changes) {
    await prisma.mediaAsset.update({ where: { id: c.id }, data: { url: c.to } });
    console.log(`  updated ${c.from}  ->  ${c.to}`);
  }

  if (skipped.length) {
    console.log(`\nLeft untouched (no .webp twin found on disk):`);
    for (const s of skipped) console.log(`  ${s}`);
  }

  console.log(`\nDone. ${changes.length} row(s) updated, ${skipped.length} skipped.`);
}

main()
  .catch((e) => {
    console.error('Failed:', e.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
