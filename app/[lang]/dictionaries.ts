import { en } from '@/app/[lang]/dictionaries/en';
import { fr } from '@/app/[lang]/dictionaries/fr';
import { kw } from '@/app/[lang]/dictionaries/kw';

interface LangDictionary {
  en: Dict;
  fr: Dict;
  kw: Dict;
}

const dictionaries: LangDictionary = {
  en: en,
  fr: fr,
  kw: kw,
};

export const getDictionary = (lang: Lang) => {
  return dictionaries[lang];
};
