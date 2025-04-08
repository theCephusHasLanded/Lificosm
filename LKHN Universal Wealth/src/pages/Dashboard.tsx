import React, { useState } from 'react';
import { Globe, X } from 'lucide-react';
import Card from '../components/common/Card';

const Dashboard: React.FC = () => {
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

  const communityImpact = {
    metrics: [
      { label: 'Community Investment', value: formatCurrency(12500000) },
      { label: 'Avg Credit Score Increase', value: '+72 points' },
      { label: 'Jobs Created', value: '185' },
      { label: 'Financial Literacy Workshops', value: '327' }
    ]
  };

  return (
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
          EXPLORE QUANTUM INTEGRATION <X size={14} className="ml-1" />
        </button>
      </div>

      {/* Rest of the dashboard content would go here */}
    </div>
  );
};

export default Dashboard;
