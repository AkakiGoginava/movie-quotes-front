import { Button, Modal, SendCheckIcon } from '@/components';
import { useAuth } from '@/hooks';

import { PropsType } from './types';

const VerifyEmailNotification: React.FC<PropsType> = ({ open, setOpen }) => {
  const { user } = useAuth();

  return (
    <Modal
      className='hidden'
      buttonText=''
      open={open}
      setOpen={setOpen}
      hasExit={false}
    >
      <div className='flex flex-col gap-5 items-center justify-center w-90 md:w-93 pt-6 pb-18 mt-20 md:mt-0 bg-notification'>
        <SendCheckIcon />

        <p className='text-3xl font-medium'>Thank you!</p>

        <p className='text-center'>
          Please check your email and follow the instructions to activate your
          account.
        </p>

        <Button
          type='button'
          handleClick={() => {
            window.open(`https://${user?.email?.split('@')[1]}`, '_blank');
          }}
          variant='primary'
          className='w-71 md:w-full text-base'
        >
          Go to my email
        </Button>
      </div>
    </Modal>
  );
};

export default VerifyEmailNotification;
