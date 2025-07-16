import { NotificationLayout, SuccessIcon } from '@/components';

import { PropsType } from './types';

const SuccessNotification: React.FC<PropsType> = ({
  open,
  setOpen,
  setLoginOpen,
}) => {
  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<SuccessIcon />}
      title='Success!'
      text='Email verified successfully.'
      btnText='Log in'
      handleClick={() => {
        setOpen(false);
        setLoginOpen(true);
      }}
    />
  );
};

export default SuccessNotification;
