import 'server-only'
 
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'ar') => {
  if (!dictionaries[locale]) return dictionaries['en']();
  return dictionaries[locale]();
}
