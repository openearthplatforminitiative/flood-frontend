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
  allowNotifications: string;
  buttons: Buttons;
  sites: Sites;
  signUp: Signup;
};

type Buttons = {
  logIn: string;
  nextStep: string;
  confirm: string;
  cancelStep: string;
  backStep: string;
  createAccount: string;
};

type Signup = {
  signupHeader: string;
  name: string;
  phone: string;
  phoneHelper: string;
  password: string;
  confirmPassword: string;
  terms: string;
};

type Sites = {
  sitesHeader: string;
  addSite: string;
  addNewSite: string;
  setLocation: string;
  cropType: string;
  name: string;
  additionalInfo: string;
  type: string;
  cropTypes: CropTypes;
};

type CropTypes = {
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
  password: string;
};
