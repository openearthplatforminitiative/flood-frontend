type Lang = 'en' | 'fr' | 'kw';

type Dict = {
  title: string;
  onBoarding: {
    additionalInfo: string;
    receiveFloodWarnings: string;
    secondOnboardingPoint: string;
    thirdOnboardingPoint: string;
    allowNotifications: string;
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
      cropType: string;
      name: string;
      additionalInfo: string;
      type: string;
      cropTypes: CropTypeDict;
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

type CropTypeDict = {
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
