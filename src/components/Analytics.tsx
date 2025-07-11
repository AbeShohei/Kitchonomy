import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, BarChart3 } from 'lucide-react';

const Analytics = () => {
  const monthlyData = [
    { month: '7月', amount: 32000 },
    { month: '8月', amount: 28000 },
    { month: '9月', amount: 35000 },
    { month: '10月', amount: 31000 },
    { month: '11月', amount: 29000 },
    { month: '12月', amount: 33000 },
  ];

  const categoryData = [
    { name: '食費', amount: 25000, percentage: 60, color: 'bg-blue-500' },
    { name: '外食', amount: 8000, percentage: 20, color: 'bg-green-500' },
    { name: 'カフェ', amount: 5000, percentage: 12, color: 'bg-purple-500' },
    { name: 'その他', amount: 3000, percentage: 8, color: 'bg-gray-500' },
  ];

  const budget = {
    current: 33000,
    total: 40000,
    percentage: 82.5,
  };

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">家計分析</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Budget Tracker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <DollarSign size={20} className="mr-2 text-green-500" />
              予算トラッカー
            </h2>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">12月</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">今月の食費予算</span>
              <span className="text-sm font-medium text-gray-800">
                ¥{budget.current.toLocaleString()} / ¥{budget.total.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  budget.percentage > 90 ? 'bg-red-500' :
                  budget.percentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${budget.percentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">残り: ¥{(budget.total - budget.current).toLocaleString()}</span>
              <span className={`text-xs font-medium ${
                budget.percentage > 90 ? 'text-red-600' :
                budget.percentage > 75 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {budget.percentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingDown size={16} className="text-green-600" />
                <span className="text-sm text-green-700">先月比</span>
              </div>
              <span className="text-lg font-semibold text-green-800">-¥2,000</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp size={16} className="text-blue-600" />
                <span className="text-sm text-blue-700">平均単価</span>
              </div>
              <span className="text-lg font-semibold text-blue-800">¥1,375</span>
            </div>
          </div>
        </div>

        {/* Monthly Spending Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 size={20} className="mr-2 text-blue-500" />
            月間支出チャート
          </h2>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                  <div
                    className="bg-blue-500 h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                    style={{ width: `${(data.amount / maxAmount) * 100}%` }}
                  >
                    <span className="text-white text-sm font-medium">
                      ¥{data.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <PieChart size={20} className="mr-2 text-purple-500" />
            カテゴリ別内訳
          </h2>
          
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="text-gray-800 font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-800 font-semibold">¥{category.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{category.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">今月のインサイト</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-800">節約成功！</span>
              </div>
              <p className="text-sm text-green-700">
                先月より¥2,000節約できました。特に外食費が30%削減されています。
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-800">おすすめ</span>
              </div>
              <p className="text-sm text-blue-700">
                来月の予算を¥35,000に設定すると、より余裕のある家計管理ができそうです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;