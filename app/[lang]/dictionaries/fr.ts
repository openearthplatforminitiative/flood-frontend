import { Dict } from '@/app/[lang]/dictionaries';

export const fr: Dict = {
  title: 'Floodsafe',
  onBoarding: {
    additionalInfo:
      'Un texte explicatif supplémentaire ici, ceci est un espace réservé.',
    receiveFloodWarnings: "Recevez des alertes d'inondation",
    secondOnboardingPoint: 'Un autre point',
    thirdOnboardingPoint: 'Et une dernière bonne chose',
    allowNotifications: 'Autoriser les notifications',
    allowPushNotifications: 'Notifications push',
    allowSMSNotifications: 'Notifications SMS',
    buttons: {
      createAccount: 'Créer un compte',
      logIn: 'Se connecter',
      nextStep: "L'étape suivante",
      backStep: 'Back',
      cancelStep: 'Annuler',
      confirm: 'Confirmer',
    },
    signUp: {
      signupHeader: 'Détails personnels',
      name: 'Nom',
      phone: 'Numéro de téléphone',
      phoneHelper: 'Inclure le code du pays (+250, etc.)',
      password: 'Mot de passe',
      confirmPassword: 'Confirmez le mot de passe',
      terms:
        "J'accepte les termes et conditions d'utilisation de cette application.",
    },
    sites: {
      sitesHeader: 'Ajoutez vos sites',
      addSite: 'Ajouter un site',
      addNewSite: 'Ajouter un nouveau site',
      setLocation: "Définir l'emplacement",
      cropType: 'Type de culture ou de produit',
      name: 'Nom',
      type: 'Taper',
      additionalInfo:
        'Un texte explicatif supplémentaire ici, ceci est un espace réservé.',
      cropTypes: {
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
        other: 'Autre',
      },
      liveStocks: {
        poultry: 'La volaille',
        goats: 'Chèvres',
        cattle: 'Bétail',
        pigs: 'Les cochons',
        sheep: 'Brebis',
        rabbits: 'Lapins',
        other: 'Autre',
      },
    },
  },
  languageSelection: {
    confirm: 'Confirmer',
    chooseLanguage: 'Choisissez la langue',
  },
  notifications: {
    sendNotification: 'Envoyez une notification',
  },
};
