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

export const getFromDictionary = (
  keys: Array<string>,
  dict: Dict | string
): Dict | string => {
  if (typeof dict == 'string') {
    return dict;
  }

  if (keys.length === 0) {
    return '';
  }

  if (!dict) {
    return '';
  }
  const key = keys.shift() || '';
  return getFromDictionary(keys, dict[key]);
};

export const t = (key: string, dict: Dict): string => {
  if (!key) {
    return '';
  }
  const keys = key.split('.');
  const ret = getFromDictionary(keys, dict);

  if (!ret) {
    return key;
  }
  if (typeof ret !== 'string') {
    console.error('getFromDict returner a ', typeof ret);
    return key;
  }

  return ret;
};
