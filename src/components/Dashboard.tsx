import React from 'react';
import { Search, Bell, User, Clock, ChefHat, AlertCircle, Plus, Camera, BookOpen, Package } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';
import NotificationModal from './NotificationModal';
import RecipeSearchModal from './RecipeSearchModal';
import AddRecipeModal from './AddRecipeModal';
import AddStockModal from './AddStockModal';
import MealPlanModal from './MealPlanModal';

const Dashboard = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [recipeSearchModalOpen, setRecipeSearchModalOpen] = useState(false);
  const [addRecipeModalOpen, setAddRecipeModalOpen] = useState(false);
  const [addStockModalOpen, setAddStockModalOpen] = useState(false);
  const [mealPlanModalOpen, setMealPlanModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);

  const todaysMeals = [
    { time: '朝食', dish: '和風オムレツ', image: '🥚', ready: true },
    { time: '昼食', dish: 'チキンサラダ', image: '🥗', ready: false },
    { time: '夕食', dish: 'サーモンテリヤキ', image: '🐟', ready: false },
  ];

  const lowStockItems = [
    { name: '牛乳', level: 20, location: '冷蔵庫' },
    { name: '玉ねぎ', level: 15, location: '常温棚' },
    { name: '冷凍ブロッコリー', level: 10, location: '冷凍庫' },
  ];

  const fabOptions = [
    { icon: Camera, label: 'レシートスキャン', color: 'bg-blue-500', action: () => console.log('Receipt scan') },
    { icon: BookOpen, label: 'レシピ追加', color: 'bg-purple-500', action: () => setAddRecipeModalOpen(true) },
    { icon: Package, label: 'ストック追加', color: 'bg-green-500', action: () => setAddStockModalOpen(true) },
  ];

  const handleMealEdit = (meal: any) => {
    setSelectedMeal(meal);
    setMealPlanModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <ChefHat size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Kitchonomy</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setNotificationModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="レシピや食材を検索..."
              onClick={() => setRecipeSearchModalOpen(true)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Today's Meals Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Clock size={20} className="mr-2 text-emerald-500" />
              今日の予定
            </h2>
            <span className="text-sm text-gray-500">12月15日</span>
          </div>
          
          <div className="space-y-3">
            {todaysMeals.map((meal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleMealEdit(meal)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{meal.image}</div>
                  <div>
                    <div className="font-medium text-gray-800">{meal.dish}</div>
                    <div className="text-sm text-gray-500">{meal.time}</div>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  meal.ready 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}>
                  {meal.ready ? '作る！' : '準備中'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Overview Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Package size={20} className="mr-2 text-blue-500" />
            ストック一覧
          </h2>
          
          {/* Storage Overview */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="text-2xl">🧊</div>
              </div>
              <div className="text-sm text-gray-600">冷蔵庫</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="text-2xl">❄️</div>
              </div>
              <div className="text-sm text-gray-600">冷凍庫</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-purple-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="text-2xl">🏠</div>
              </div>
              <div className="text-sm text-gray-600">常温棚</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-orange-500 h-2 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <AlertCircle size={16} className="mr-2 text-amber-500" />
              残りわずか
            </h3>
            <div className="space-y-2">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <AlertCircle size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.location}</div>
                    </div>
                  </div>
                  <div className="text-sm text-amber-600 font-medium">{item.level}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">クイックアクション</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setRecipeSearchModalOpen(true)}
              className="p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <BookOpen size={24} className="text-emerald-600 mb-2" />
              <div className="text-sm font-medium text-gray-800">レシピ検索</div>
            </button>
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <Camera size={24} className="text-blue-600 mb-2" />
              <div className="text-sm font-medium text-gray-800">レシート撮影</div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6 z-20">
        <div className="group relative">
          <button className="w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-200 flex items-center justify-center hover:scale-110">
            <Plus size={24} />
          </button>
          
          {/* FAB Options */}
          <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 space-y-3">
            {fabOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-end space-x-3 animate-in slide-in-from-right duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-700 leading-none">{option.label}</span>
                </div>
                <button 
                  onClick={option.action}
                  className={`w-12 h-12 ${option.color} text-white rounded-full shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center hover:shadow-xl`}
                >
                  <option.icon size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      <NotificationModal 
        isOpen={notificationModalOpen} 
        onClose={() => setNotificationModalOpen(false)} 
      />
      <RecipeSearchModal 
        isOpen={recipeSearchModalOpen} 
        onClose={() => setRecipeSearchModalOpen(false)} 
      />
      <AddRecipeModal 
        isOpen={addRecipeModalOpen} 
        onClose={() => setAddRecipeModalOpen(false)} 
      />
      <AddStockModal 
        isOpen={addStockModalOpen} 
        onClose={() => setAddStockModalOpen(false)} 
      />
      <MealPlanModal 
        isOpen={mealPlanModalOpen} 
        onClose={() => setMealPlanModalOpen(false)} 
        initialMeal={selectedMeal}
      />
    </div>
  );
};

export default Dashboard;