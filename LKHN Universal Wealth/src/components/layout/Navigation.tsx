import React from 'react';
import { Globe, CreditCard, Building, BarChart2, Users } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-900 bg-black">
      <div className="flex justify-around max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`p-4 flex flex-col items-center ${activeTab === 'overview' ? 'text-white' : 'text-gray-600'} transition-colors hover:text-white`}
        >
          <Globe size={20} />
          <span className="text-xs mt-1 uppercase tracking-wider">{t('nav.overview')}</span>
        </button>

        <button
          onClick={() => setActiveTab('wealth')}
          className={`p-4 flex flex-col items-center ${activeTab === 'wealth' ? 'text-white' : 'text-gray-600'} transition-colors hover:text-white`}
        >
          <CreditCard size={20} />
          <span className="text-xs mt-1 uppercase tracking-wider">{t('nav.wealth')}</span>
        </button>

        <button
          onClick={() => setActiveTab('hub')}
          className={`p-4 flex flex-col items-center ${activeTab === 'hub' ? 'text-white' : 'text-gray-600'} transition-colors hover:text-white`}
        >
          <Building size={20} />
          <span className="text-xs mt-1 uppercase tracking-wider">{t('nav.hub')}</span>
        </button>

        <button
          onClick={() => setActiveTab('trendcrypto')}
          className={`p-4 flex flex-col items-center ${activeTab === 'trendcrypto' ? 'text-white' : 'text-gray-600'} transition-colors hover:text-white`}
        >
          <BarChart2 size={20} />
          <span className="text-xs mt-1 uppercase tracking-wider">{t('nav.trendcrypto')}</span>
        </button>
        
        <button
          onClick={() => setActiveTab('lificosm')}
          className={`p-4 flex flex-col items-center ${activeTab === 'lificosm' ? 'text-white' : 'text-gray-600'} transition-colors hover:text-white`}
        >
          <Users size={20} />
          <span className="text-xs mt-1 uppercase tracking-wider">{t('nav.lificosm')}</span>
        </button>
      </div>
    </footer>
  );
};

export default Navigation;
