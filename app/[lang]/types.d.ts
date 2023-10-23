interface PageProps {
  lang: string;
}

interface LangDictionary {
  en: () => Promise<Dict>;
  fr: () => Promise<Dict>;
  kw: () => Promise<Dict>;
}

type Lang = 'en' | 'fr' | 'kw';

type Dict = {
  [key: string]: string;
};
