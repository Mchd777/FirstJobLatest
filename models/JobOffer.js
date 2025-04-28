import mongoose from 'mongoose';

const jobOfferSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Emploi', 'Stage'],
    required: true,
  },
  secteur: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  niveau_experience: {
    type: String,
    enum: ['Débutant', 'Intermédiaire', 'Confirmé'],
    required: true,
  },
  date_publication: {
    type: Date,
    default: Date.now,
  },
  entreprise: {
    type: String,
    required: true,
  },
});

export default mongoose.model('JobOffer', jobOfferSchema);