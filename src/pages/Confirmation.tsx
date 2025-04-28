import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const { formData, offerTitle, offerCompany } = location.state || {};

  if (!formData) {
    return (
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">Aucune donnée de candidature trouvée.</p>
          <Link to="/" className="btn-primary mt-4 inline-flex items-center">
            <Home className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Candidature envoyée !</h1>
          <p className="text-lg text-gray-600">
            Votre candidature pour le poste de {offerTitle} chez {offerCompany} a été envoyée avec succès.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Récapitulatif de votre candidature</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-medium">{formData.nom}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Prénom</p>
                <p className="font-medium">{formData.prenom}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">{formData.telephone}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">CV</p>
              <p className="font-medium">{formData.cv?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Lettre de motivation</p>
              <p className="whitespace-pre-line">{formData.lettre_motivation}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/"
            className="btn-primary inline-flex items-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;