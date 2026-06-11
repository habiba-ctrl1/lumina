export function getCityImage(city: string): string {
  const c = city.toLowerCase();
  if (c === 'riyadh') {
    return 'https://images.unsplash.com/photo-1588325608775-680456cc1b91?auto=format&fit=crop&q=80&w=2000'; // Riyadh skyline/corporate
  }
  if (c === 'jeddah') {
    return 'https://images.unsplash.com/photo-1590559899731-a38283b15696?auto=format&fit=crop&q=80&w=2000'; // Jeddah coastal
  }
  if (c === 'alula') {
    return 'https://images.unsplash.com/photo-1627914856002-861c296684aa?auto=format&fit=crop&q=80&w=2000'; // AlUla desert/heritage
  }
  if (c === 'madinah' || c === 'medina') {
    return '/madinah_prophets_mosque.webp'; // Al-Masjid an-Nabawi, Madinah
  }
  if (c === 'makkah' || c === 'mecca') {
    return '/makkah_kaaba_heritage.webp'; // Masjid al-Haram, Makkah
  }
  if (c === 'dammam' || c === 'alkhobar' || c === 'khobar') {
    return 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2000'; // Corporate hub / eastern province
  }
  return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000'; // Default high-end event
}

export function getServiceImage(service: string): string {
  const s = service.toLowerCase();
  if (s.includes('corporate') || s.includes('conference') || s.includes('seminar') || s.includes('exhibition')) {
    return 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000'; // Corporate
  }
  if (s.includes('royal-wedding')) {
    return 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000'; // Royal wedding
  }
  if (s.includes('wedding')) {
    return 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000'; // Premium wedding
  }
  if (s.includes('cultural') || s.includes('majlis') || s.includes('heritage')) {
    return 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&q=80&w=2000'; // Cultural/Heritage
  }
  if (s.includes('destination')) {
    return 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000'; // Destination
  }
  return 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=2000'; // Default
}

export function getCityServiceImage(city: string, service: string): string {
  const c = city.toLowerCase();
  const s = service.toLowerCase();
  
  if (s.includes('wedding')) {
    if (c === 'jeddah') return 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=2000'; // Beach wedding
    if (c === 'alula') return 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=2000'; // Desert wedding
    return 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000'; // Standard luxury wedding
  }
  
  if (s.includes('corporate') || s.includes('conference')) {
    if (c === 'riyadh') return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000'; // Riyadh corporate
    if (c === 'dammam' || c === 'alkhobar') return 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000'; // Dammam corporate
    return 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000';
  }

  return getServiceImage(service);
}
