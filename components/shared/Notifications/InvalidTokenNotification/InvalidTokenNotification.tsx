import { NotificationLayout, WarningIcon } from '@/components';

import { PropsType } from './types';
import { useInvalidTokenNotification } from './useInvalidTokenNotification';

const InvalidTokenNotification: React.FC<PropsType> = ({ open, setOpen }) => {
  const { requestEmail } = useInvalidTokenNotification();

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<WarningIcon />}
      title='Link expired!'
      text="Login link expired, because you haven't used it."
      btnText='Request another link'
      hasExit={false}
      handleClick={requestEmail}
    />
  );
};

export default InvalidTokenNotification;
