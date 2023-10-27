type Lang = 'en' | 'fr' | 'kw';

type Dict = {
  title: string;
  onBoarding: OnBoarding;
  languageSelection: LanguageSelection;
  notifications: Notifications;
};

type OnBoarding = {
  additionalInfo: string;
  receiveFloodWarnings: string;
  secondOnboardingPoint: string;
  thirdOnboardingPoint: string;
  createAccount: string;
  logIn: string;
  nextStep: string;
};

type LanguageSelection = {
  confirm: string;
  chooseLanguage: string;
};

type Notifications = {
  sendNotification: string;
};

type UserData = {
  name: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
};
