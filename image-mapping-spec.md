# Location Pages — Image Mapping & AI Asset Specification

> **Status:** Specification only. No images generated, replaced, or mapped into code yet.
> Use this document as the asset brief. Do **not** use random stock photos or placeholders —
> each slot below should be filled by a purpose-shot or AI-generated image matching the prompt.

---

## 1. Current hero image usage (per page → component)

| Page (route) | Component | Current image | Relevant? | Action |
|---|---|---|---|---|
| `/locations` (hub) | `InternalPageHero` | `/riyadh-hero.webp` | Partial (Riyadh-specific on a national page) | Replace with a national/multi-city composite |
| `/locations/riyadh` | `InternalPageHero` + Why/Team `<Image>` | `/riyadh_summit_people.webp` | Yes (corporate summit) | Keep; add Kingdom Centre / KAFD skyline option |
| `/locations/jeddah` | `InternalPageHero` | `/jeddah_luxury_people.webp` | Partial | Add Corniche / Red Sea waterfront image |
| `/locations/dammam` | `InternalPageHero` | `/alkhobar_corporate_people.webp` | Yes (Eastern Province corporate) | Keep; add Gulf waterfront option |
| `/locations/makkah` | `InternalPageHero` | `/gallery_corporate_gala.webp` | **No — generic gala, not Makkah** | Replace with Makkah-specific image |
| `/locations/alula` | `InternalPageHero` + glass quote | `/alula_gala_people.webp` | Partial | Add Maraya / Hegra / desert landscape |
| `/locations/[city]` (dynamic) | `InternalPageHero` via `heroImage` | per-city variable | Varies | Provide per-city hero set |
| `/locations/[city]/[service]` | Dark hero bg via `getCityServiceImage()` | per city+service | Varies (low-opacity bg) | Lower priority; reuse city hero |

---

## 2. Pages needing new / dedicated images (priority order)

1. **Makkah** — currently uses a generic gala photo. Highest priority replacement.
2. **Locations hub** — uses a Riyadh-only photo on a Kingdom-wide page.
3. **Jeddah** — needs a true Corniche / Red Sea identity image.
4. **AlUla** — needs Maraya / Hegra / desert identity image (current is a generic gala).
5. **Per-city dynamic heroes** (Madinah, Al Khobar, NEOM, Taif, Abha, Diriyah, Tabuk) — no dedicated city imagery.

---

## 3. AI image prompts (asset specification)

> Shared style suffix for every prompt:
> *"Professional editorial event photography, natural golden-hour lighting, ultra-sharp,
> high dynamic range, photorealistic, 16:9, 2400×1350px minimum, no text, no watermark,
> tasteful and culturally respectful of Saudi Arabia."*

### 3.1 Riyadh
- **Hero / skyline:** "Riyadh skyline at dusk featuring the Kingdom Centre tower and KAFD financial district, modern glass towers glowing, a polished corporate event terrace in the foreground with elegantly dressed guests, Najdi-modern architectural accents."
- **Corporate district:** "King Abdullah Financial District (KAFD) at blue hour, contemporary Saudi business towers, professional conference signage area, sophisticated and clean."

### 3.2 Jeddah
- **Hero / Corniche:** "Jeddah Corniche on the Red Sea at sunset, the King Fahd Fountain in the distance, an elegant waterfront gala setup with white drapery and warm lighting, palm trees, coral-stone Hijazi architectural motifs."
- **Red Sea evening:** "Luxury outdoor wedding reception on the Jeddah waterfront, Red Sea horizon, soft lanterns, refined coastal elegance at twilight."

### 3.3 Dammam / Eastern Province
- **Hero / Gulf waterfront:** "Arabian Gulf waterfront in Al Khobar / Dammam at golden hour, modern corniche, a corporate energy-sector conference reception, sleek and professional, calm Gulf water reflecting warm light."

### 3.4 Makkah (replace generic image)
- **Hero (respectful, non-sacred framing):** "Modern Makkah cityscape with contemporary towers on the hillsides at dusk, an elegant indoor corporate conference hall with Islamic geometric design, refined and dignified atmosphere, culturally respectful — no depiction of the Holy Mosque interior."

### 3.5 AlUla
- **Hero / Maraya:** "The mirrored Maraya Concert Hall in AlUla reflecting the desert canyon at sunset, an elegant outdoor event setup nearby, dramatic sandstone cliffs, surreal natural beauty."
- **Hegra / desert landscape:** "Nabataean tombs of Hegra and Elephant Rock in AlUla at golden hour, a candlelit private desert dinner setup, warm sand tones, world-class destination-wedding atmosphere."

### 3.6 Per-city dynamic heroes (one each, same style suffix)
- **Madinah:** "Madinah modern skyline at dusk, contemporary architecture, dignified corporate event ambiance, culturally respectful."
- **Al Khobar:** "Al Khobar corniche on the Arabian Gulf at sunset, modern waterfront, upscale corporate reception."
- **NEOM:** "Futuristic NEOM coastal landscape on the Red Sea, cutting-edge sustainable architecture, premium launch-event staging."
- **Taif:** "Taif mountain landscape with rose gardens and cool highland light, elegant outdoor event setup."
- **Abha:** "Abha green mountains and misty Asir highlands at golden hour, refined cultural event setup."
- **Diriyah:** "At-Turaif mud-brick heritage district in Diriyah illuminated at night, a heritage gala with Najdi architecture and warm lighting."
- **Tabuk:** "Tabuk desert-and-mountain landscape at sunrise, modern event marquee, clean and expansive."

---

## 4. Parallax / performance notes

- Hero parallax is already implemented in `InternalPageHero` and is **desktop-only + `prefers-reduced-motion` aware** (no mobile cost, no layout shift).
- Deliver all images as **WebP**, ≤ 300 KB where possible, with explicit dimensions to preserve LCP.
- Recommended hero render width: 2400×1350 (16:9); the component uses `sizes="100vw"` with `priority`.
