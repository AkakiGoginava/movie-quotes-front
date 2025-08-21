import { useTranslation } from 'react-i18next';

import { Button, NotificationLayout, WarningIcon } from '@/components';

import { PropsType } from './types';
import { useInvalidTokenNotification } from './useInvalidTokenNotification';

const InvalidTokenNotification: React.FC<PropsType> = ({
  open,
  setOpen,
  setVerifyEmailNotificationOpen,
}) => {
  const { handleRequestNewLink, isLoading, action } =
    useInvalidTokenNotification(setOpen, setVerifyEmailNotificationOpen);

  const { t } = useTranslation();

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<WarningIcon />}
      title={t('notifications.invalidTokenTitle')}
      text={t('notifications.invalidTokenText')}
      hasExit={action != 'verify'}
      hasBtn={false}
    >
      <Button
        type='submit'
        variant='primary'
        className='w-full text-base'
        handleClick={() => handleRequestNewLink()}
        disabled={isLoading}
      >
        {t('notifications.requestAnotherLink')}
      </Button>
    </NotificationLayout>
  );
};

export default InvalidTokenNotification;
