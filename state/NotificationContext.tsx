import { createContext, useState, useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { useAuth, useSimpleMutation } from '@/hooks';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '@/services';

import { NotificationContextType } from './types';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [echo, setEcho] = useState<Echo<any> | null>(null);

  const {
    data: notificationData,
    isLoading: loading,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    enabled: !!user,
  });

  const notifications = notificationData?.data || [];
  const unreadCount = notificationData?.total_unread || 0;

  const markAsReadMutation = useSimpleMutation(markNotificationAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useSimpleMutation(markAllNotificationsAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  useEffect(() => {
    if (user && process.env.NEXT_PUBLIC_PUSHER_APP_KEY) {
      window.Pusher = Pusher;

      const echoInstance = new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
        auth: {
          headers: {
            Accept: 'application/json',
          },
        },
      });

      setEcho(echoInstance);

      echoInstance
        .private(`user.${user.id}`)
        .listen('QuoteLiked', () => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        })
        .listen('QuoteCommented', () => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        });

      return () => {
        echoInstance.disconnect();
      };
    }
  }, [user, queryClient]);

  const refreshNotifications = async () => {
    await refetchNotifications();
  };

  const markAsRead = async (id: number) => {
    await markAsReadMutation(id);
  };

  const markAllAsRead = async () => {
    await markAllAsReadMutation();
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
