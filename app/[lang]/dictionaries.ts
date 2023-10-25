interface LangDictionary {
  en: () => Promise<Dict>;
  fr: () => Promise<Dict>;
  kw: () => Promise<Dict>;
}

const dictionaries: LangDictionary = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  kw: () => import('./dictionaries/kw.json').then((module) => module.default),
};

export const getDictionary = async (lang: Lang) => {
  return dictionaries[lang]();
};

export const acceptedLocales: string[] = ['en', 'fr', 'kw'];
