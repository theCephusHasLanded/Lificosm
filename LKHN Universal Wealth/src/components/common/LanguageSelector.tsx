import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'es', name: t('language.es') },
    { code: 'fr', name: t('language.fr') },
    { code: 'zh', name: t('language.zh') },
    { code: 'ja', name: t('language.ja') },
    { code: 'ru', name: t('language.ru') },
    { code: 'xh', name: t('language.xh') },
    { code: 'ar', name: t('language.ar') },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLanguageChange = (code: string) => {
    // Set the language
    setLanguage(code as 'en' | 'es' | 'fr' | 'zh' | 'ja' | 'ru' | 'xh' | 'ar');
    
    // Set RTL attribute for Arabic language
    if (code === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
    
    closeDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase tracking-wider"
      >
        <Globe size={14} />
        <span>{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-sm bg-gray-900 border border-gray-700 overflow-hidden z-50 language-dropdown">
          {languages.map(({ code, name }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`block w-full text-left px-4 py-2 text-xs ${language === code ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              style={{ direction: code === 'ar' ? 'rtl' : 'ltr' }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
