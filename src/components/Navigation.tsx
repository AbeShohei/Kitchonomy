import React from 'react';
import { Home, Package, ShoppingCart, TrendingUp } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: 'dashboard' | 'stock' | 'shopping' | 'analytics') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'ホーム', icon: Home },
    { id: 'stock', label: 'ストック', icon: Package },
    { id: 'shopping', label: '買い物', icon: ShoppingCart },
    { id: 'analytics', label: '家計', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as any)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;