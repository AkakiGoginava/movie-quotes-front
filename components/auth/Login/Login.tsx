import React from 'react';

import { AuthForm, Modal } from '@/components';

import { useLogin } from './useLogin';
import { PropsType } from './types';

const Login: React.FC<PropsType> = ({
  loginOpen,
  setLoginOpen,
  setRegisterOpen,
  handleForgotPasswordClick,
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
  } = useLogin();

  return (
    <Modal
      hasButton
      buttonClassName='text-sm h-8'
      buttonVariant='secondary'
      buttonText='Log in'
      open={loginOpen}
      setOpen={setLoginOpen}
      reset={reset}
    >
      <AuthForm
        title='Log in to your account'
        subTitle='Welcome back! Please enter your details.'
        inputs={inputs}
        submitText='Sign in'
        register={register}
        handleSubmit={handleSubmit}
        hasGoogleSignIn
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errors={errors}
        touchedFields={touchedFields}
        getValues={getValues}
        handleForgotPasswordClick={handleForgotPasswordClick}
      >
        <p className='text-gray-500 text-center mt-8'>
          Don't have an account?{' '}
          <button
            type='button'
            className='text-blue-500 underline hover:opacity-80 hover:cursor-pointer'
            onClick={() => {
              setLoginOpen(false);
              setRegisterOpen(true);
            }}
          >
            Sign up
          </button>
        </p>
      </AuthForm>
    </Modal>
  );
};

export default Login;
