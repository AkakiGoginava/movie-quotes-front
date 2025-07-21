import React from 'react';

import { AuthForm, Modal, ReturnArrowIcon } from '@/components';

import { PropsType } from './types';
import { useResetPassword } from './useResetPassword';

const ResetPassword: React.FC<PropsType> = ({
  open,
  setOpen,
  setLoginOpen,
  setResetSuccessNotificationOpen,
  setInvalidTokenNotificationOpen,
}) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    touchedFields,
    getValues,
    reset,
    inputs,
  } = useResetPassword(
    setOpen,
    setResetSuccessNotificationOpen,
    setInvalidTokenNotificationOpen,
  );

  return (
    <Modal
      className='hidden'
      buttonText=''
      open={open}
      setOpen={setOpen}
      reset={reset}
    >
      <AuthForm
        title='Create new password'
        subTitle='Your new password must be different from previous used passwords'
        inputs={inputs}
        submitText='Reset password'
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errors={errors}
        touchedFields={touchedFields}
        getValues={getValues}
      >
        <button
          type='button'
          className='text-gray-500 hover:opacity-80 hover:cursor-pointer flex items-center justify-center gap-2'
          onClick={() => {
            setOpen(false);
            setLoginOpen(true);
          }}
        >
          <ReturnArrowIcon />
          <p>Back to log in</p>
        </button>
      </AuthForm>
    </Modal>
  );
};

export default ResetPassword;
