import { useSearchParams } from 'next/navigation';

import { NotificationLayout, SendCheckIcon } from '@/components';
import { useAuth } from '@/hooks';

import { PropsType } from './types';

const VerifyEmailNotification: React.FC<PropsType> = ({ open, setOpen }) => {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const action = searchParams.get('action');

  if (isLoading) return <div>Loading...</div>;

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<SendCheckIcon />}
      title='Thank you!'
      text='Please check your email and follow the instructions to finish the operation.'
      btnText='Go to my email'
      hasExit={action != 'verify'}
      hasBtn={true}
      handleClick={() => {
        window.open(
          `https://mail.google.com/mail/u/${email ?? user?.email}/#search/from:movie@quotes.com`,
          '_blank',
        );
      }}
    />
  );
};

export default VerifyEmailNotification;
