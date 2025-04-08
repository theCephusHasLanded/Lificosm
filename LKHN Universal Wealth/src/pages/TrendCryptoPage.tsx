import React from 'react';
import { BarChart2, Zap, Check } from 'lucide-react';
import Card from '../components/common/Card';

const TrendCryptoPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center mt-4">
          <div className="w-2 h-12 mr-3" style={{ backgroundColor: '#2D81FF' }}></div>
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">LKHN TRENDCRYPTO</h2>
            <p className="text-white text-sm mt-1">AI-powered crypto analysis with focus on XRP and emerging coins</p>
          </div>
        </div>
      </div>

      <Card>
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
      </Card>

      <Card>
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
      </Card>
    </div>
  );
};

export default TrendCryptoPage;
