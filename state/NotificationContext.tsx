import React, { createContext } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { configureEcho, useEchoPublic } from '@laravel/echo-react';

import { useAuth, useSimpleMutation } from '@/hooks';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '@/services';

import { NotificationContextType } from './types';

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  configureEcho({
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

  useEchoPublic('quotes', ['QuoteLiked', 'QuoteCommented'], () => {
    console.log('broadcast');
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  });

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
