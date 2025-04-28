import 'dotenv/config';
import mongoose from 'mongoose';
import JobOffer from './models/JobOffer.js';

const villes = ['Cotonou', 'Porto-Novo', 'Parakou', 'Natitingou', 'Abomey', 'Bohicon', 'Ouidah'];
const secteurs = ['Informatique', 'Éducation', 'Commerce', 'Santé', 'Agriculture', 'Finance', 'Télécommunications'];
const niveaux = ['Débutant', 'Intermédiaire', 'Confirmé'];
const types = ['Emploi', 'Stage'];

const entreprises = [
  'TechBenin',
  'EduPlus',
  'SantéVie',
  'AgroTech',
  'FinanceWest',
  'TelecomBJ',
  'CommercePlus',
  'ConsultingPro',
  'InnovTech',
  'DevSolutions'
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateRandomDate = () => {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const jobOffers = [
  {
    titre: 'Développeur Full Stack JavaScript',
    description: 'Nous recherchons un développeur Full Stack JavaScript passionné pour rejoindre notre équipe dynamique. Vous participerez au développement de solutions web innovantes.\n\nResponsabilités :\n- Développement d\'applications web modernes\n- Collaboration avec l\'équipe de design\n- Maintenance et amélioration des projets existants',
    type: 'Emploi',
    secteur: 'Informatique',
    localisation: 'Cotonou',
    niveau_experience: 'Intermédiaire',
    date_publication: generateRandomDate(),
    entreprise: 'TechBenin'
  },
  {
    titre: 'Stage en Marketing Digital',
    description: 'Stage de 6 mois en marketing digital pour participer à nos campagnes sur les réseaux sociaux.\n\nMissions :\n- Création de contenu digital\n- Analyse des performances\n- Veille concurrentielle',
    type: 'Stage',
    secteur: 'Commerce',
    localisation: 'Porto-Novo',
    niveau_experience: 'Débutant',
    date_publication: generateRandomDate(),
    entreprise: 'CommercePlus'
  },
  {
    titre: 'Infirmier(e) en Chef',
    description: 'Centre médical recherche un(e) infirmier(e) en chef pour superviser l\'équipe soignante.\n\nProfil recherché :\n- Diplôme en soins infirmiers\n- Expérience en management d\'équipe\n- Excellentes capacités relationnelles',
    type: 'Emploi',
    secteur: 'Santé',
    localisation: 'Parakou',
    niveau_experience: 'Confirmé',
    date_publication: generateRandomDate(),
    entreprise: 'SantéVie'
  },
  {
    titre: 'Analyste Financier Junior',
    description: 'Rejoignez notre équipe finance pour analyser les performances et préparer les rapports financiers.\n\nMissions principales :\n- Analyse des données financières\n- Préparation de rapports mensuels\n- Support aux décisions stratégiques',
    type: 'Emploi',
    secteur: 'Finance',
    localisation: 'Cotonou',
    niveau_experience: 'Débutant',
    date_publication: generateRandomDate(),
    entreprise: 'FinanceWest'
  },
  {
    titre: 'Stage en Agronomie',
    description: 'Stage pratique dans le développement de solutions agricoles durables.\n\nObjectifs :\n- Participation aux projets de recherche\n- Analyse des sols et cultures\n- Rédaction de rapports techniques',
    type: 'Stage',
    secteur: 'Agriculture',
    localisation: 'Natitingou',
    niveau_experience: 'Débutant',
    date_publication: generateRandomDate(),
    entreprise: 'AgroTech'
  },
  {
    titre: 'Professeur de Mathématiques',
    description: 'École secondaire recherche un professeur de mathématiques passionné.\n\nResponsabilités :\n- Enseignement des mathématiques\n- Préparation des cours\n- Suivi des élèves',
    type: 'Emploi',
    secteur: 'Éducation',
    localisation: 'Bohicon',
    niveau_experience: 'Intermédiaire',
    date_publication: generateRandomDate(),
    entreprise: 'EduPlus'
  },
  {
    titre: 'Ingénieur Réseau',
    description: 'Poste d\'ingénieur réseau pour maintenir et optimiser notre infrastructure.\n\nMissions :\n- Maintenance du réseau\n- Sécurité des systèmes\n- Support technique niveau 3',
    type: 'Emploi',
    secteur: 'Télécommunications',
    localisation: 'Cotonou',
    niveau_experience: 'Confirmé',
    date_publication: generateRandomDate(),
    entreprise: 'TelecomBJ'
  },
  {
    titre: 'Stage en Ressources Humaines',
    description: 'Stage en RH pour participer au recrutement et à la gestion du personnel.\n\nActivités :\n- Processus de recrutement\n- Gestion administrative\n- Organisation d\'événements',
    type: 'Stage',
    secteur: 'Commerce',
    localisation: 'Porto-Novo',
    niveau_experience: 'Débutant',
    date_publication: generateRandomDate(),
    entreprise: 'ConsultingPro'
  },
  {
    titre: 'Développeur Mobile React Native',
    description: 'Développeur mobile pour créer des applications innovantes.\n\nTechnologies :\n- React Native\n- Redux\n- API REST',
    type: 'Emploi',
    secteur: 'Informatique',
    localisation: 'Cotonou',
    niveau_experience: 'Intermédiaire',
    date_publication: generateRandomDate(),
    entreprise: 'InnovTech'
  },
  {
    titre: 'Chef de Projet IT',
    description: 'Gestion de projets IT et coordination d\'équipe.\n\nResponsabilités :\n- Planification de projets\n- Gestion d\'équipe\n- Relation client',
    type: 'Emploi',
    secteur: 'Informatique',
    localisation: 'Parakou',
    niveau_experience: 'Confirmé',
    date_publication: generateRandomDate(),
    entreprise: 'DevSolutions'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing data
      await JobOffer.deleteMany({});
      console.log('Cleared existing job offers');
      
      // Insert new job offers
      await JobOffer.insertMany(jobOffers);
      console.log('Successfully inserted job offers');
      
      // Close connection
      await mongoose.connection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error seeding data:', error);
      await mongoose.connection.close();
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });