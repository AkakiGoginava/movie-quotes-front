import { useSearchParams } from 'next/navigation';

import { NotificationLayout, SendCheckIcon } from '@/components';
import { useAuth } from '@/hooks';

import { PropsType } from './types';
import { useTranslation } from 'react-i18next';

const EmailSentNotification: React.FC<PropsType> = ({
  open,
  setOpen,
  hasExit = false,
  title,
  text,
}) => {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const { t } = useTranslation();

  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<SendCheckIcon />}
      title={title}
      text={text}
      btnText={t('notifications.goToEmail')}
      hasExit={hasExit}
      hasBtn={true}
      handleClick={() => {
        window.open(
          `https://mail.google.com/mail/u/${email ?? user?.email}/#search/from:MovieQuotes`,
          '_blank',
        );
      }}
    >
      {hasExit && (
        <p
          className='text-gray-500 transition hover:opacity-80 hover:cursor-pointer'
          onClick={() => {
            setOpen(false);
          }}
        >
          {t('notifications.skipConfirmLater')}
        </p>
      )}
    </NotificationLayout>
  );
};

export default EmailSentNotification;
