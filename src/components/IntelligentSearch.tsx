import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, MapPin, Wrench } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'page' | 'info';
  url: string;
  icon: React.ReactNode;
}

const IntelligentSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Base de données de recherche
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Ouverture de porte urgente',
      description: 'Service 24h/24 pour ouverture sans casse',
      category: 'service',
      url: '/emergency',
      icon: <Wrench className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Installation serrure A2P',
      description: 'Serrures certifiées haute sécurité',
      category: 'service',
      url: '/services',
      icon: <Wrench className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'Intervention Paris',
      description: 'Zone d\'intervention et délais',
      category: 'info',
      url: '/contact',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      id: '4',
      title: 'Devis gratuit',
      description: 'Estimation rapide de vos travaux',
      category: 'service',
      url: '/contact',
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: '5',
      title: 'Blindage de porte',
      description: 'Renforcement sécurité domicile',
      category: 'service',
      url: '/services',
      icon: <Wrench className="w-4 h-4" />
    },
    {
      id: '6',
      title: 'À propos de nous',
      description: 'Notre expertise et certifications',
      category: 'page',
      url: '/about',
      icon: <Clock className="w-4 h-4" />
    },
  ];

  // Recherche intelligente avec autocomplétion
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setSelectedIndex(-1);
  }, [query]);

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          );
        }
        
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          );
        }
        
        if (e.key === 'Enter' && selectedIndex >= 0) {
          window.location.href = results[selectedIndex].url;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Focus automatique
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Bouton de recherche */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">Rechercher...</span>
        <kbd className="px-2 py-1 text-xs bg-white/20 rounded">⌘K</kbd>
      </button>

      {/* Modal de recherche */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barre de recherche */}
              <div className="flex items-center px-6 py-4 border-b border-gray-200">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Rechercher un service, une information..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-lg outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Résultats */}
              <div className="max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <motion.a
                        key={result.id}
                        href={result.url}
                        className={`flex items-center px-6 py-3 hover:bg-gray-50 transition-colors ${
                          index === selectedIndex ? 'bg-orange-50 border-r-2 border-orange-500' : ''
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg mr-3">
                          {result.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{result.title}</div>
                          <div className="text-sm text-gray-600">{result.description}</div>
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {result.category}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                ) : query.length >= 2 ? (
                  <div className="py-12 text-center text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Aucun résultat trouvé pour "{query}"</p>
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Tapez au moins 2 caractères pour rechercher</p>
                  </div>
                )}
              </div>

              {/* Raccourcis clavier */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <kbd className="px-2 py-1 bg-white rounded mr-1">↑↓</kbd>
                      Naviguer
                    </span>
                    <span className="flex items-center">
                      <kbd className="px-2 py-1 bg-white rounded mr-1">↵</kbd>
                      Sélectionner
                    </span>
                  </div>
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white rounded mr-1">Esc</kbd>
                    Fermer
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntelligentSearch;