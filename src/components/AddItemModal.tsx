import React, { useState } from 'react';
import { Plus, X, Package, ShoppingCart } from 'lucide-react';
import Modal from './Modal';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'shopping' | 'stock';
}

interface ItemData {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  priority: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, type }) => {
  const [items, setItems] = useState<ItemData[]>([{
    name: '',
    category: 'vegetables',
    quantity: '1',
    unit: 'pieces',
    priority: 'normal'
  }]);

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

  const priorities = [
    { id: 'low', name: '低', color: 'text-gray-600' },
    { id: 'normal', name: '普通', color: 'text-blue-600' },
    { id: 'high', name: '高', color: 'text-orange-600' },
    { id: 'urgent', name: '緊急', color: 'text-red-600' },
  ];

  const handleItemChange = (index: number, field: keyof ItemData, value: string) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems(prev => [...prev, {
      name: '',
      category: 'vegetables',
      quantity: '1',
      unit: 'pieces',
      priority: 'normal'
    }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter(item => item.name.trim() !== '');
    console.log(`Adding ${type} items:`, validItems);
    onClose();
    setItems([{
      name: '',
      category: 'vegetables',
      quantity: '1',
      unit: 'pieces',
      priority: 'normal'
    }]);
  };

  const title = type === 'shopping' ? '買い物リストに追加' : 'ストックアイテムを追加';
  const placeholder = type === 'shopping' ? '例：牛乳、パン、卵' : '例：トマト、鶏肉、調味料';

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.icon || '📦';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6 mb-6">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                  <h3 className="font-medium text-gray-800">
                    アイテム {index + 1}
                  </h3>
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  アイテム名 *
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder={placeholder}
                  required
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリ
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleItemChange(index, 'category', category.id)}
                      className={`p-3 rounded-lg border-2 transition-colors text-center ${
                        item.category === category.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg mb-1">{category.icon}</div>
                      <div className="text-xs font-medium text-gray-800">{category.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    数量
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    単位
                  </label>
                  <select
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
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

              {/* Priority (for shopping list) */}
              {type === 'shopping' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    優先度
                  </label>
                  <div className="flex space-x-2">
                    {priorities.map((priority) => (
                      <button
                        key={priority.id}
                        type="button"
                        onClick={() => handleItemChange(index, 'priority', priority.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          item.priority === priority.id
                            ? 'bg-emerald-500 text-white'
                            : `bg-gray-100 ${priority.color} hover:bg-gray-200`
                        }`}
                      >
                        {priority.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addItem}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Plus size={20} />
              <span>アイテムを追加</span>
            </div>
          </button>
        </div>

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
            className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium flex items-center space-x-2"
          >
            {type === 'shopping' ? <ShoppingCart size={18} /> : <Package size={18} />}
            <span>追加</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddItemModal;