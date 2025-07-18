import React from 'react';

import { AuthForm, Modal, ReturnArrowIcon } from '@/components';

import { PropsType } from './types';
import { useForgotPassword } from './useForgotPassword';

const ForgotPassword: React.FC<PropsType> = ({
  forgotPasswordOpen,
  setForgotPasswordOpen,
  setLoginOpen,
  setPasswordResetNotificationOpen,
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
  } = useForgotPassword(
    setForgotPasswordOpen,
    setPasswordResetNotificationOpen,
  );

  return (
    <Modal
      className='hidden'
      buttonText=''
      open={forgotPasswordOpen}
      setOpen={setForgotPasswordOpen}
      reset={reset}
    >
      <AuthForm
        title='Forgot password?'
        subTitle="Enter the email and we'll send an email with instructions to reset your password"
        inputs={inputs}
        submitText='Send Instructions'
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
            setForgotPasswordOpen(false);
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

export default ForgotPassword;
