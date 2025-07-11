import React, { useState } from 'react';
import { Home, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Stock from './components/Stock';
import Shopping from './components/Shopping';
import Analytics from './components/Analytics';
import Navigation from './components/Navigation';

type Page = 'dashboard' | 'stock' | 'shopping' | 'analytics';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'stock':
        return <Stock />;
      case 'shopping':
        return <Shopping />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-16 max-w-lg mx-auto">
        {renderPage()}
      </div>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;