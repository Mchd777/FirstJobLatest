import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getJobOfferById } from '../services/api';
import { JobOffer } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorDisplay from '../components/ui/ErrorDisplay';

const Postuler: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    cv: null as File | null,
    lettre_motivation: '',
  });

  useEffect(() => {
    const fetchOffer = async () => {
      if (!id) {
        navigate('/offres');
        return;
      }

      try {
        const data = await getJobOfferById(id);
        if (!data) {
          throw new Error('Offre non trouvée');
        }
        setOffer(data);
      } catch (err) {
        setError('Impossible de charger les détails de cette offre.');
        console.error('Error fetching offer:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to confirmation page with form data
    navigate('/confirmation', {
      state: {
        formData,
        offerTitle: offer?.titre,
        offerCompany: offer?.entreprise
      }
    });
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="container-custom py-8">
        <ErrorDisplay 
          message={error || 'Offre non trouvée'} 
          onRetry={() => navigate('/offres')}
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Postuler à l'offre</h1>
          <p className="text-lg text-gray-600">
            {offer.titre} - {offer.entreprise}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                required
                className="form-input"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                required
                className="form-input"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                required
                className="form-input"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
              CV (PDF)
            </label>
            <input
              type="file"
              id="cv"
              accept=".pdf"
              required
              className="form-input"
              onChange={(e) => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
            />
          </div>

          <div>
            <label htmlFor="lettre_motivation" className="block text-sm font-medium text-gray-700 mb-1">
              Lettre de motivation
            </label>
            <textarea
              id="lettre_motivation"
              required
              rows={6}
              className="form-input"
              value={formData.lettre_motivation}
              onChange={(e) => setFormData({ ...formData, lettre_motivation: e.target.value })}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Envoyer ma candidature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postuler;