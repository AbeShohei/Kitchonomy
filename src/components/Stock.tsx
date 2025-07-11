import React, { useState } from 'react';
import { Refrigerator, Snowflake, Home, Plus, Edit3, Calendar, AlertTriangle } from 'lucide-react';
import AddItemModal from './AddItemModal';

const Stock = () => {
  const [activeTab, setActiveTab] = useState<'fridge' | 'freezer' | 'pantry'>('fridge');
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  const stockData = {
    fridge: [
      { name: '牛乳', amount: 20, unit: '%', expiry: '2024-12-18', category: '乳製品', icon: '🥛' },
      { name: '卵', amount: 8, unit: '個', expiry: '2024-12-20', category: '卵・乳製品', icon: '🥚' },
      { name: 'トマト', amount: 5, unit: '個', expiry: '2024-12-16', category: '野菜', icon: '🍅' },
      { name: 'レタス', amount: 2, unit: '玉', expiry: '2024-12-17', category: '野菜', icon: '🥬' },
      { name: 'チーズ', amount: 80, unit: '%', expiry: '2024-12-25', category: '乳製品', icon: '🧀' },
    ],
    freezer: [
      { name: '冷凍ブロッコリー', amount: 10, unit: '%', expiry: '2025-06-15', category: '野菜', icon: '🥦' },
      { name: '冷凍エビ', amount: 60, unit: '%', expiry: '2025-03-20', category: '魚介類', icon: '🦐' },
      { name: 'アイスクリーム', amount: 40, unit: '%', expiry: '2025-08-10', category: 'デザート', icon: '🍦' },
      { name: '冷凍餃子', amount: 12, unit: '個', expiry: '2025-01-30', category: '冷凍食品', icon: '🥟' },
    ],
    pantry: [
      { name: '米', amount: 3, unit: 'kg', expiry: '2025-03-15', category: '穀物', icon: '🌾' },
      { name: '玉ねぎ', amount: 15, unit: '%', expiry: '2024-12-30', category: '野菜', icon: '🧅' },
      { name: 'パスタ', amount: 2, unit: '袋', expiry: '2025-06-20', category: '穀物', icon: '🍝' },
      { name: '調味料セット', amount: 90, unit: '%', expiry: '2025-12-31', category: '調味料', icon: '🧂' },
    ],
  };

  const tabs = [
    { id: 'fridge', label: '冷蔵庫', icon: Refrigerator, color: 'bg-blue-500' },
    { id: 'freezer', label: '冷凍庫', icon: Snowflake, color: 'bg-purple-500' },
    { id: 'pantry', label: '常温棚', icon: Home, color: 'bg-orange-500' },
  ];

  const isExpiringSoon = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  const getAmountColor = (amount: number) => {
    if (amount <= 20) return 'text-red-500';
    if (amount <= 50) return 'text-amber-500';
    return 'text-green-500';
  };

  const getAmountBg = (amount: number) => {
    if (amount <= 20) return 'bg-red-50';
    if (amount <= 50) return 'bg-amber-50';
    return 'bg-green-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">ストック管理</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex bg-white rounded-2xl p-2 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${tab.color} text-white shadow-md`
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Items */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {stockData[activeTab].map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
                isExpiringSoon(item.expiry) ? 'ring-2 ring-red-200' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{item.icon}</div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit3 size={16} />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{item.category}</p>
              
              {/* Amount Display */}
              <div className={`flex items-center justify-between p-2 rounded-lg mb-3 ${getAmountBg(item.amount)}`}>
                <span className="text-sm font-medium text-gray-700">残量</span>
                <span className={`font-bold ${getAmountColor(item.amount)}`}>
                  {item.amount}{item.unit}
                </span>
              </div>
              
              {/* Visual Amount Indicator */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.amount <= 20 ? 'bg-red-500' : 
                      item.amount <= 50 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(item.amount, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Expiry Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {new Date(item.expiry).toLocaleDateString('ja-JP', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {isExpiringSoon(item.expiry) && (
                  <div className="flex items-center space-x-1 text-red-500">
                    <AlertTriangle size={14} />
                    <span className="text-xs font-medium">期限近し</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <button 
          onClick={() => setAddItemModalOpen(true)}
          className="w-full mt-6 bg-white border-2 border-dashed border-gray-300 rounded-2xl py-8 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <Plus size={32} className="text-gray-400" />
            <span className="text-gray-600 font-medium">アイテムを追加</span>
          </div>
        </button>
      </div>

      {/* Modals */}
      <AddItemModal 
        isOpen={addItemModalOpen} 
        onClose={() => setAddItemModalOpen(false)} 
        type="stock"
      />
    </div>
  );
};

export default Stock;