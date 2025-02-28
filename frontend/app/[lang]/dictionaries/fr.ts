import { Dict } from '@/app/[lang]/dictionaries';

export const fr: Dict = {
  yes: 'Oui',
  no: 'Non',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  title: 'ClimaSafe',
  metadata: {
    description:
      "ClimaSafe vous permet de recevoir des mises à jour sur les risques d'inondation dans vos zones d'intérêt.",
  },
  signIn: 'Se connecter',
  signOut: 'Se déconnecter',
  signBackIn: 'Se reconnecter',
  back: 'Retourner',
  signInPage: {
    description:
      "ClimaSafe vous permet de recevoir des mises à jour sur les risques d'inondation dans vos zones d'intérêt.",
  },
  onBoarding: {
    allowNotifications: 'Autoriser les notifications',
    allowPushNotifications: 'Notifications push',
    allowSMSNotifications: 'Notifications SMS',
    buttons: {
      createAccount: 'Créer un compte',
      nextStep: "L'étape suivante",
    },
    sites: {
      sitesHeader: 'Ajoutez vos sites',
      sitesInfo:
        'Ajoutez des sites pour lesquels vous souhaitez recevoir des mises à jour.',
      addSite: 'Ajouter un site',
      addNewSite: 'Ajouter un nouveau site',
      addNewSiteInfo:
        'Ajoutez un site pour lequel vous souhaitez recevoir des mises à jour.',
      updateSite: 'Mettre à jour le site',
      updateSiteInfo:
        'Mettez à jour le site pour lequel vous souhaitez recevoir des mises à jour.',
      setLocation: "Définir l'emplacement",
      locationArea: 'Superficie (rayon)',
      saveChanges: 'Sauvegarder les modifications',
      deleteSite: 'Supprimer le site',
      deleteConfirmMessage: 'Êtes-vous sûr de vouloir supprimer ce site ?',
      cropsType: 'Cultures et produits',
      livestockType: 'Bétail',
      storageType: 'Stockage',
      residentialType: 'Résidentiel',
      industrialType: 'Industriel',
      otherType: 'Autre',
      name: 'Nom',
      type: 'Taper',
      siteTypes: {
        avocado: 'Avocat',
        beans: 'Haricots',
        banana: 'Banane',
        coffee: 'Café',
        maize: 'Maïs',
        potato: 'Pomme de terre',
        rice: 'Riz',
        sugarcane: 'Canne à sucre',
        tea: 'Thé',
        wheat: 'Blé',
        poultry: 'La volaille',
        goats: 'Chèvres',
        cattle: 'Bétail',
        pigs: 'Les cochons',
        sheep: 'Brebis',
        rabbits: 'Lapins',
        storage: 'Stockage',
        residential: 'Résidentiel',
        industrial: 'Industriel',
        other: 'Autre',
      },
      errors: {
        nameRequired: 'Le nom est requis',
        typeRequired: 'Le type est requis',
        locationRequired: "L'emplacement est requis",
        locationInvalid:
          "Le poste doit être dans un pays et à proximité d'une ville",
      },
    },
  },
  tokenExpiredPage: {
    description:
      'Il semble que vous ayez été inactif trop longtemps. Ne vous inquiétez pas, nous vous avons déconnecté pour des raisons de sécurité. Reconnectez-vous pour revenir à votre point de départ',
  },
  languageSelection: {
    chooseLanguage: 'Choisissez la langue',
  },
  notifications: {
    sendNotification: 'Envoyez une notification',
  },
  time: {
    today: 'Aujourd’hui',
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
    previousDay: 'Jour précédent',
    nextDay: 'Jour suivant',
  },
  sites: {
    title: 'Mes sites',
    warningTitle: {
      G: 'Pour le moment, nous ne recevons aucune alerte d’inondation associée à vos sites.',
      Y: 'Avertissement de niveau A',
      R: 'Avertissement de niveau B',
      P: 'Avertissement de niveau C',
    },
    urgency: 'Urgence',
    affectedSite: 'Site concerné',
    urgencyDescription: {
      BB: 'Dans 1 à 3 jours',
      GB: 'Dans 3 à 10 jours',
      GC: 'Dans plus de 10 jours',
    },
    typeOfSite: 'Type de site',
    weather: {
      currentWeather: 'Temps actuel',
      weatherForecast: 'Prévisions météorologiques',
      temperature: 'Temp.',
      temperatureMaxMin: 'Temp. Max/Min',
      night: 'La nuit',
      day: 'Le matin',
      noon: 'L’après-midi',
      evening: 'Le soir',
      precipitation: 'Précip.',
      wind: 'Vent',
    },
    editSite: 'Modifier le site',
    locationSetNear: 'Localisation située à proximité de',
  },
  settings: {
    title: 'Mes paramètres',
    selectedLanguage: 'Langue sélectionnée',
  },
  navbar: {
    sites: 'Des sites',
    cropHealth: 'Santé des cultures',
    settings: 'Paramètres',
  },
  cropHealth: {
    helperText:
      "Santé des cultures vous permet de télécharger une image d'une culture ou d'une plante et d'analyser la plante pour vous",
    uploadImage: "Télécharger l'image",
    uploadNewImage: 'Télécharger une nouvelle image',
  },
};
