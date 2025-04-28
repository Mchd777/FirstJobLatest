import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, CalendarClock } from 'lucide-react';
import { JobOffer } from '../../types';

interface OffreCardProps {
  offre: JobOffer;
}

const OffreCard: React.FC<OffreCardProps> = ({ offre }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="card group animate-fade-in">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
            {offre.titre}
          </h3>
          <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
            offre.type === 'Emploi' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {offre.type}
          </span>
        </div>
        
        <p className="text-gray-700 font-medium mb-1">
          {offre.entreprise}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{offre.localisation}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>{offre.secteur}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <CalendarClock className="h-4 w-4 mr-2" />
            <span>Publié le {formatDate(offre.date_publication)}</span>
          </div>
        </div>
        
        <div className="mt-5 flex justify-end">
          <Link 
            to={`/offres/${offre._id}`}
            className="btn-outline text-sm hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OffreCard;