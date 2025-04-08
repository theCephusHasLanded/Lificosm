import React, { useState } from 'react';
import { CreditCard, TrendingUp, Users, Zap, PieChart, Calendar, ArrowRight } from 'lucide-react';
import Card from '../components/common/Card';
import MetricDisplay from '../components/common/MetricDisplay';
import { useTranslation } from '../contexts/TranslationContext';

const WealthPage: React.FC = () => {
  const { t, language } = useTranslation();
  const [activeSection, setActiveSection] = useState<'overview' | 'pay-in-4' | 'investments' | 'ai-assistant'>('overview');

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

  // Placeholder for charts - would use a real chart library in production
  const PlaceholderChart = () => (
    <div className="h-40 w-full bg-gray-900 relative overflow-hidden rounded-sm">
      <div className="absolute inset-0 flex items-end">
        <div className="h-20% w-8% bg-green-500 mx-1"></div>
        <div className="h-40% w-8% bg-green-500 mx-1"></div>
        <div className="h-30% w-8% bg-green-500 mx-1"></div>
        <div className="h-60% w-8% bg-green-500 mx-1"></div>
        <div className="h-45% w-8% bg-green-500 mx-1"></div>
        <div className="h-70% w-8% bg-green-500 mx-1"></div>
        <div className="h-50% w-8% bg-green-500 mx-1"></div>
        <div className="h-80% w-8% bg-green-500 mx-1"></div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 mb-2">
        <MetricDisplay label="Credit Score" value="684" />
        <MetricDisplay label="Available Credit" value={formatCurrency(2500)} />
        <MetricDisplay label="Savings" value={formatCurrency(1875)} />
        <MetricDisplay label="Investments" value={formatCurrency(5340)} />
      </div>
      
      <Card>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm uppercase tracking-wider">Financial Summary</h3>
          <div className="text-xs text-gray-500">Last 30 Days</div>
        </div>
        <PlaceholderChart />
      </Card>
      
      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => setActiveSection('pay-in-4')}
          className="bg-gray-900 p-3 rounded-sm flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <CreditCard size={24} className="mb-2 text-green-500" />
          <span className="text-xs text-center">Pay-in-4</span>
        </button>
        
        <button 
          onClick={() => setActiveSection('investments')}
          className="bg-gray-900 p-3 rounded-sm flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <PieChart size={24} className="mb-2 text-green-500" />
          <span className="text-xs text-center">Investments</span>
        </button>
        
        <button 
          onClick={() => setActiveSection('ai-assistant')}
          className="bg-gray-900 p-3 rounded-sm flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <Zap size={24} className="mb-2 text-green-500" />
          <span className="text-xs text-center">AI Assistant</span>
        </button>
      </div>
    </div>
  );

  const renderPayIn4 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-wider">PAY-IN-4 CREDIT BUILDER</h3>
        <button 
          onClick={() => setActiveSection('overview')}
          className="text-xs text-gray-400 hover:text-white"
        >
          Back
        </button>
      </div>
      
      <Card>
        <p className="text-xs text-gray-400 mb-3">
          Building alternative credit through manageable installment payments, accessible to underserved communities.
        </p>
        <div className="bg-gray-900 p-3 rounded-sm flex justify-between items-center mb-4">
          <div className="text-xs">Average Credit Increase:</div>
          <div className="text-sm text-green-400 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            +58 POINTS
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm">Active Payment Plans</h4>
          <div className="border border-gray-800 p-3 rounded-sm">
            <div className="flex justify-between">
              <span className="text-sm">Grocery Purchase</span>
              <span className="text-xs text-gray-400">{formatCurrency(235)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex text-xs text-gray-500 space-x-2">
                <span>2 of 4 payments</span>
                <span>•</span>
                <span>Next: May 15</span>
              </div>
              <span className="text-xs text-gray-400">3% cashback</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full mt-2">
              <div className="h-full bg-green-500 rounded-full" style={{width: '50%'}}></div>
            </div>
          </div>
          
          <div className="border border-gray-800 p-3 rounded-sm">
            <div className="flex justify-between">
              <span className="text-sm">Medical Bill</span>
              <span className="text-xs text-gray-400">{formatCurrency(340)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex text-xs text-gray-500 space-x-2">
                <span>1 of 4 payments</span>
                <span>•</span>
                <span>Next: May 22</span>
              </div>
              <span className="text-xs text-gray-400">0% interest</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full mt-2">
              <div className="h-full bg-green-500 rounded-full" style={{width: '25%'}}></div>
            </div>
          </div>
        </div>
      </Card>
      
      <button className="w-full bg-gray-900 p-3 text-sm rounded-sm hover:bg-gray-800">
        Start New Payment Plan
      </button>
    </div>
  );

  const renderInvestments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-wider">COMMUNITY INVESTMENT POOLS</h3>
        <button 
          onClick={() => setActiveSection('overview')}
          className="text-xs text-gray-400 hover:text-white"
        >
          Back
        </button>
      </div>
      
      <Card>
        <p className="text-xs text-gray-400 mb-3">
          Collective capital deployment without traditional banking gatekeepers.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <MetricDisplay label="Active Pools" value="12" />
          <MetricDisplay label="Total Capital" value={formatCurrency(3800000)} />
          <MetricDisplay label="Your Investment" value={formatCurrency(5340)} />
          <MetricDisplay label="Portfolio Growth" value="+12.3%" />
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm mb-2">Your Investment Pools</h4>
          
          <div className="border border-gray-800 p-3 rounded-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm">Bronx Small Business Fund</span>
              <span className="text-xs bg-green-900 text-green-400 px-2 py-1 rounded-full">+15.2%</span>
            </div>
            <div className="text-xs text-gray-400 mt-1 mb-2">Invested: {formatCurrency(2000)}</div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">48 investors</span>
              <span className="text-gray-400">Started: Jan 2024</span>
            </div>
          </div>
          
          <div className="border border-gray-800 p-3 rounded-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm">Community Solar Project</span>
              <span className="text-xs bg-green-900 text-green-400 px-2 py-1 rounded-full">+8.7%</span>
            </div>
            <div className="text-xs text-gray-400 mt-1 mb-2">Invested: {formatCurrency(3340)}</div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">112 investors</span>
              <span className="text-gray-400">Started: Mar 2024</span>
            </div>
          </div>
        </div>
      </Card>
      
      <button className="w-full bg-gray-900 p-3 text-sm rounded-sm hover:bg-gray-800">
        Explore Investment Opportunities
      </button>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-wider">AI FINANCIAL ASSISTANT</h3>
        <button 
          onClick={() => setActiveSection('overview')}
          className="text-xs text-gray-400 hover:text-white"
        >
          Back
        </button>
      </div>
      
      <Card className="p-4">
        <div className="flex items-center justify-center h-72 flex-col">
          <Zap size={48} className="text-green-500 mb-4" />
          <p className="text-sm text-center mb-3">Your AI financial assistant is ready to help.</p>
          <p className="text-xs text-gray-400 text-center mb-4 max-w-xs">
            Get personalized advice, budget planning, and insights to build wealth and improve financial health.
          </p>
          <button className="bg-green-900 text-green-400 px-4 py-2 text-sm rounded-sm hover:bg-green-800">
            Start Conversation
          </button>
        </div>
      </Card>
      
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-wider text-gray-400">Suggested Topics</h4>
        
        <div className="flex flex-wrap gap-2">
          <div className="bg-gray-900 px-3 py-1 rounded-full text-xs">
            Budget Optimization
          </div>
          <div className="bg-gray-900 px-3 py-1 rounded-full text-xs">
            Debt Reduction
          </div>
          <div className="bg-gray-900 px-3 py-1 rounded-full text-xs">
            Credit Building
          </div>
          <div className="bg-gray-900 px-3 py-1 rounded-full text-xs">
            Investment Strategies
          </div>
          <div className="bg-gray-900 px-3 py-1 rounded-full text-xs">
            Financial Goals
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center mt-4">
          <div className="w-2 h-12 mr-3" style={{ backgroundColor: '#45B26B' }}></div>
          <div>
            <h2 className="text-sm font-normal tracking-widest text-gray-400 uppercase">{t('wealth.name')}</h2>
            <p className="text-white text-sm mt-1">{t('wealth.description')}</p>
          </div>
        </div>
      </div>

      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'pay-in-4' && renderPayIn4()}
      {activeSection === 'investments' && renderInvestments()}
      {activeSection === 'ai-assistant' && renderAIAssistant()}
    </div>
  );
};

export default WealthPage;
