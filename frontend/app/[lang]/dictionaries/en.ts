import { Dict } from '@/app/[lang]/dictionaries';

export const en: Dict = {
  yes: 'Yes',
  no: 'No',
  cancel: 'Cancel',
  confirm: 'Confirm',
  title: 'ClimaSafe',
  metadata: {
    description:
      'ClimaSafe lets you receive updates about flood-risk in your areas of interest.',
  },
  signIn: 'Sign in',
  signOut: 'Sign out',
  back: 'Back',
  signBackIn: 'Sign back in',
  signInPage: {
    description:
      'ClimaSafe lets you receive updates about flood-risk in your areas of interest.',
  },
  tokenExpiredPage: {
    description:
      'Seems like you have been idle for too long. No worries, we have logged you out to keep things secure. Sign back in to get back to where you started',
  },
  onBoarding: {
    allowNotifications: 'Allow notifications',
    allowPushNotifications: 'Push notifications',
    allowSMSNotifications: 'SMS notifications',
    buttons: {
      createAccount: 'Create account',
      nextStep: 'Next step',
    },
    sites: {
      sitesHeader: 'Add your sites',
      sitesInfo: 'Add sites that you want to receive updates for.',
      addSite: 'Add site',
      addNewSite: 'Add new site',
      addNewSiteInfo: 'Add a site that you want to receive updates for.',
      updateSite: 'Update site',
      updateSiteInfo: 'Update the site you want to receive updates for.',
      setLocation: 'Set location',
      locationArea: 'Area (radius)',
      saveChanges: 'Save changes',
      deleteSite: 'Delete site',
      deleteConfirmMessage: 'Are you sure you want to delete this site?',
      cropsType: 'Crops and produce',
      livestockType: 'Livestock',
      storageType: 'Storage',
      residentialType: 'Residential',
      industrialType: 'Industrial',
      otherType: 'Other',
      name: 'Name',
      type: 'Type',
      siteTypes: {
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
        poultry: 'Poultry',
        goats: 'Goats',
        cattle: 'Cattle',
        pigs: 'Pigs',
        sheep: 'Sheep',
        rabbits: 'Rabbits',
        storage: 'Storage',
        residential: 'Residential',
        industrial: 'Industrial',
        other: 'Other',
      },
      errors: {
        nameRequired: 'Name is required',
        typeRequired: 'Type is required',
        locationRequired: 'Location is required',
        locationInvalid:
          'Position needs to be in a country, and close to a city',
      },
    },
  },
  languageSelection: {
    chooseLanguage: 'Choose language',
  },
  notifications: {
    sendNotification: 'Send notification',
  },
  sites: {
    title: 'My sites',
    warningTitle: {
      G: 'At the moment we are not receiving any flood warnings associated with your sites.',
      Y: 'A-level warning',
      R: 'B-level warning',
      P: 'C-level warning',
    },
    urgency: 'Urgency',
    affectedSite: 'Affected site',
    urgencyDescription: {
      BB: 'In 1 to 3 days',
      GB: 'In 3 to 10 days',
      GC: 'In more than 10 days',
    },
    typeOfSite: 'Type of site',
    weather: {
      temperature: 'Temp.',
      precipitation: 'Precip.',
      wind: 'Wind',
    },
    editSite: 'Edit site',
    locationSetNear: 'Location set near',
  },
  settings: {
    title: 'Settings',
    selectedLanguage: 'Selected language',
  },
  navbar: {
    sites: 'Sites',
    cropHealth: 'Crop Health',
    settings: 'Settings',
  },
  cropHealth: {
    helperText:
      'Crop Health lets you upload an image of a crop or plant and analyze the plant for you',
    uploadImage: 'Upload image',
    uploadNewImage: 'Upload new image',
  },
};
