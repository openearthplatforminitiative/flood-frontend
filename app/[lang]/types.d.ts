interface PageProps {
  lang: string;
}

interface DashboardProps {
  dict: Dict;
}

interface LangDictionary {
  en: () => Promise<Dict>;
  fr: () => Promise<Dict>;
  kw: () => Promise<Dict>;
}

type Lang = 'en' | 'fr' | 'kw';

type Translator = (key: string) => string;

type Dict = {
  [key: string]: string;
};
