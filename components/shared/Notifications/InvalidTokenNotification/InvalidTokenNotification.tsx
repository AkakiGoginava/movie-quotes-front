import { NotificationLayout, WarningIcon } from '@/components';
import { useAuth } from '@/hooks';

import { PropsType } from './types';
import { useSearchParams } from 'next/navigation';

const InvalidTokenNotification: React.FC<PropsType> = ({ open, setOpen }) => {
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<WarningIcon />}
      title='Link expired!'
      text="Login link expired, because you haven't used it."
      btnText='Request another link'
      handleClick={() => {
        window.open(`https://${user?.email?.split('@')[1]}`, '_blank');
      }}
    />
  );
};

export default InvalidTokenNotification;
