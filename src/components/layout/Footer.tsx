import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">FirstJob</h3>
            <p className="text-gray-400">
              Trouvez votre premier emploi ou stage idéal avec FirstJob,
              la plateforme qui connecte les talents avec les meilleures opportunités.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/offres" className="hover:text-primary-400 transition-colors">
                  Offres d'emploi et stages
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Vous avez des questions ou besoin d'aide ?<br />
              N'hésitez pas à nous contacter par email.
            </p>
            <a 
              href="mailto:contact@firstjob.fr" 
              className="text-primary-400 hover:text-primary-300 transition-colors mt-2 inline-block"
            >
              contact@firstjob.fr
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {currentYear} FirstJob. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;