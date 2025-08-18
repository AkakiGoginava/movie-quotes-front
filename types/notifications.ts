export type AppNotification = {
  id: number;
  user_id: number;
  from_user_id: number;
  type: 'like' | 'comment';
  notifiable_type: string;
  notifiable_id: number;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  from_user: {
    id: number;
    name: string;
    avatar_url: string;
  };
};

export type NotificationResponse = {
  data: AppNotification[];
  total_unread: number;
};

export type UnreadCountResponse = {
  unread_count: number;
};
