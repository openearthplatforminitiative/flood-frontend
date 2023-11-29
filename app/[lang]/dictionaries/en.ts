import { Dict } from '@/app/[lang]/dictionaries';

export const en: Dict = {
  title: 'Floodsafe',
  onBoarding: {
    additionalInfo:
      'Some additional explanatory text here, this is a placeholder.',
    receiveFloodWarnings: 'Receive flood warnings',
    secondOnboardingPoint: 'Some other point',
    thirdOnboardingPoint: 'And one final nice thing',
    allowNotifications: 'Allow notifications',
    allowPushNotifications: 'Push notifications',
    allowSMSNotifications: 'SMS notifications',
    buttons: {
      createAccount: 'Create account',
      logIn: 'Log in',
      nextStep: 'Next step',
      backStep: 'Back',
      cancelStep: 'Cancel',
      confirm: 'Confirm',
    },
    signUp: {
      signupHeader: 'Personal details',
      name: 'Name',
      phone: 'Phone number',
      phoneHelper: 'Include country code (+250 etc)',
      password: 'Password',
      confirmPassword: 'Confirm password',
      terms: 'I agree to the terms and conditions of using this application.',
    },
    sites: {
      sitesHeader: 'Add your sites',
      addSite: 'Add site',
      addNewSite: 'Add new site',
      setLocation: 'Set location',
      cropType: 'Type of crop or produce',
      name: 'Name',
      type: 'Type',
      additionalInfo:
        'Some additional explanatory text here, this is a placeholder.',
      cropTypes: {
        avocado: 'Avocado',
        beans: 'Beans',
        banana: 'Banana',
        coffee: 'Coffee',
        maize: 'Maize',
        potato: 'Potato',
        rice: 'Rice',
        sugarcane: 'Sugarcane',
        tea: 'Tea',
        wheat: 'Wheat',
        other: 'Other',
      },
    },
  },
  languageSelection: {
    confirm: 'Confirm',
    chooseLanguage: 'Choose language',
  },
  notifications: {
    sendNotification: 'Send notification',
  },
};
