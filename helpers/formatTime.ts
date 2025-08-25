import i18n from '@/src/i18n';

export function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return i18n.t('formatTime.justNow');
  if (diffInMinutes < 60)
    return i18n.t('formatTime.minAgo', { count: diffInMinutes });

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return i18n.t('formatTime.hourAgo', { count: diffInHours });

  const diffInDays = Math.floor(diffInHours / 24);
  return i18n.t('formatTime.dayAgo', { count: diffInDays });
}
