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

export const defaultLocale = 'en';

export type Dict = {
  title: string;
  onBoarding: {
    additionalInfo: string;
    receiveFloodWarnings: string;
    secondOnboardingPoint: string;
    thirdOnboardingPoint: string;
    allowNotifications: string;
    allowPushNotifications: string;
    allowSMSNotifications: string;
    buttons: {
      logIn: string;
      nextStep: string;
      confirm: string;
      cancelStep: string;
      backStep: string;
      createAccount: string;
    };
    sites: {
      sitesHeader: string;
      addSite: string;
      addNewSite: string;
      setLocation: string;
      locationMessage: string;
      locationArea: string;
      saveChanges: string;
      cancel: string;
      confirm: string;
      deleteSite: string;
      deleteConfirmMessage: string;
      deleteYes: string;
      deleteNo: string;
      siteType: string;
      cropsType: string;
      livestockType: string;
      storageType: string;
      residentialType: string;
      industrialType: string;
      otherType: string;
      name: string;
      additionalInfo: string;
      type: string;
      cropTypes: CropTypeDict;
      liveStocks: LiveStockDict;
    };
    signUp: {
      signupHeader: string;
      name: string;
      phone: string;
      phoneHelper: string;
      password: string;
      confirmPassword: string;
      terms: string;
    };
  };
  languageSelection: { confirm: string; chooseLanguage: string };
  notifications: {
    sendNotification: string;
  };
};

export type LiveStockDict = {
  poultry: string;
  goats: string;
  cattle: string;
  pigs: string;
  sheep: string;
  rabbits: string;
  other: string;
};

type LiveStock = keyof LiveStockDict;

export const liveStocks: LiveStock[] = [
  'poultry',
  'goats',
  'cattle',
  'pigs',
  'sheep',
  'rabbits',
  'other',
];

export type CropTypeDict = {
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
  other: string;
};

type CropType = keyof CropTypeDict;

export const cropTypes: CropType[] = [
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
  'other',
];

export type Lang = keyof LangDictionary;
export const languages: Lang[] = ['en', 'fr', 'kw'];
export const isLang = (x: any): x is Lang => languages.includes(x);

export const getDictionary = (lang: Lang) => {
  return dictionaries[lang];
};
