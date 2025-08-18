import { useState } from 'react';

import { LikedHeartIcon, QuoteIcon } from '@/components';
import { cn, formatTime } from '@/helpers';
import { useNotifications } from '@/hooks';
import { AppNotification } from '@/types';

import { NotificationQuoteView } from './components';

type NotificationItemProps = {
  notification: AppNotification;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const [openQuoteEdit, setOpenQuoteEdit] = useState(false);
  const [openQuoteView, setOpenQuoteView] = useState(false);

  const { markAsRead } = useNotifications();

  const handleClick = () => {
    setOpenQuoteView(true);

    if (!notification.read_at) {
      markAsRead(notification.id);
    }
  };

  return (
    <>
      <div
        className='p-4 border border-gray-700 cursor-pointer bg-transparent rounded-sm'
        onClick={handleClick}
      >
        <div className='flex gap-4 items-center'>
          <div
            className={cn('flex flex-col gap-2', {
              'mb-6 md:mb-0': notification.read_at,
            })}
          >
            <img
              src={notification.from_user.avatar_url}
              alt='user_avatar'
              className={cn(
                'w-15 h-15 md:w-20 md:h-20 rounded-full object-contain bg-gray-300 flex-shrink-0',
                {
                  'outline-2 outline-green-600': !notification.read_at,
                },
              )}
            />

            {!notification.read_at && (
              <p className='text-green-700 text-center md:hidden'>New</p>
            )}
          </div>

          <div className='flex flex-col gap-1 md:text-xl'>
            <p className='text-nowrap overflow-ellipsis text-xl'>
              {notification.from_user.name}
            </p>

            <div className='flex gap-3'>
              {notification.type === 'comment' ? (
                <>
                  <QuoteIcon />
                  <span className='text-nowrap overflow-ellipsis'>
                    Commented on your quote
                  </span>
                </>
              ) : (
                <>
                  <LikedHeartIcon />
                  <span className='text-nowrap overflow-ellipsis'>
                    Reacted to your quote
                  </span>
                </>
              )}
            </div>

            <p className='md:hidden mt-2'>
              {formatTime(notification.created_at)}
            </p>
          </div>

          <div className='hidden md:grid grid-rows-2 gap-1 ml-auto text-xl'>
            <p>{formatTime(notification.created_at)}</p>

            {!notification.read_at && (
              <p className='text-green-700 text-end'>New</p>
            )}
          </div>
        </div>
      </div>

      {notification.quote && (
        <NotificationQuoteView
          notification={notification}
          setOpenQuoteEdit={setOpenQuoteEdit}
          openQuoteEdit={openQuoteEdit}
          setOpenQuoteView={setOpenQuoteView}
          openQuoteView={openQuoteView}
        />
      )}
    </>
  );
};
