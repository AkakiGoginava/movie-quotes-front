import React from 'react';

import { Modal, AuthForm } from '@/components';

import { useRegister } from './useRegister';
import { PropsType } from './types';

const Register: React.FC<PropsType> = ({
  registerOpen,
  setRegisterOpen,
  setLoginOpen,
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
  } = useRegister();

  return (
    <Modal
      className='text-sm h-8'
      buttonVariant='primary'
      buttonText='Sign up'
      open={registerOpen}
      setOpen={setRegisterOpen}
      id='register-modal'
      reset={reset}
    >
      <AuthForm
        title='Create an account'
        subTitle='Start your journey!'
        inputs={inputs}
        submitText='Get started'
        hasGoogleAuth
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errors={errors}
        touchedFields={touchedFields}
        getValues={getValues}
      >
        <p className='text-gray-500 text-center mt-8'>
          Already have an account?{' '}
          <button
            type='button'
            className='link text-blue-500 underline hover:opacity-80 hover:cursor-pointer'
            onClick={() => {
              setRegisterOpen(false);
              setLoginOpen(true);
            }}
          >
            Log in
          </button>
        </p>
      </AuthForm>
    </Modal>
  );
};

export default Register;
