import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const location = useLocation();
  
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const password = prompt('Veuillez entrer le mot de passe administrateur:');
    if (password === 'AdminFirst229abc') {
      window.location.href = '/admin';
    } else {
      toast.error('Mot de passe incorrect');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-primary-900 font-bold text-xl"
          >
            <Briefcase className="h-6 w-6 text-primary-600" />
            <span>FirstJob</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary-600 ${
                location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Accueil
            </Link>
            
            <Link 
              to="/offres" 
              className={`font-medium transition-colors hover:text-primary-600 ${
                location.pathname === '/offres' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Offres
            </Link>

            <button 
              onClick={handleAdminClick}
              className={`font-medium transition-colors hover:text-primary-600 flex items-center gap-1 ${
                location.pathname === '/admin' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              <Shield className="h-4 w-4" />
              Ajouter offres
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;