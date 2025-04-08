import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { ArrowRight, ChevronRight, Globe } from 'lucide-react';
import Card from '../components/common/Card';

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Background image URLs - would be imported from public/images in a real app
  const backgroundImages = [
    '/images/landing-bg-1.jpg', 
    '/images/landing-bg-2.jpg',
    '/images/landing-bg-3.jpg',
  ];

  // Placeholder for real images - in a real app, these would be actual paths
  const placeholderImages = [
    'linear-gradient(45deg, #45B26B, #2D81FF)',
    'linear-gradient(45deg, #6E56CF, #E44A66)',
    'linear-gradient(45deg, #FFB930, #FF5C00)',
  ];

  // Auto-rotate background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % placeholderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with rotating background */}
      <div 
        className="h-[60vh] relative flex items-center"
        style={{ 
          background: placeholderImages[currentSlide],
          transition: 'background 1s ease-in-out'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 mr-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-sm flex items-center justify-center">
                  <span className="text-xl font-bold text-white">LKHN</span>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="h-0.5 w-8 bg-white mr-2"></div>
                    <span className="text-xs uppercase tracking-widest">Vision 2025</span>
                  </div>
                  <h1 className="text-3xl font-normal tracking-widest uppercase">
                    {t('app.name')}
                  </h1>
                </div>
              </div>
              <p className="text-lg opacity-80">
                {t('app.overview')}
              </p>
            </div>
            
            <button 
              className="mt-8 bg-white text-black px-6 py-3 flex items-center text-sm uppercase tracking-widest"
              onClick={onGetStarted}
            >
              Enter System <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
          <div className="flex space-x-2">
            {placeholderImages.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Three Pillars Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-xl uppercase tracking-widest mb-2">{t('dashboard.pillars')}</h2>
          <div className="h-0.5 w-16 bg-gray-700"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-800 p-6">
            <div className="h-4 w-4 bg-green-500 mb-4"></div>
            <h3 className="uppercase tracking-widest mb-3 text-base">{t('wealth.name')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('wealth.description')}</p>
            <div className="flex justify-end">
              <button className="uppercase text-xs tracking-widest flex items-center text-gray-300 hover:text-white">
                Learn More <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </Card>
          
          <Card className="border border-gray-800 p-6">
            <div className="h-4 w-4 bg-purple-500 mb-4"></div>
            <h3 className="uppercase tracking-widest mb-3 text-base">{t('hub.name')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('hub.description')}</p>
            <div className="flex justify-end">
              <button className="uppercase text-xs tracking-widest flex items-center text-gray-300 hover:text-white">
                Learn More <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </Card>
          
          <Card className="border border-gray-800 p-6">
            <div className="h-4 w-4 bg-blue-500 mb-4"></div>
            <h3 className="uppercase tracking-widest mb-3 text-base">{t('trendcrypto.name')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('trendcrypto.description')}</p>
            <div className="flex justify-end">
              <button className="uppercase text-xs tracking-widest flex items-center text-gray-300 hover:text-white">
                Learn More <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Lificosm Section */}
      <div className="container mx-auto px-6 py-16 bg-black">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div 
              className="aspect-video w-full rounded" 
              style={{ background: 'linear-gradient(45deg, #FFB930, #FF5C00)' }}
            ></div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-4 w-4 bg-yellow-500 mb-4"></div>
            <h3 className="uppercase tracking-widest mb-3 text-base">{t('lificosm.name')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('lificosm.description')}</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                <span>Membership Program with Points</span>
              </li>
              <li className="flex items-center text-sm">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                <span>Local Business Integration</span>
              </li>
              <li className="flex items-center text-sm">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                <span>Community Marketplace</span>
              </li>
            </ul>
            <button className="uppercase text-xs tracking-widest flex items-center text-gray-300 hover:text-white">
              Explore Lificosm <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Universal Wealth Vision */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Globe size={32} className="mx-auto mb-6 text-gray-400" />
          <h2 className="text-xl uppercase tracking-widest mb-4">{t('dashboard.universal')}</h2>
          <p className="text-gray-400 mb-8">
            A new paradigm for wealth that is distributed rather than concentrated, communal rather than individualistic, and inclusive by design rather than as an afterthought.
          </p>
          <button 
            className="border border-gray-700 px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-900"
            onClick={onGetStarted}
          >
            Enter System
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;