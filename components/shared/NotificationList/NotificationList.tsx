import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/hooks';
import { NotificationItem } from '@/components';

export const NotificationList = ({ isOpen }: { isOpen: boolean }) => {
  const { notifications, unreadCount, loading, markAllAsRead } =
    useNotifications();

  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className='absolute -left-65 md:-left-185 top-17 md:top-20 w-screen md:w-240 bg-black px-8 py-10 rounded-lg z-50 h-screen md:h-auto overflow-hidden'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl md:text-3xl font-medium mb-4'>
          {t('notificationList.title')}
        </h3>

        <div className='flex items-center space-x-2'>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className='text-sm md:text-xl hover:text-gray-300 cursor-pointer underline'
            >
              {t('notificationList.markAll')}
            </button>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-2 max-h-150 overflow-scroll'>
        {loading ? (
          <div className='p-4 text-center'>{t('notificationList.loading')}</div>
        ) : notifications.length === 0 ? (
          <div className='p-4 text-center'>{t('notificationList.none')}</div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
};
