export interface JobOffer {
  _id: string;
  titre: string;
  description: string;
  type: 'Emploi' | 'Stage';
  secteur: string;
  localisation: string;
  niveau_experience: string;
  date_publication: string;
  entreprise: string;
}

export interface SearchParams {
  q?: string;
  type?: string;
  secteur?: string;
  localisation?: string;
  niveau_experience?: string;
}