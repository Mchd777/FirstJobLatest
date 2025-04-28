import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Building, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { getJobOfferById } from '../services/api';
import { JobOffer } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorDisplay from '../components/ui/ErrorDisplay';

const OffreDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Fetch offer details
  const fetchOfferDetails = async () => {
    if (!id) {
      navigate('/offres');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getJobOfferById(id);
      if (!data) {
        throw new Error('Offre non trouvée');
      }
      setOffer(data);
    } catch (err) {
      setError('Impossible de charger les détails de cette offre.');
      console.error('Error fetching offer details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate('/offres');
      return;
    }
    fetchOfferDetails();
  }, [id, navigate]);

  // Render description with paragraphs
  const renderDescription = (description: string) => {
    return description.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="mb-6">
        <Link 
          to="/offres"
          className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux offres
        </Link>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="py-12 flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      )}
      
      {/* Error state */}
      {error && !loading && (
        <ErrorDisplay 
          message={error} 
          onRetry={fetchOfferDetails}
        />
      )}
      
      {/* Offer details */}
      {!loading && !error && offer && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-900 text-white p-6">
            <div className="flex flex-wrap items-start justify-between">
              <div>
                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full mb-3 ${
                  offer.type === 'Emploi' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {offer.type}
                </span>
                <h1 className="text-3xl font-bold mb-2">{offer.titre}</h1>
                <p className="text-primary-100 text-lg">{offer.entreprise}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link 
                  to={`/postuler/${offer._id}`}
                  className="btn-secondary"
                >
                  Postuler
                </Link>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Description du poste</h2>
                  <div className="text-gray-700 leading-relaxed">
                    {renderDescription(offer.description)}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Informations</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Building className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Entreprise</p>
                      <p className="text-gray-900">{offer.entreprise}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="text-gray-900">{offer.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Localisation</p>
                      <p className="text-gray-900">{offer.localisation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <GraduationCap className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Niveau d'expérience</p>
                      <p className="text-gray-900">{offer.niveau_experience}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date de publication</p>
                      <p className="text-gray-900">{formatDate(offer.date_publication)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link 
                    to={`/postuler/${offer._id}`}
                    className="btn-primary w-full justify-center"
                  >
                    Postuler maintenant
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffreDetail;