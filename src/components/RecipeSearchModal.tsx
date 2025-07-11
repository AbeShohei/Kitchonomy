import React, { useState } from 'react';
import { Search, Clock, Users, ChefHat, Heart, Star } from 'lucide-react';
import Modal from './Modal';

interface RecipeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecipeSearchModal: React.FC<RecipeSearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'japanese', name: '和食' },
    { id: 'western', name: '洋食' },
    { id: 'chinese', name: '中華' },
    { id: 'quick', name: '時短' },
    { id: 'healthy', name: 'ヘルシー' },
  ];

  const recipes = [
    {
      id: 1,
      name: '鶏の照り焼き',
      image: '🍗',
      time: 25,
      servings: 2,
      difficulty: 'easy',
      rating: 4.8,
      category: 'japanese',
      ingredients: ['鶏もも肉', '醤油', 'みりん', '砂糖'],
    },
    {
      id: 2,
      name: 'トマトパスタ',
      image: '🍝',
      time: 15,
      servings: 2,
      difficulty: 'easy',
      rating: 4.6,
      category: 'western',
      ingredients: ['パスタ', 'トマト缶', 'にんにく', 'オリーブオイル'],
    },
    {
      id: 3,
      name: '野菜炒め',
      image: '🥬',
      time: 10,
      servings: 2,
      difficulty: 'easy',
      rating: 4.4,
      category: 'chinese',
      ingredients: ['キャベツ', '人参', 'ピーマン', '豚肉'],
    },
    {
      id: 4,
      name: 'サーモンのムニエル',
      image: '🐟',
      time: 20,
      servings: 2,
      difficulty: 'medium',
      rating: 4.7,
      category: 'western',
      ingredients: ['サーモン', 'バター', 'レモン', '小麦粉'],
    },
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      title="レシピ検索"
      size="xl"
    >
      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
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
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
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

        {/* Recipe Results */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <ChefHat size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">レシピが見つかりませんでした</p>
            </div>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{recipe.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{recipe.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{recipe.time}分</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users size={14} />
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
                  
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            キャンセル
          </button>
          <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            レシピを選択
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeSearchModal;