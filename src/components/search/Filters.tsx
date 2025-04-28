import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { SearchParams } from '../../types';

interface FiltersProps {
  onFilterChange: (filters: SearchParams) => void;
  initialFilters?: SearchParams;
}

interface FilterOption {
  label: string;
  value: string;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, initialFilters = {} }) => {
  // State for each filter
  const [type, setType] = useState<string>(initialFilters.type || '');
  const [secteur, setSecteur] = useState<string>(initialFilters.secteur || '');
  const [localisation, setLocalisation] = useState<string>(initialFilters.localisation || '');
  const [niveau, setNiveau] = useState<string>(initialFilters.niveau_experience || '');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Options for select fields
  const typeOptions: FilterOption[] = [
    { label: 'Tous les types', value: '' },
    { label: 'Emploi', value: 'Emploi' },
    { label: 'Stage', value: 'Stage' },
  ];

  const secteurOptions: FilterOption[] = [
    { label: 'Tous les secteurs', value: '' },
    { label: 'Informatique', value: 'Informatique' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Santé', value: 'Santé' },
    { label: 'Commerce', value: 'Commerce' },
    { label: 'Ingénierie', value: 'Ingénierie' },
  ];

  const localisationOptions: FilterOption[] = [
    { label: 'Toutes les localisations', value: '' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Lyon', value: 'Lyon' },
    { label: 'Marseille', value: 'Marseille' },
    { label: 'Bordeaux', value: 'Bordeaux' },
    { label: 'Lille', value: 'Lille' },
    { label: 'Toulouse', value: 'Toulouse' },
    { label: 'Remote', value: 'Remote' },
  ];

  const niveauOptions: FilterOption[] = [
    { label: 'Tous les niveaux', value: '' },
    { label: 'Débutant', value: 'Débutant' },
    { label: 'Intermédiaire', value: 'Intermédiaire' },
    { label: 'Confirmé', value: 'Confirmé' },
    { label: 'Expert', value: 'Expert' },
  ];

  // Apply filters when any filter changes
  useEffect(() => {
    const newFilters: SearchParams = {};
    
    if (type) newFilters.type = type;
    if (secteur) newFilters.secteur = secteur;
    if (localisation) newFilters.localisation = localisation;
    if (niveau) newFilters.niveau_experience = niveau;
    
    onFilterChange(newFilters);
  }, [type, secteur, localisation, niveau, onFilterChange]);

  // Reset all filters
  const handleReset = () => {
    setType('');
    setSecteur('');
    setLocalisation('');
    setNiveau('');
  };

  // Render select field
  const renderSelect = (
    label: string, 
    value: string, 
    onChange: (value: string) => void, 
    options: FilterOption[]
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          {isOpen ? 'Masquer' : 'Afficher'}
        </button>
      </div>
      
      {isOpen && (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderSelect('Type', type, setType, typeOptions)}
            {renderSelect('Secteur', secteur, setSecteur, secteurOptions)}
            {renderSelect('Localisation', localisation, setLocalisation, localisationOptions)}
            {renderSelect('Niveau d\'expérience', niveau, setNiveau, niveauOptions)}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="btn-outline mr-2 text-sm"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;