import { Button, Modal } from '@/components';

import { PropsType } from './types';

const NotificationLayout: React.FC<PropsType> = ({
  open,
  setOpen,
  icon,
  title,
  text,
  btnText,
  hasExit = true,
  hasBtn,
  handleClick,
  children,
}) => {
  return (
    <Modal
      className='hidden'
      buttonText=''
      open={open}
      setOpen={setOpen}
      hasExit={hasExit}
    >
      <div className='flex flex-col gap-5 items-center justify-center w-90 md:w-93 pt-6 pb-18 mt-20 md:mt-0 bg-notification'>
        {icon}

        <p className='text-3xl font-medium'>{title}</p>

        <p className='text-center'>{text}</p>

        {hasBtn && (
          <Button
            type='button'
            handleClick={handleClick}
            variant='primary'
            className='w-71 md:w-full text-base'
          >
            {btnText}
          </Button>
        )}

        {children}
      </div>
    </Modal>
  );
};

export default NotificationLayout;
