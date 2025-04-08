import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  CreditCard,
  Coffee,
  Users,
  ChevronRight,
  X,
  Check,
  Zap,
  Building,
  Globe
} from 'lucide-react';

const UniversalWealthDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const platforms = [
    {
      id: 'wealth',
      name: 'WEALTH BY LKHN',
      description: 'Financial inclusion platform with AI assistant and Pay-in-4 credit building',
      color: '#45B26B',
      metrics: [
        { label: 'Users', value: '12,582' },
        { label: 'Avg. Credit Increase', value: '+58 pts' },
        { label: 'Total Capital Accessed', value: formatCurrency(8400000) }
      ]
    },
    {
      id: 'hub',
      name: 'LKHN HUB',
      description: 'Physical spaces for community, creation, and financial education',
      color: '#6E56CF',
      metrics: [
        { label: 'Active Locations', value: '2' },
        { label: 'Monthly Visitors', value: '3,450' },
        { label: 'Local Businesses Supported', value: '48' }
      ]
    },
    {
      id: 'trendcrypto',
      name: 'LKHN TRENDCRYPTO',
      description: 'AI-powered crypto analysis with focus on XRP and emerging coins',
      color: '#2D81FF',
      metrics: [
        { label: 'Premium Users', value: '4,218' },
        { label: 'Trend Detection Lead Time', value: '3.2 days' },
        { label: 'Avg. Portfolio Performance', value: '+32%' }
      ]
    }
  ];

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

  const communityImpact = {
    metrics: [
      { label: 'Community Investment', value: formatCurrency(12500000) },
      { label: 'Avg Credit Score Increase', value: '+72 points' },
      { label: 'Jobs Created', value: '185' },
      { label: 'Financial Literacy Workshops', value: '327' }
    ]
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="bg-black p-6 rounded-sm border border-gray-800">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">LKHN UNIVERSAL WEALTH</h2>
            <p className="text-white text-base mt-3 leading-relaxed">
              A comprehensive ecosystem integrating digital finance, physical spaces, and AI-driven insights to create universal access to prosperity.
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
            <Globe size={24} className="text-white" />
          </div>
        </div>
        <button
          onClick={() => setShowIntegrationModal(true)}
          className="text-white text-xs uppercase tracking-wider flex items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          EXPLORE QUANTUM INTEGRATION <ChevronRight size={14} className="ml-1" />
        </button>
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xs font-normal tracking-widest text-gray-400 uppercase">ECOSYSTEM COMPONENTS</h2>
          <div className="text-xs text-gray-500 uppercase">THE THREE PILLARS</div>
        </div>

        <div className="space-y-4">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-black p-5 rounded-sm border border-gray-800"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="w-2 h-12 mr-3" style={{ backgroundColor: platform.color }}></div>
                  <div>
                    <div className="text-sm uppercase tracking-wider">{platform.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{platform.description}</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-800">
                {platform.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-400">{metric.label}</div>
                    <div className="text-sm font-medium mt-1">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xs font-normal tracking-widest text-gray-400 uppercase">COMMUNITY IMPACT</h2>
        </div>

        <div className="bg-black p-5 rounded-sm border border-gray-800">
          <div className="mb-4">
            <div className="text-sm uppercase tracking-wider">UNIVERSAL WEALTH IMPACT</div>
            <div className="text-xs text-gray-400 mt-1">Creating sustainable prosperity across underserved communities</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {communityImpact.metrics.map((metric, index) => (
              <div key={index} className="bg-gray-900 p-3 rounded-sm">
                <div className="text-xs text-gray-400">{metric.label}</div>
                <div className="text-base font-medium mt-1">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWealthTab = () => (
    <div className="space-y-6">
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className="text-xs text-gray-500 uppercase flex items-center"
        >
          ← BACK TO OVERVIEW
        </button>
        <div className="flex items-center mt-4">
          <div className="w-2 h-12 mr-3" style={{ backgroundColor: '#45B26B' }}></div>
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">WEALTH BY LKHN</h2>
            <p className="text-white text-sm mt-1">Financial inclusion platform with AI assistant and Pay-in-4 credit building</p>
          </div>
        </div>
      </div>

      <div className="bg-black p-5 rounded-sm border border-gray-800">
        <div className="flex items-center mb-3">
          <CreditCard size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">PAY-IN-4 CREDIT BUILDER</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Building alternative credit through manageable installment payments, accessible to underserved communities.
        </p>
        <div className="bg-gray-900 p-3 rounded-sm flex justify-between items-center">
          <div className="text-xs">Average Credit Increase:</div>
          <div className="text-sm text-green-400 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            +58 POINTS
          </div>
        </div>
      </div>

      <div className="bg-black p-5 rounded-sm border border-gray-800">
        <div className="flex items-center mb-3">
          <Users size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">COMMUNITY INVESTMENT POOLS</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Collective capital deployment without traditional banking gatekeepers.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 p-3 rounded-sm">
            <div className="text-xs text-gray-400">Active Pools</div>
            <div className="text-base font-medium mt-1">12</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-sm">
            <div className="text-xs text-gray-400">Total Capital</div>
            <div className="text-base font-medium mt-1">{formatCurrency(3800000)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHubTab = () => (
    <div className="space-y-6">
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className="text-xs text-gray-500 uppercase flex items-center"
        >
          ← BACK TO OVERVIEW
        </button>
        <div className="flex items-center mt-4">
          <div className="w-2 h-12 mr-3" style={{ backgroundColor: '#6E56CF' }}></div>
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">LKHN HUB</h2>
            <p className="text-white text-sm mt-1">Physical spaces for community, creation, and financial education</p>
          </div>
        </div>
      </div>

      <div className="bg-black p-5 rounded-sm border border-gray-800">
        <div className="flex items-center mb-3">
          <Building size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">PHYSICAL LOCATIONS</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Minimalist-designed environments where knowledge, creativity, and capital converge.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 p-3 rounded-sm">
            <div className="text-xs text-gray-400">Austin, TX</div>
            <div className="text-xs text-green-400 mt-1">ACTIVE</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-sm">
            <div className="text-xs text-gray-400">Houston, TX</div>
            <div className="text-xs text-green-400 mt-1">ACTIVE</div>
          </div>
        </div>
      </div>

      <div className="bg-black p-5 rounded-sm border border-gray-800">
        <div className="flex items-center mb-3">
          <Coffee size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">CREATOR SPACES</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Dedicated environments for collaboration, innovation, and community building.
        </p>
        <div className="h-32 bg-gray-900 rounded-sm flex items-center justify-center mb-2">
          <div className="text-xs uppercase tracking-wider text-gray-500">HUB VISUALIZATION</div>
        </div>
        <div className="text-xs text-center text-gray-400">
          Minimalist black and white design with focus on functionality and community
        </div>
      </div>
    </div>
  );

  const renderTrendCryptoTab = () => (
    <div className="space-y-6">
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className="text-xs text-gray-500 uppercase flex items-center"
        >
          ← BACK TO OVERVIEW
        </button>
        <div className="flex items-center mt-4">
          <div className="w-2 h-12 mr-3" style={{ backgroundColor: '#2D81FF' }}></div>
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">LKHN TRENDCRYPTO</h2>
            <p className="text-white text-sm mt-1">AI-powered crypto analysis with focus on XRP and emerging coins</p>
          </div>
        </div>
      </div>

      <div className="bg-black p-5 rounded-sm border border-gray-800">
        <div className="flex items-center mb-3">
          <BarChart2 size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">AI MARKET ANALYSIS</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Advanced artificial intelligence analyzing crypto markets with focus on XRP and emerging coins.
        </p>
        <div className="bg-gray-900 p-3 rounded-sm">
          <p className="text-xs">
            ONDO shows promise with increasing activity despite market volatility. AI analysis suggests potential for growth based on technical patterns and investor sentiment.
          </p>
        </div>
      </div>

      <div className="bg-black p-5 rounded-sm border border-gray-800">
        <div className="flex items-center mb-3">
          <Zap size={18} className="mr-2 text-gray-400" />
          <h3 className="text-sm uppercase tracking-wider">5% PREMIUM MODEL</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Advanced features unlocked with just 5% portfolio investment.
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-xs text-white">
            <Check size={14} className="mr-2 text-green-400" />
            <span>85% higher prediction accuracy</span>
          </div>
          <div className="flex items-center text-xs text-white">
            <Check size={14} className="mr-2 text-green-400" />
            <span>Average 3.2 days earlier trend detection</span>
          </div>
          <div className="flex items-center text-xs text-white">
            <Check size={14} className="mr-2 text-green-400" />
            <span>Custom risk profiles and portfolio rebalancing</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-black w-full max-w-lg rounded-sm border border-gray-800 p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-sm tracking-wider uppercase">QUANTUM INTEGRATION</h3>
          <button
            onClick={() => setShowIntegrationModal(false)}
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

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-900 py-4 px-6">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h1 className="text-base font-normal tracking-widest uppercase">LKHN UNIVERSAL WEALTH</h1>
          <div className="text-xs text-gray-500 uppercase">QUANTUM ECOSYSTEM</div>
        </div>
      </header>

      <main className="px-6 pb-24 pt-8 max-w-lg mx-auto">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'wealth' && renderWealthTab()}
        {activeTab === 'hub' && renderHubTab()}
        {activeTab === 'trendcrypto' && renderTrendCryptoTab()}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-900 bg-black">
        <div className="flex justify-around max-w-lg mx-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`p-4 flex flex-col items-center ${activeTab === 'overview' ? 'text-white' : 'text-gray-600'}`}
          >
            <Globe size={20} />
            <span className="text-xs mt-1 uppercase tracking-wider">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('wealth')}
            className={`p-4 flex flex-col items-center ${activeTab === 'wealth' ? 'text-white' : 'text-gray-600'}`}
          >
            <CreditCard size={20} />
            <span className="text-xs mt-1 uppercase tracking-wider">Wealth</span>
          </button>

          <button
            onClick={() => setActiveTab('hub')}
            className={`p-4 flex flex-col items-center ${activeTab === 'hub' ? 'text-white' : 'text-gray-600'}`}
          >
            <Building size={20} />
            <span className="text-xs mt-1 uppercase tracking-wider">Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('trendcrypto')}
            className={`p-4 flex flex-col items-center ${activeTab === 'trendcrypto' ? 'text-white' : 'text-gray-600'}`}
          >
            <BarChart2 size={20} />
            <span className="text-xs mt-1 uppercase tracking-wider">TrendCrypto</span>
          </button>
        </div>
      </footer>

      {showIntegrationModal && renderIntegrationModal()}
    </div>
  );
};

export default UniversalWealthDemo;
