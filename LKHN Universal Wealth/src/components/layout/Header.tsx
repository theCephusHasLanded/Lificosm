import React from 'react';
import LanguageSelector from '../common/LanguageSelector';
import { useTranslation } from '../../contexts/TranslationContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  
  // Placeholder logo component
  const LogoPlaceholder = () => (
    <div className="flex items-center">
      <div className="h-8 w-8 mr-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-sm flex items-center justify-center">
        <span className="text-xs font-bold text-white">LKHN</span>
      </div>
      <h1 className="text-base font-normal tracking-widest uppercase">{t('app.name')}</h1>
    </div>
  );
  
  return (
    <header className="border-b border-gray-900 py-4 px-6">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <LogoPlaceholder />
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-500 uppercase">{t('app.tagline')}</div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
