import { Dict } from '@/app/[lang]/dictionaries';

export const kw: Dict = {
  yes: 'Yego',
  no: 'Oya',
  cancel: 'Kureka',
  confirm: 'Emeza',
  title: 'ClimaSafe',
  metadata: {
    description:
      'ClimaSafe igufasha kwakira amakuru yerekeye ingaruka z’umwuzure mu turere ushimishijwe.',
  },
  signIn: 'Injira',
  signOut: 'Sohoka',
  back: 'Inyuma',
  signBackIn: 'Subira inyuma',
  signInPage: {
    description:
      'Umwuzure uremerera kwakira amakuru yerekeye ingaruka z’umwuzure mu turere ushimishijwe.',
  },
  onBoarding: {
    allowNotifications: 'Emera imenyesha',
    allowPushNotifications: 'Shyira amatangazo',
    allowSMSNotifications: 'Amatangazo ya SMS',
    buttons: {
      createAccount: 'Kora konti',
      nextStep: 'Intambwe ikurikira',
    },
    sites: {
      sitesHeader: 'Ongeraho imbuga zawe',
      sitesInfo: 'Ongeraho imbuga ushaka kwakira ibishya.',
      addSite: 'Ongeraho urubuga',
      addNewSite: 'Ongeraho urubuga rushya',
      addNewSiteInfo: 'Ongeraho urubuga ushaka kwakira amakuru agezweho.',
      updateSite: 'Kuvugurura urubuga',
      updateSiteInfo: 'Kuvugurura urubuga ushaka kwakira ibishya.',
      setLocation: 'Shiraho ikibanza',
      locationArea: 'Agace (radiyo)',
      saveChanges: 'Bika impinduka',
      deleteSite: 'Siba urubuga',
      deleteConfirmMessage: 'Uzi neza ko ushaka gusiba uru rubuga?',
      cropsType: 'Ibihingwa kandi bitanga umusaruro',
      livestockType: 'Amatungo',
      storageType: 'Ububiko',
      residentialType: 'Umuturirwa',
      industrialType: 'Inganda',
      otherType: 'Ibindi',
      name: 'Izina',
      type: 'Andika',
      siteTypes: {
        avocado: 'Avoka',
        beans: 'Ibishyimbo',
        banana: 'Umuneke',
        coffee: 'Ikawa',
        maize: 'Ibigori',
        potato: 'Ibirayi',
        rice: 'Umuceri',
        sugarcane: 'Ibisheke',
        tea: 'Icyayi',
        wheat: 'Ingano',
        poultry: 'Inkoko',
        goats: 'Ihene',
        cattle: 'Inka',
        pigs: 'Ingurube',
        sheep: 'Intama',
        rabbits: 'Inkwavu',
        storage: 'Ububiko',
        residential: 'Gutura',
        industrial: 'Inganda',
        other: 'Ibindi',
      },
      errors: {
        nameRequired: 'Izina rirakenewe',
        typeRequired: 'Ubwoko burakenewe',
        locationRequired: 'Ikibanza kirakenewe',
        locationInvalid: 'Umwanya ugomba kuba mu gihugu, kandi hafi yumujyi',
      },
    },
  },
  tokenExpiredPage: {
    description:
      'Bisa nkaho umaze igihe kinini ukora ubusa. Nta mpungenge, twagusohotse kugirango ibintu bigire umutekano. Subira inyuma kugirango usubire aho watangiriye',
  },
  languageSelection: {
    chooseLanguage: 'Hitamo ururimi',
  },
  notifications: {
    sendNotification: 'Kohereza imenyesha',
  },
  sites: {
    title: 'Imbuga zanjye',
    warningTitle: {
      G: 'Kuri ubu ntabwo turimo kuburira imyuzure ijyanye nurubuga rwawe.',
      Y: 'Urwego A Kuburira',
      R: 'Urwego B Kuburira',
      P: 'Urwego C Kuburira',
    },
    urgency: 'Byihutirwa',
    affectedSite: 'Byagize ingaruka',
    urgencyDescription: {
      BB: 'Mu minsi 1 kugeza kuri 3',
      GB: 'Mu minsi 3 kugeza kuri 10',
      GC: 'Mu minsi irenga 10',
    },
    typeOfSite: 'Ubwoko bwurubuga',
    weather: {
      temperature: 'Ubushyuhe',
      precipitation: 'Imvura',
      wind: 'Umuyaga',
    },
    editSite: 'Kuvugurura urubuga',
    locationSetNear: 'Ahantu hashyizwe hafi',
  },
  settings: {
    title: 'Igenamiterere ryanjye',
    selectedLanguage: 'Ururimi rwanditse',
  },
  navbar: {
    sites: 'Imbuga',
    cropHealth: 'Umusaruro',
    settings: 'Igenamiterere',
  },
  cropHealth: {
    helperText:
      'Ibihingwa byubuzima bigufasha gushiraho ishusho yigihingwa cyangwa igihingwa hanyuma ugasesengura igihingwa kuri wewe',
    uploadImage: 'Kuramo ishusho',
    uploadNewImage: 'Kuramo ishusho nshya',
  },
};
