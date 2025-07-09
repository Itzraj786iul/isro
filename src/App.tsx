import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './components/Pages/HomePage';
import { PredictionPage } from './components/Pages/PredictionPage';
import { SimulationPage } from './components/Pages/SimulationPage';
import { DashboardPage } from './components/Pages/DashboardPage';
import { DownloadPage } from './components/Pages/DownloadPage';
import { AboutPage } from './components/Pages/AboutPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'predict':
        return <PredictionPage onNavigate={setActiveTab} />;
      case 'simulate':
        return <SimulationPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'download':
        return <DownloadPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="relative">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;