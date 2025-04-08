import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/DashboardPage';
import WealthPage from './pages/WealthPage';
import HubPage from './pages/HubPage';
import TrendCryptoPage from './pages/TrendCryptoPage';
import LificosmPage from './pages/LificosmPage';
import LandingPage from './pages/LandingPage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleSetActiveTab = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('setActiveTab', handleSetActiveTab as EventListener);

    return () => {
      window.removeEventListener('setActiveTab', handleSetActiveTab as EventListener);
    };
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && <Dashboard />}
      {activeTab === 'wealth' && <WealthPage />}
      {activeTab === 'hub' && <HubPage />}
      {activeTab === 'trendcrypto' && <TrendCryptoPage />}
      {activeTab === 'lificosm' && <LificosmPage />}
    </Layout>
  );
}

export default App;
