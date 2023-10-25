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
  const dictionaryFunction = dictionaries[lang];
  if (typeof dictionaryFunction === 'function') {
    return await dictionaryFunction();
  }
  return {}; // Return an empty object or handle the error as needed.
};
