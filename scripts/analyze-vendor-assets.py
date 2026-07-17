"""
SEM Vendor Asset Analyzer
=========================
Scans a vendor's raw asset folder (photos, PDFs, videos) and produces a report
that tells you what's usable on saudieventmanagement.com and how.

Usage:
    python scripts/analyze-vendor-assets.py "SEM VENDOR DETAILS/<vendor folder>"

Output (written INSIDE the vendor folder, which is gitignored business data):
    <vendor folder>/_sem-analysis/report.md      — human-readable report
    <vendor folder>/_sem-analysis/report.json    — machine-readable inventory
    <vendor folder>/_sem-analysis/pdf-images/    — images extracted from PDFs

What it checks per image:
    - dimensions + orientation (web-usability: hero / gallery / thumbnail tier)
    - file size
    - sharpness score (edge stddev — low = blurry/soft)
    - near-duplicates (perceptual average-hash) so you don't publish repeats

What it does per PDF:
    - extracts all text (services, clients, capabilities — proposal intel)
    - extracts embedded photos (often higher quality than WhatsApp images!)
    - flags brand/IP words (Disney, Marvel, …) that must NOT go on the public site

SEO + protection rules baked in:
    - suggests SEO filenames from a searched-keyword map, per detected category
    - NEVER puts the vendor's name in suggested public filenames/alt text
      (non-circumvention: clients must not be able to identify/contact vendors)
"""

import io
import json
import re
import sys
from datetime import date
from pathlib import Path

from PIL import Image, ImageFilter, ImageStat
from pypdf import PdfReader

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp"}
VIDEO_EXT = {".mp4", ".mov", ".avi", ".mkv"}

# Words that mean licensed IP — assets showing these are proposal-only, never public.
IP_FLAGS = ["disney", "mickey", "minnie", "marvel", "pixar", "warner", "barbie",
            "pokemon", "nintendo", "universal", "netflix", "nickelodeon", "dc fan",
            "fan zone", "paramount", "sesame"]

# Category detection: keyword → SEM category. Matched against PDF text + filenames.
CATEGORY_KEYWORDS = {
    "Exhibition Stands": ["exhibition", "stand", "booth", "pavilion", "expo"],
    "Event Production": ["production", "stage", "staging", "fabrication", "scenography",
                          "build", "structure", "install"],
    "Wedding & Luxury Decor": ["wedding", "floral", "flower", "decor", "gala", "luxury"],
    "AV & LED": ["led", "screen", "audio", "visual", "sound", "lighting"],
    "Entertainment/Family": ["family", "kids", "entertainment", "theme", "character"],
    "Catering": ["catering", "buffet", "food"],
}

# SEO filename stems per category — REAL searched terms (KSA commercial intent).
# These become <stem>-<n>.webp; vendor name must never appear.
SEO_FILENAME_STEMS = {
    "Exhibition Stands": "exhibition-stand-design-saudi-arabia",
    "Event Production": "event-production-company-saudi-arabia",
    "Wedding & Luxury Decor": "luxury-wedding-decoration-saudi-arabia",
    "AV & LED": "led-screen-rental-event-saudi-arabia",
    "Entertainment/Family": "family-event-production-saudi-arabia",
    "Catering": "event-catering-saudi-arabia",
    "General": "event-management-company-saudi-arabia",
}


def sharpness_score(img: Image.Image) -> float:
    """Edge-energy proxy for focus. >12 crisp, 6–12 usable, <6 soft/blurry."""
    g = img.convert("L")
    if max(g.size) > 1200:  # downscale for speed, keeps score comparable
        g.thumbnail((1200, 1200))
    edges = g.filter(ImageFilter.FIND_EDGES)
    return round(ImageStat.Stat(edges).stddev[0], 1)


def ahash(img: Image.Image) -> int:
    """64-bit average hash for near-duplicate detection."""
    g = img.convert("L").resize((8, 8), Image.LANCZOS)
    px = list(g.getdata())
    avg = sum(px) / 64
    bits = 0
    for i, p in enumerate(px):
        if p > avg:
            bits |= 1 << i
    return bits


def hamming(a: int, b: int) -> int:
    return bin(a ^ b).count("1")


def web_tier(w: int, h: int) -> str:
    long_side = max(w, h)
    if long_side >= 1920:
        return "hero-capable"
    if long_side >= 1100:
        return "gallery"
    if long_side >= 600:
        return "thumbnail-only"
    return "too-small"


def analyze_images(folder: Path):
    results = []
    for f in sorted(folder.iterdir()):
        if f.suffix.lower() not in IMAGE_EXT:
            continue
        try:
            with Image.open(f) as img:
                w, h = img.size
                results.append({
                    "file": f.name,
                    "width": w,
                    "height": h,
                    "kb": round(f.stat().st_size / 1024),
                    "orientation": "landscape" if w >= h else "portrait",
                    "tier": web_tier(w, h),
                    "sharpness": sharpness_score(img),
                    "ahash": ahash(img),
                })
        except Exception as e:
            results.append({"file": f.name, "error": str(e)})
    # near-duplicate grouping (hamming distance <= 5)
    for i, a in enumerate(results):
        if "ahash" not in a:
            continue
        for b in results[:i]:
            if "ahash" in b and hamming(a["ahash"], b["ahash"]) <= 5:
                a["duplicate_of"] = b["file"]
                break
    for r in results:
        r.pop("ahash", None)
    return results


def analyze_pdf(pdf_path: Path, img_out: Path, max_images=40):
    """Extract text + embedded images. Returns summary dict."""
    info = {"file": pdf_path.name, "pages": 0, "text_chars": 0,
            "ip_flags": [], "categories": [], "extracted_images": [], "text_excerpt": ""}
    try:
        reader = PdfReader(str(pdf_path))
        info["pages"] = len(reader.pages)
        all_text = []
        img_count = 0
        stem = re.sub(r"[^a-z0-9]+", "-", pdf_path.stem.lower())[:40]
        for pno, page in enumerate(reader.pages, 1):
            try:
                all_text.append(page.extract_text() or "")
            except Exception:
                pass
            if img_count >= max_images:
                continue
            try:
                for img in page.images:
                    if img_count >= max_images:
                        break
                    try:
                        pil = Image.open(io.BytesIO(img.data))
                        if max(pil.size) < 400:  # skip logos/icons
                            continue
                        out = img_out / f"{stem}-p{pno:02d}-{img_count:02d}.jpg"
                        pil.convert("RGB").save(out, "JPEG", quality=88)
                        info["extracted_images"].append({
                            "file": out.name, "page": pno,
                            "width": pil.size[0], "height": pil.size[1],
                            "tier": web_tier(*pil.size),
                        })
                        img_count += 1
                    except Exception:
                        continue
            except Exception:
                continue
        text = "\n".join(all_text)
        info["text_chars"] = len(text)
        low = text.lower()
        info["ip_flags"] = sorted({w for w in IP_FLAGS if w in low})
        info["categories"] = sorted({cat for cat, kws in CATEGORY_KEYWORDS.items()
                                     if any(k in low for k in kws)})
        info["text_excerpt"] = re.sub(r"\s+", " ", text)[:3000]
    except Exception as e:
        info["error"] = str(e)
    return info


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    folder = Path(sys.argv[1])
    if not folder.is_dir():
        print(f"Not a folder: {folder}")
        sys.exit(1)

    out_dir = folder / "_sem-analysis"
    pdf_img_dir = out_dir / "pdf-images"
    pdf_img_dir.mkdir(parents=True, exist_ok=True)

    images = analyze_images(folder)
    pdfs = [analyze_pdf(f, pdf_img_dir) for f in sorted(folder.iterdir())
            if f.suffix.lower() == ".pdf"]
    videos = [{"file": f.name, "mb": round(f.stat().st_size / 1e6, 1)}
              for f in sorted(folder.iterdir()) if f.suffix.lower() in VIDEO_EXT]

    # overall category guess (pdf text + folder name)
    cat_votes = {}
    for p in pdfs:
        for c in p.get("categories", []):
            cat_votes[c] = cat_votes.get(c, 0) + 1
    main_cat = max(cat_votes, key=cat_votes.get) if cat_votes else "General"

    usable = [i for i in images if "error" not in i
              and i["tier"] in ("hero-capable", "gallery")
              and i.get("sharpness", 0) >= 6 and "duplicate_of" not in i]

    report = {
        "vendor_folder": folder.name,
        "analyzed": date.today().isoformat(),
        "main_category_guess": main_cat,
        "category_votes": cat_votes,
        "counts": {"images": len(images), "usable_images": len(usable),
                   "pdfs": len(pdfs), "videos": len(videos)},
        "seo_filename_stem": SEO_FILENAME_STEMS.get(main_cat, SEO_FILENAME_STEMS["General"]),
        "images": images,
        "pdfs": pdfs,
        "videos": videos,
    }
    (out_dir / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    # markdown report
    lines = [
        f"# SEM Asset Analysis — {folder.name}",
        f"_Analyzed {report['analyzed']}_",
        "",
        "> ⚠️ PROTECTION RULES: never use the vendor's name in public filenames, alt text",
        "> or page copy. Frame as 'SEM partner network' work. Assets flagged with IP",
        "> (Disney etc.) are for private client proposals ONLY — never the public site.",
        "",
        f"**Main category guess:** {main_cat}",
        f"**Suggested SEO filename stem:** `{report['seo_filename_stem']}-<n>.webp`",
        f"**Totals:** {len(images)} images ({len(usable)} usable), {len(pdfs)} PDFs, {len(videos)} videos",
        "",
        "## Best images (usable, sharp, non-duplicate) — sorted by sharpness",
    ]
    for i in sorted(usable, key=lambda x: -x["sharpness"])[:20]:
        lines.append(f"- `{i['file']}` — {i['width']}×{i['height']} ({i['tier']}), sharpness {i['sharpness']}")
    dupes = [i for i in images if "duplicate_of" in i]
    if dupes:
        lines += ["", "## Near-duplicates (skip these)"]
        lines += [f"- `{i['file']}` ≈ `{i['duplicate_of']}`" for i in dupes]
    for p in pdfs:
        lines += ["", f"## PDF: {p['file']}",
                  f"- Pages: {p.get('pages')}, text: {p.get('text_chars')} chars, "
                  f"extracted images: {len(p.get('extracted_images', []))} (see pdf-images/)"]
        if p.get("categories"):
            lines.append(f"- Detected categories: {', '.join(p['categories'])}")
        if p.get("ip_flags"):
            lines.append(f"- 🚫 IP FLAGS: {', '.join(p['ip_flags'])} — proposal use only!")
        if p.get("text_excerpt"):
            lines += ["- Text excerpt:", "", "```", p["text_excerpt"][:1500], "```"]
    if videos:
        lines += ["", "## Videos"] + [f"- `{v['file']}` ({v['mb']} MB)" for v in videos]

    (out_dir / "report.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"Done. Report: {out_dir / 'report.md'}")
    print(f"Usable images: {len(usable)}/{len(images)} | PDFs: {len(pdfs)} | Main category: {main_cat}")


if __name__ == "__main__":
    main()
