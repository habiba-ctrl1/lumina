// Hero images restored to the 2eedc7c (Jun 10) local assets.
// Previously these returned Unsplash stock URLs; now they map to the same
// local /public webp images the dynamic city + city/service pages used in 2eedc7c.

const DEFAULT_IMAGE = "/riyadh_summit_people.webp";

// Matches CITY_IMAGES from locations/[city]/page.tsx @ 2eedc7c
const CITY_IMAGES: Record<string, string> = {
  riyadh:  "/riyadh_summit_people.webp",
  jeddah:  "/jeddah_luxury_people.webp",
  dammam:  "/gallery_corporate_gala.webp",
  alkhobar:"/alkhobar-hero.webp",
  khobar:  "/alkhobar-hero.webp",
  alula:   "/alula_gala_people.webp",
  neom:    "/neom-hero.webp",
  makkah:  "/majlis_gathering_people.webp",
  madinah: "/madinah-hero.webp",
  taif:    "/taif-hero.webp",
  abha:    "/abha-hero.webp",
  diriyah: "/diriyah-hero.webp",
  tabuk:   "/tabuk-hero.webp",
};

// Matches the per-city heroImage map from locations/[city]/[service]/page.tsx @ 2eedc7c
const CITY_SERVICE_IMAGES: Record<string, string> = {
  riyadh:  "/riyadh_summit_people.webp",
  jeddah:  "/gallery_destination_wedding.webp",
  dammam:  "/gallery_corporate_gala.webp",
  alula:   "/alula_gala_people.webp",
  neom:    "/neom-hero.webp",
  alkhobar:"/alkhobar-hero.webp",
  khobar:  "/alkhobar-hero.webp",
  makkah:  "/majlis_gathering_people.webp",
  madinah: "/madinah-hero.webp",
  taif:    "/taif-hero.webp",
  abha:    "/abha-hero.webp",
  diriyah: "/diriyah-hero.webp",
  tabuk:   "/tabuk-hero.webp",
};

export function getCityImage(city: string): string {
  return CITY_IMAGES[city.toLowerCase()] ?? DEFAULT_IMAGE;
}

export function getServiceImage(service: string): string {
  const s = service.toLowerCase();
  if (s.includes('wedding')) return "/luxury_wedding_couple_guests.webp";
  if (s.includes('cultural') || s.includes('majlis') || s.includes('heritage')) return "/majlis_gathering_people.webp";
  if (s.includes('destination')) return "/alula_gala_people.webp";
  return "/gallery_corporate_gala.webp";
}

export function getCityServiceImage(city: string, service: string): string {
  return CITY_SERVICE_IMAGES[city.toLowerCase()] ?? getServiceImage(service);
}
