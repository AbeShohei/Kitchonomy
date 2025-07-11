import React, { useState } from 'react';
import { Camera, Share2, Check, Plus, ShoppingBag, Scan, Users } from 'lucide-react';
import AddItemModal from './AddItemModal';

const Shopping = () => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [scanResult, setScanResult] = useState<any>(null);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  const shoppingList = [
    { id: 1, name: '牛乳', category: '乳製品', urgent: true },
    { id: 2, name: '玉ねぎ', category: '野菜', urgent: true },
    { id: 3, name: '鶏胸肉', category: '肉類', urgent: false },
    { id: 4, name: 'パン', category: '穀物', urgent: false },
    { id: 5, name: 'バナナ', category: '果物', urgent: false },
    { id: 6, name: 'ヨーグルト', category: '乳製品', urgent: false },
    { id: 7, name: 'トマト', category: '野菜', urgent: false },
    { id: 8, name: 'お米', category: '穀物', urgent: false },
  ];

  const categories = ['乳製品', '野菜', '肉類', '穀物', '果物'];

  const toggleCheck = (id: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const handleScan = () => {
    // Simulate receipt scanning
    setScanResult({
      items: [
        { name: '牛乳', price: 198, quantity: 1 },
        { name: '玉ねぎ', price: 158, quantity: 1 },
        { name: 'パン', price: 128, quantity: 1 },
      ],
      total: 484,
      date: new Date().toLocaleDateString('ja-JP'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">買い物</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Smart Shopping List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <ShoppingBag size={20} className="mr-2 text-green-500" />
              スマート買い物リスト
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                <Share2 size={16} />
              </button>
              <button className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
                <Users size={16} />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>進捗状況</span>
              <span>{checkedItems.size} / {shoppingList.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(checkedItems.size / shoppingList.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {categories.map((category) => {
            const categoryItems = shoppingList.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="mb-6 last:mb-0">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        checkedItems.has(item.id)
                          ? 'bg-green-50 border-green-200 border'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          checkedItems.has(item.id)
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {checkedItems.has(item.id) && <Check size={14} />}
                      </button>
                      <span className={`flex-1 ${
                        checkedItems.has(item.id)
                          ? 'text-green-700 line-through'
                          : 'text-gray-800'
                      }`}>
                        {item.name}
                      </span>
                      {item.urgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                          急ぎ
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <button 
            onClick={() => setAddItemModalOpen(true)}
            className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Plus size={20} />
              <span>アイテムを追加</span>
            </div>
          </button>
        </div>

        {/* Receipt Scanner */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Scan size={20} className="mr-2 text-purple-500" />
            レシートスキャナー
          </h2>

          {!scanResult ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={32} className="text-purple-500" />
              </div>
              <p className="text-gray-600 mb-6">
                レシートを撮影して、自動的に買い物記録を作成します
              </p>
              <button
                onClick={handleScan}
                className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors font-medium"
              >
                レシートをスキャン
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">スキャン結果</h3>
                <span className="text-sm text-gray-500">{scanResult.date}</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {scanResult.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-800">{item.name}</span>
                        <span className="text-sm text-gray-500">×{item.quantity}</span>
                      </div>
                      <span className="font-medium text-gray-800">¥{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex items-center justify-between font-semibold text-gray-800">
                    <span>合計</span>
                    <span>¥{scanResult.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                  承認して登録
                </button>
                <button
                  onClick={() => setScanResult(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  再スキャン
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">クイックアクション</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <Users size={24} className="text-blue-600 mb-2" />
              <div className="text-sm font-medium text-gray-800">家族と共有</div>
            </button>
            <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <ShoppingBag size={24} className="text-green-600 mb-2" />
              <div className="text-sm font-medium text-gray-800">買い物履歴</div>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddItemModal 
        isOpen={addItemModalOpen} 
        onClose={() => setAddItemModalOpen(false)} 
        type="shopping"
      />
    </div>
  );
};

export default Shopping;