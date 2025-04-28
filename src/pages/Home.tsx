import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Search, Clock, MapPin } from 'lucide-react';
import { getJobOffers } from '../services/api';
import { JobOffer } from '../types';
import OffreCard from '../components/offers/OffreCard';
import OffreModal from '../components/offers/OffreModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home: React.FC = () => {
  const [recentOffers, setRecentOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      alt: "Équipe de professionnels travaillant ensemble"
    },
    {
      image: "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg",
      alt: "Réunion d'équipe dans un bureau moderne"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchRecentOffers = async () => {
      try {
        const data = await getJobOffers();
        setRecentOffers(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching recent offers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOffers();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Carousel */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/75" />
            </div>
          ))}

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Trouvez votre premier emploi ou stage idéal
              </h1>
              <p className="text-xl mb-8 text-white/90">
                La plateforme qui connecte les talents avec les meilleures
                opportunités professionnelles.
              </p>
              <Link
                to="/offres"
                className="btn-secondary text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
              >
                Découvrir les offres
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir FirstJob ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Recherche simplifiée
              </h3>
              <p className="text-gray-600">
                Utilisez des filtres intelligents pour trouver rapidement les
                offres qui correspondent à vos critères.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Offres de qualité</h3>
              <p className="text-gray-600">
                Des opportunités sélectionnées spécialement pour les jeunes
                diplômés et les étudiants.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Mise à jour régulière
              </h3>
              <p className="text-gray-600">
                De nouvelles offres sont ajoutées quotidiennement pour vous
                offrir les meilleures opportunités.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Offers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Offres récentes</h2>
            <p className="text-gray-600">
              Découvrez les dernières opportunités disponibles
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recentOffers.map((offer) => (
                  <div
                    key={offer._id}
                    onClick={() => setSelectedOffer(offer)}
                    className="cursor-pointer"
                  >
                    <OffreCard offre={offer} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link to="/offres" className="btn-primary px-8">
                  Voir toutes les offres
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Prêt à découvrir votre prochaine opportunité ?
                </h2>
                <p className="text-gray-600 mb-6">
                  Des centaines d'offres d'emploi et de stage vous attendent.
                  Commencez votre recherche dès maintenant.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/offres?type=Emploi" className="btn-primary">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Voir les emplois
                  </Link>
                  <Link to="/offres?type=Stage" className="btn-secondary">
                    <MapPin className="h-5 w-5 mr-2" />
                    Voir les stages
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="aspect-square bg-primary-100 rounded-lg overflow-hidden">
                  <img
                    src="\src\job.jpg"
                    alt="Opportunité professionnelle"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedOffer && (
        <OffreModal
          offre={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
};

export default Home;