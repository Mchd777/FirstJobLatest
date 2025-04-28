import React from 'react';
import { X, Briefcase, Building, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { JobOffer } from '../../types';
import { Link } from 'react-router-dom';

interface OffreModalProps {
  offre: JobOffer;
  onClose: () => void;
}

const OffreModal: React.FC<OffreModalProps> = ({ offre, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-primary-900 text-white px-6 py-4">
            <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full mb-2 ${
              offre.type === 'Emploi' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {offre.type}
            </span>
            <h3 className="text-2xl font-bold" id="modal-title">
              {offre.titre}
            </h3>
            <p className="text-primary-100 mt-1">{offre.entreprise}</p>
          </div>

          <div className="bg-white px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-3">Description du poste</h4>
                <div className="text-gray-700 whitespace-pre-line">
                  {offre.description}
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Entreprise</p>
                    <p className="text-gray-900">{offre.entreprise}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Secteur</p>
                    <p className="text-gray-900">{offre.secteur}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Localisation</p>
                    <p className="text-gray-900">{offre.localisation}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Niveau d'expérience</p>
                    <p className="text-gray-900">{offre.niveau_experience}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date de publication</p>
                    <p className="text-gray-900">{formatDate(offre.date_publication)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <Link
              to={`/postuler/${offre.id}`}
              className="btn-primary"
              onClick={onClose}
            >
              Postuler maintenant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffreModal;