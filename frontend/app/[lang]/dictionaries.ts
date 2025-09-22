import { en } from '@/app/[lang]/dictionaries/en';
import { fr } from '@/app/[lang]/dictionaries/fr';
import { rw } from '@/app/[lang]/dictionaries/rw';
import { FloodIntensity, FloodTiming } from '@/lib/openepi-clients';

interface LangDictionary {
  en: Dict;
  fr: Dict;
  rw: Dict;
}

const dictionaries: LangDictionary = {
  en: en,
  fr: fr,
  rw: rw,
};

export const defaultLocale = 'en';

export type Dict = {
  yes: string;
  no: string;
  cancel: string;
  confirm: string;
  title: string;
  metadata: {
    description: string;
  };
  signIn: string;
  signOut: string;
  back: string;
  signBackIn: string;
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
      locationArea: string;
      saveChanges: string;
      deleteSite: string;
      deleteConfirmMessage: string;
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
  tokenExpiredPage: {
    description: string;
  };
  languageSelection: { chooseLanguage: string };
  notifications: {
    sendNotification: string;
  };
  time: {
    today: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    previousDay: string;
    nextDay: string;
  };
  sites: {
    title: string;
    warningTitle: { [key in FloodIntensity]: string };
    urgency: string;
    affectedSite: string;
    urgencyDescription: { [key in FloodTiming]: string };
    typeOfSite: string;
    weather: {
      currentWeather: string;
      weatherForecast: string;
      temperature: string;
      temperatureMaxMin: string;
      night: string;
      day: string;
      noon: string;
      evening: string;
      precipitation: string;
      wind: string;
    };
    editSite: string;
    locationSetNear: string;
  };
  settings: {
    title: string;
    selectedLanguage: string;
  };
  navbar: {
    sites: string;
    cropHealth: string;
    settings: string;
  };
  cropHealth: {
    helperText: string;
    uploadImage: string;
    uploadNewImage: string;
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
export const languages: Lang[] = ['en', 'fr', 'rw'];
export const isLang = (x: unknown): x is Lang => languages.includes(x as Lang);

export const getDictionary = (lang: Lang) => {
  return dictionaries[lang];
};

export const getDictionaryWithDefault = (lang: string) => {
  return isLang(lang) ? getDictionary(lang) : getDictionary(defaultLocale);
};
