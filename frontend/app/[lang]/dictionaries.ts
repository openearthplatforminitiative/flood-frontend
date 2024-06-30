import { en } from '@/app/[lang]/dictionaries/en';
import { fr } from '@/app/[lang]/dictionaries/fr';
import { kw } from '@/app/[lang]/dictionaries/kw';
import { FloodIntensity, FloodTiming } from '@/lib/openepi-clients';

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

export const defaultLocale = 'en';

export type Dict = {
  yes: string;
  no: string;
  cancel: string;
  confirm: string;
  title: string;
  signIn: string;
  signOut: string;
  back: string;
  signInPage: {
    description: string;
  };
  onBoarding: {
    allowNotifications: string;
    allowPushNotifications: string;
    allowSMSNotifications: string;
    buttons: {
      nextStep: string;
      createAccount: string;
    };
    sites: {
      sitesHeader: string;
      sitesInfo: string;
      addSite: string;
      addNewSite: string;
      addNewSiteInfo: string;
      updateSite: string;
      updateSiteInfo: string;
      setLocation: string;
      locationMessage: string;
      locationArea: string;
      saveChanges: string;
      deleteSite: string;
      deleteConfirmMessage: string;
      siteType: string;
      cropsType: string;
      livestockType: string;
      storageType: string;
      residentialType: string;
      industrialType: string;
      otherType: string;
      name: string;
      type: string;
      siteTypes: SiteTypeDict;
      errors: {
        nameRequired: string;
        typeRequired: string;
        locationRequired: string;
        locationInvalid: string;
      };
    };
  };
  languageSelection: { chooseLanguage: string };
  notifications: {
    sendNotification: string;
  };
  sites: {
    warningTitle: { [key in FloodIntensity]: string };
    urgency: { [key in FloodTiming]: string };
  };
};

export type SiteTypeDict = {
  poultry: string;
  goats: string;
  cattle: string;
  pigs: string;
  sheep: string;
  rabbits: string;
  avocado: string;
  beans: string;
  banana: string;
  coffee: string;
  maize: string;
  potato: string;
  rice: string;
  sugarcane: string;
  tea: string;
  wheat: string;
  storage: string;
  residential: string;
  industrial: string;
  other: string;
};

export type SiteType = keyof SiteTypeDict;

export const livestockTypes: SiteType[] = [
  'poultry',
  'goats',
  'cattle',
  'pigs',
  'sheep',
  'rabbits',
];

export const cropTypes: SiteType[] = [
  'avocado',
  'beans',
  'banana',
  'coffee',
  'maize',
  'potato',
  'rice',
  'sugarcane',
  'tea',
  'wheat',
];

export const propertyTypes: SiteType[] = [
  'storage',
  'residential',
  'industrial',
];

export type Lang = keyof LangDictionary;
export const languages: Lang[] = ['en', 'fr', 'kw'];
export const isLang = (x: any): x is Lang => languages.includes(x);

export const getDictionary = (lang: Lang) => {
  return dictionaries[lang];
};

export const getDictonaryWithDefault = (lang: string) => {
  return isLang(lang) ? getDictionary(lang) : getDictionary(defaultLocale);
};
