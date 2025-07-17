import { Button, NotificationLayout, WarningIcon } from '@/components';

import { PropsType } from './types';
import { useInvalidTokenNotification } from './useInvalidTokenNotification';

const InvalidTokenNotification: React.FC<PropsType> = ({
  open,
  setOpen,
  setVerifyEmailNotificationOpen,
}) => {
  const { handleRequestEmail, isLoading } = useInvalidTokenNotification(
    setOpen,
    setVerifyEmailNotificationOpen,
  );

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<WarningIcon />}
      title='Link expired!'
      text="Login link expired, because you haven't used it."
      hasExit={false}
      hasBtn={false}
    >
      <Button
        type='submit'
        variant='primary'
        className='w-full text-base'
        handleClick={() => handleRequestEmail()}
        disabled={isLoading}
      >
        Request another link
      </Button>
    </NotificationLayout>
  );
};

export default InvalidTokenNotification;
