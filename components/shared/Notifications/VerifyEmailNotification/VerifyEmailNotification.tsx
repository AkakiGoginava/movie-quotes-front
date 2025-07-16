import { NotificationLayout, SendCheckIcon } from '@/components';
import { useAuth } from '@/hooks';

import { PropsType } from './types';

const VerifyEmailNotification: React.FC<PropsType> = ({ open, setOpen }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<SendCheckIcon />}
      title='Thank you!'
      text='Please check your email and follow the instructions to activate your account.'
      btnText='Go to my email'
      handleClick={() => {
        window.open(`https://${user?.email?.split('@')[1]}`, '_blank');
      }}
    />
  );
};

export default VerifyEmailNotification;
