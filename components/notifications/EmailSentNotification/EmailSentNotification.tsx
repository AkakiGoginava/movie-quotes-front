import { useSearchParams } from 'next/navigation';

import { NotificationLayout, SendCheckIcon } from '@/components';
import { useAuth } from '@/hooks';

import { PropsType } from './types';

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<SendCheckIcon />}
      title={title}
      text={text}
      btnText='Go to my email'
      hasExit={hasExit}
      hasBtn={true}
      handleClick={() => {
        window.open(
          `https://mail.google.com/mail/u/${email ?? user?.email}/#search/from:movie@quotes.com`,
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
          Skip, I'll confirm later
        </p>
      )}
    </NotificationLayout>
  );
};

export default EmailSentNotification;
