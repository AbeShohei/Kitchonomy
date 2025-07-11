import React, { useState } from 'react';
import { Clock, ChefHat, Users, Calendar, Search, Star, X } from 'lucide-react';
import Modal from './Modal';

interface MealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMeal?: {
    time: string;
    dish: string;
    image: string;
    ready: boolean;
  };
}

const MealPlanModal: React.FC<MealPlanModalProps> = ({ isOpen, onClose, initialMeal }) => {
  const [selectedMeal, setSelectedMeal] = useState(initialMeal || {
    time: '朝食',
    dish: '',
    image: '🍳',
    ready: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mealTimes = [
    { id: '朝食', name: '朝食', icon: '🌅', time: '07:00' },
    { id: '昼食', name: '昼食', icon: '☀️', time: '12:00' },
    { id: '夕食', name: '夕食', icon: '🌙', time: '18:00' },
    { id: '間食', name: '間食', icon: '🍪', time: '15:00' },
  ];

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'japanese', name: '和食' },
    { id: 'western', name: '洋食' },
    { id: 'chinese', name: '中華' },
    { id: 'quick', name: '時短' },
    { id: 'healthy', name: 'ヘルシー' },
  ];

  const suggestedRecipes = [
    {
      id: 1,
      name: '和風オムレツ',
      image: '🥚',
      time: 15,
      servings: 2,
      rating: 4.8,
      category: 'japanese',
      difficulty: 'easy',
      ingredients: ['卵', '醤油', 'みりん', 'ネギ'],
    },
    {
      id: 2,
      name: 'チキンサラダ',
      image: '🥗',
      time: 20,
      servings: 2,
      rating: 4.6,
      category: 'western',
      difficulty: 'easy',
      ingredients: ['鶏胸肉', 'レタス', 'トマト', 'ドレッシング'],
    },
    {
      id: 3,
      name: 'サーモンテリヤキ',
      image: '🐟',
      time: 25,
      servings: 2,
      rating: 4.9,
      category: 'japanese',
      difficulty: 'medium',
      ingredients: ['サーモン', '醤油', 'みりん', '砂糖'],
    },
    {
      id: 4,
      name: 'パスタアラビアータ',
      image: '🍝',
      time: 18,
      servings: 2,
      rating: 4.5,
      category: 'western',
      difficulty: 'easy',
      ingredients: ['パスタ', 'トマト缶', 'にんにく', '唐辛子'],
    },
    {
      id: 5,
      name: '野菜炒め',
      image: '🥬',
      time: 12,
      servings: 2,
      rating: 4.3,
      category: 'chinese',
      difficulty: 'easy',
      ingredients: ['キャベツ', '人参', 'ピーマン', '豚肉'],
    },
    {
      id: 6,
      name: 'フルーツヨーグルト',
      image: '🍓',
      time: 5,
      servings: 1,
      rating: 4.4,
      category: 'healthy',
      difficulty: 'easy',
      ingredients: ['ヨーグルト', 'バナナ', 'ベリー', 'ハチミツ'],
    },
  ];

  const filteredRecipes = suggestedRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRecipeSelect = (recipe: any) => {
    setSelectedMeal(prev => ({
      ...prev,
      dish: recipe.name,
      image: recipe.image,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated meal plan:', selectedMeal);
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '簡単';
      case 'medium':
        return '普通';
      case 'hard':
        return '難しい';
      default:
        return '不明';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="食事プランを編集"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Current Selection */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <h3 className="text-sm font-medium text-emerald-800 mb-3">現在の選択</h3>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{selectedMeal.image}</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{selectedMeal.dish || '未選択'}</div>
              <div className="text-sm text-gray-600">{selectedMeal.time}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {mealTimes.find(m => m.id === selectedMeal.time)?.time}
              </div>
            </div>
          </div>
        </div>

        {/* Meal Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            食事の時間
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mealTimes.map((mealTime) => (
              <button
                key={mealTime.id}
                type="button"
                onClick={() => setSelectedMeal(prev => ({ ...prev, time: mealTime.id }))}
                className={`p-4 rounded-xl border-2 transition-colors text-center ${
                  selectedMeal.time === mealTime.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{mealTime.icon}</div>
                <div className="font-medium text-gray-800">{mealTime.name}</div>
                <div className="text-xs text-gray-500">{mealTime.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            レシピを選択
          </label>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="レシピや食材で検索..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
            {filteredRecipes.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <ChefHat size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">レシピが見つかりませんでした</p>
              </div>
            ) : (
              filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeSelect(recipe)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedMeal.dish === recipe.name
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-3xl">{recipe.image}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{recipe.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{recipe.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{recipe.time}分</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{recipe.servings}人分</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                      {getDifficultyText(recipe.difficulty)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white rounded-full text-xs text-gray-600"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <span className="px-2 py-1 bg-white rounded-full text-xs text-gray-500">
                        +{recipe.ingredients.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Custom Recipe Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            または、カスタム料理名を入力
          </label>
          <input
            type="text"
            value={selectedMeal.dish}
            onChange={(e) => setSelectedMeal(prev => ({ ...prev, dish: e.target.value }))}
            placeholder="例：手作りハンバーグ"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
          >
            食事プランを更新
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MealPlanModal;