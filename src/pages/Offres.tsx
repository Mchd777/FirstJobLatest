import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobOffers } from '../services/api';
import { JobOffer, SearchParams } from '../types';
import SearchBar from '../components/search/SearchBar';
import Filters from '../components/search/Filters';
import OffreCard from '../components/offers/OffreCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorDisplay from '../components/ui/ErrorDisplay';

const Offres: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Create a params object from URL search params
  const getParamsFromUrl = useCallback((): SearchParams => {
    const params: SearchParams = {};
    
    const q = searchParams.get('q');
    const type = searchParams.get('type');
    const secteur = searchParams.get('secteur');
    const localisation = searchParams.get('localisation');
    const niveau_experience = searchParams.get('niveau_experience');
    
    if (q) params.q = q;
    if (type) params.type = type;
    if (secteur) params.secteur = secteur;
    if (localisation) params.localisation = localisation;
    if (niveau_experience) params.niveau_experience = niveau_experience;
    
    return params;
  }, [searchParams]);

  // Fetch job offers with the current search params
  const fetchOffers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = getParamsFromUrl();
      const data = await getJobOffers(params);
      setOffers(data);
    } catch (err) {
      setError('Impossible de charger les offres. Veuillez réessayer plus tard.');
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  }, [getParamsFromUrl]);

  // Handle search query
  const handleSearch = (query: string) => {
    const currentParams = getParamsFromUrl();
    
    if (query) {
      currentParams.q = query;
    } else {
      delete currentParams.q;
    }
    
    setSearchParams(currentParams as Record<string, string>);
  };

  // Handle filter changes
  const handleFilterChange = (filters: SearchParams) => {
    const currentParams = getParamsFromUrl();
    
    // Update search params with new filters
    const newParams: Record<string, string> = {};
    
    // Keep search query if exists
    if (currentParams.q) {
      newParams.q = currentParams.q;
    }
    
    // Add all non-empty filters
    if (filters.type) newParams.type = filters.type;
    if (filters.secteur) newParams.secteur = filters.secteur;
    if (filters.localisation) newParams.localisation = filters.localisation;
    if (filters.niveau_experience) newParams.niveau_experience = filters.niveau_experience;
    
    setSearchParams(newParams);
  };

  // Fetch offers when search params change
  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return (
    <div className="container-custom py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Offres d'emploi et stages</h1>
      
      {/* Search bar */}
      <div className="mb-6">
        <SearchBar 
          onSearch={handleSearch}
          initialValue={searchParams.get('q') || ''}
        />
      </div>
      
      {/* Filters */}
      <Filters 
        onFilterChange={handleFilterChange}
        initialFilters={getParamsFromUrl()}
      />
      
      {/* Results */}
      <div className="mb-4">
        {!loading && !error && (
          <p className="text-gray-600">
            {offers.length} {offers.length > 1 ? 'résultats trouvés' : 'résultat trouvé'}
          </p>
        )}
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
          onRetry={fetchOffers}
        />
      )}
      
      {/* Results grid */}
      {!loading && !error && (
        <>
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <OffreCard key={offer.id} offre={offer} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">
                Aucune offre ne correspond à vos critères de recherche.
              </p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 btn-primary"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Offres;