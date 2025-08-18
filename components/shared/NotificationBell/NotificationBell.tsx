import { useState, useRef } from 'react';

import { useClickAway } from 'react-use';

import { useNotifications } from '@/hooks';
import { NotificationList, BellIcon, TriangleIcon } from '@/components';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='relative p-2 text-gray-600 hover:text-gray-900 rounded-full'
      >
        <BellIcon className='cursor-pointer' />

        {isOpen && <TriangleIcon className='absolute -bottom-10 left-0' />}

        {unreadCount > 0 && (
          <div className='absolute top-[0.75rem] right-[0.75rem] inline-flex items-center justify-center px-1.5 py-0.5 leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full text-sm'>
            {unreadCount}
          </div>
        )}
      </button>

      <NotificationList isOpen={isOpen} />
    </div>
  );
};
