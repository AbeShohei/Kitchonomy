import React, { useState } from 'react';
import { Package, Calendar, MapPin, Camera } from 'lucide-react';
import Modal from './Modal';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    location: 'fridge',
    quantity: '',
    unit: 'pieces',
    expiryDate: '',
    purchaseDate: '',
    notes: '',
  });

  const categories = [
    { id: 'vegetables', name: '野菜', icon: '🥬' },
    { id: 'fruits', name: '果物', icon: '🍎' },
    { id: 'meat', name: '肉類', icon: '🥩' },
    { id: 'fish', name: '魚介類', icon: '🐟' },
    { id: 'dairy', name: '乳製品', icon: '🥛' },
    { id: 'grains', name: '穀物', icon: '🌾' },
    { id: 'condiments', name: '調味料', icon: '🧂' },
    { id: 'frozen', name: '冷凍食品', icon: '🧊' },
    { id: 'beverages', name: '飲み物', icon: '🥤' },
    { id: 'snacks', name: 'お菓子', icon: '🍪' },
  ];

  const locations = [
    { id: 'fridge', name: '冷蔵庫', icon: '🧊' },
    { id: 'freezer', name: '冷凍庫', icon: '❄️' },
    { id: 'pantry', name: '常温棚', icon: '🏠' },
  ];

  const units = [
    { id: 'pieces', name: '個' },
    { id: 'kg', name: 'kg' },
    { id: 'g', name: 'g' },
    { id: 'liters', name: 'L' },
    { id: 'ml', name: 'ml' },
    { id: 'packages', name: 'パック' },
    { id: 'bottles', name: '本' },
    { id: 'cans', name: '缶' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Stock data:', formData);
    onClose();
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ストックを追加"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            商品名 *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="例：トマト、牛乳、鶏胸肉"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleInputChange('category', category.id)}
                className={`p-3 rounded-xl border-2 transition-colors text-left ${
                  formData.category === category.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-sm font-medium text-gray-800">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            保存場所
          </label>
          <div className="grid grid-cols-3 gap-3">
            {locations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => handleInputChange('location', location.id)}
                className={`p-4 rounded-xl border-2 transition-colors text-center ${
                  formData.location === location.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{location.icon}</div>
                <div className="text-sm font-medium text-gray-800">{location.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              数量 *
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="1"
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              単位
            </label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              購入日
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                max={getTodayDate()}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              賞味期限
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                min={getTodayDate()}
              />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            写真（任意）
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Camera size={24} className="text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">商品の写真をアップロード</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG形式対応</p>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メモ（任意）
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            placeholder="特記事項があれば入力してください"
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
            ストックを追加
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStockModal;