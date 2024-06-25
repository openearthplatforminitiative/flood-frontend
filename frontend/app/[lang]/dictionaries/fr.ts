import { Dict } from '@/app/[lang]/dictionaries';

export const fr: Dict = {
  yes: 'Oui',
  no: 'Non',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  title: 'Floodsafe',
  signIn: 'Se connecter',
  signOut: 'Se déconnecter',
  back: 'Retourner',
  signInPage: {
    description:
      "Floodsafe vous permet de recevoir des mises à jour sur les risques d'inondation dans vos zones d'intérêt. Cliquez sur le bouton ci-dessous pour vous inscrire ou vous connecter à un utilisateur existant.",
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
      locationMessage: 'Localisation située à proximité de: ',
      locationArea: 'Superficie (rayon)',
      saveChanges: 'Sauvegarder les modifications',
      deleteSite: 'Supprimer le site',
      deleteConfirmMessage: 'Êtes-vous sûr de vouloir supprimer ce site ?',
      siteType: 'Type de site',
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
  languageSelection: {
    chooseLanguage: 'Choisissez la langue',
  },
  notifications: {
    sendNotification: 'Envoyez une notification',
  },
};
