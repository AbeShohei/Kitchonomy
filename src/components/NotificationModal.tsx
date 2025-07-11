import React from 'react';
import { Bell, AlertCircle, Info, CheckCircle, Clock } from 'lucide-react';
import Modal from './Modal';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: '賞味期限が近づいています',
      message: 'トマトの賞味期限が明日です。早めにお使いください。',
      time: '2時間前',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: '買い物リストが更新されました',
      message: '牛乳と玉ねぎが買い物リストに追加されました。',
      time: '4時間前',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: '予算目標達成！',
      message: '今月の食費予算を10%下回りました。素晴らしいです！',
      time: '1日前',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'レシピの提案',
      message: '冷蔵庫の食材を使った新しいレシピを3つ見つけました。',
      time: '2日前',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={20} className="text-amber-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="お知らせ"
      size="lg"
    >
      <div className="p-6">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">新しいお知らせはありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-colors hover:shadow-sm ${getBgColor(notification.type)} ${
                  !notification.read ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
            すべて既読にする
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;