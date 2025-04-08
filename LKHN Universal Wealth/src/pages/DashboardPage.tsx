import React, { useState } from 'react';
import Card from '../components/common/Card';
import PlatformCard from '../components/common/PlatformCard';
import MetricDisplay from '../components/common/MetricDisplay';
import Button from '../components/common/Button';
import { Globe, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const DashboardPage: React.FC = () => {
  const { t, language } = useTranslation();
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);

  const formatCurrency = (value: number): string => {
    // Use appropriate currency formatting based on language
    const currencyMap: Record<string, { locale: string, currency: string }> = {
      'en': { locale: 'en-US', currency: 'USD' },
      'es': { locale: 'es-ES', currency: 'EUR' },
      'fr': { locale: 'fr-FR', currency: 'EUR' },
      'zh': { locale: 'zh-CN', currency: 'CNY' },
      'ja': { locale: 'ja-JP', currency: 'JPY' },
      'ru': { locale: 'ru-RU', currency: 'RUB' },
      'xh': { locale: 'en-ZA', currency: 'ZAR' },
      'ar': { locale: 'ar-SA', currency: 'SAR' }
    };
    
    const { locale, currency } = currencyMap[language] || currencyMap['en'];
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const platforms = [
    {
      id: 'wealth',
      name: t('wealth.name'),
      description: t('wealth.description'),
      color: '#45B26B',
      metrics: [
        { label: t('metric.users'), value: '12,582' },
        { label: t('metric.credit'), value: '+58 pts' },
        { label: t('metric.capital'), value: formatCurrency(8400000) }
      ]
    },
    {
      id: 'hub',
      name: t('hub.name'),
      description: t('hub.description'),
      color: '#6E56CF',
      metrics: [
        { label: t('metric.locations'), value: '2' },
        { label: t('metric.visitors'), value: '3,450' },
        { label: t('metric.businesses'), value: '48' }
      ]
    },
    {
      id: 'trendcrypto',
      name: t('trendcrypto.name'),
      description: t('trendcrypto.description'),
      color: '#2D81FF',
      metrics: [
        { label: t('metric.premium'), value: '4,218' },
        { label: t('metric.detection'), value: '3.2 days' },
        { label: t('metric.performance'), value: '+32%' }
      ]
    },
    {
      id: 'lificosm',
      name: t('lificosm.name'),
      description: t('lificosm.description'),
      color: '#FFB930',
      metrics: [
        { label: t('metric.lificosm.members'), value: '1,243' },
        { label: t('metric.lificosm.businesses'), value: '32' },
        { label: t('metric.lificosm.savings'), value: formatCurrency(245000) }
      ]
    }
  ];

  const communityImpact = {
    metrics: [
      { label: t('metric.investment'), value: formatCurrency(12500000) },
      { label: t('metric.score'), value: '+72 points' },
      { label: t('metric.jobs'), value: '185' },
      { label: t('metric.workshops'), value: '327' }
    ]
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">{t('app.name')}</h2>
            <p className="text-white text-base mt-3 leading-relaxed">
              {t('app.overview')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
            <Globe size={24} className="text-white" />
          </div>
        </div>
        <Button
          variant="text"
          withArrow
          onClick={() => setShowIntegrationModal(true)}
        >
          {t('app.explore')}
        </Button>
      </Card>

      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xs font-normal tracking-widest text-gray-400 uppercase">{t('dashboard.components')}</h2>
          <div className="text-xs text-gray-500 uppercase">{t('dashboard.pillars')}</div>
        </div>

        <div className="space-y-4">
        {platforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              name={platform.name}
              description={platform.description}
              color={platform.color}
              metrics={platform.metrics}
              onClick={() => window.dispatchEvent(new CustomEvent('setActiveTab', { detail: platform.id }))}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xs font-normal tracking-widest text-gray-400 uppercase">{t('dashboard.impact')}</h2>
        </div>

        <Card>
          <div className="mb-4">
            <div className="text-sm uppercase tracking-wider">{t('dashboard.universal')}</div>
            <div className="text-xs text-gray-400 mt-1">{t('dashboard.impact.desc')}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {communityImpact.metrics.map((metric, index) => (
              <MetricDisplay
                key={index}
                label={metric.label}
                value={metric.value}
              />
            ))}
          </div>
        </Card>
      </div>

      {showIntegrationModal && (
        <IntegrationModal onClose={() => setShowIntegrationModal(false)} platforms={platforms} />
      )}
    </div>
  );
};

interface IntegrationModalProps {
  onClose: () => void;
  platforms: Array<{
    id: string;
    name: string;
    color: string;
    description: string;
    metrics: Array<{ label: string; value: string }>;
  }>;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ onClose, platforms }) => {
  const integrations = [
    {
      title: 'WEALTH + HUB',
      description: 'Pay-in-4 at physical locations builds credit while supporting local businesses',
      platforms: ['wealth', 'hub']
    },
    {
      title: 'HUB + TRENDCRYPTO',
      description: 'Physical spaces host education workshops informed by AI market insights',
      platforms: ['hub', 'trendcrypto']
    },
    {
      title: 'TRENDCRYPTO + WEALTH',
      description: '5% premium model uses LKHN payment infrastructure for seamless upgrade',
      platforms: ['trendcrypto', 'wealth']
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-black w-full max-w-lg rounded-sm border border-gray-800 p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-sm tracking-wider uppercase">QUANTUM INTEGRATION</h3>
          <button
            onClick={onClose}
            className="text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          The true power of our ecosystem emerges through the seamless integration of these three pillars, creating a quantum effect where the whole is greater than the sum of its parts.
        </p>

        <div className="space-y-6 mb-6">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="text-sm uppercase tracking-wider">{integration.title}</div>
                <div className="flex">
                  {integration.platforms.map(platform => {
                    const plat = platforms.find(p => p.id === platform);
                    return (
                      <div
                        key={platform}
                        className="w-3 h-3 rounded-full ml-1"
                        style={{ backgroundColor: plat?.color || '#888' }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-gray-300">{integration.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-800">
          <div className="text-center">
            <h4 className="text-sm uppercase tracking-wider mb-2">UNIVERSAL WEALTH VISION</h4>
            <p className="text-xs text-gray-400">
              A new paradigm for wealth that is distributed rather than concentrated, communal rather than individualistic, and inclusive by design rather than as an afterthought.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
