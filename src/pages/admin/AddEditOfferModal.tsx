import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { JobOffer } from '../../types';
import { createJobOffer, updateJobOffer } from '../../services/api';
import toast from 'react-hot-toast';

interface AddEditOfferModalProps {
  offer?: JobOffer | null;
  onClose: () => void;
}

const AddEditOfferModal: React.FC<AddEditOfferModalProps> = ({ offer, onClose }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: 'Emploi',
    secteur: '',
    localisation: '',
    niveau_experience: 'Débutant',
    entreprise: '',
  });

  useEffect(() => {
    if (offer) {
      setFormData({
        titre: offer.titre,
        description: offer.description,
        type: offer.type,
        secteur: offer.secteur,
        localisation: offer.localisation,
        niveau_experience: offer.niveau_experience,
        entreprise: offer.entreprise,
      });
    }
  }, [offer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (offer) {
        await updateJobOffer(offer._id, formData);
        toast.success('Offre mise à jour avec succès');
      } else {
        await createJobOffer(formData);
        toast.success('Offre créée avec succès');
      }
      onClose();
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {offer ? 'Modifier l\'offre' : 'Nouvelle offre'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input"
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="form-input"
                >
                  <option value="Emploi">Emploi</option>
                  <option value="Stage">Stage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secteur
                </label>
                <input
                  type="text"
                  value={formData.secteur}
                  onChange={(e) => setFormData({ ...formData, secteur: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  value={formData.localisation}
                  onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau d'expérience
                </label>
                <select
                  value={formData.niveau_experience}
                  onChange={(e) => setFormData({ ...formData, niveau_experience: e.target.value })}
                  className="form-input"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Confirmé">Confirmé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entreprise
                </label>
                <input
                  type="text"
                  value={formData.entreprise}
                  onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {offer ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditOfferModal;