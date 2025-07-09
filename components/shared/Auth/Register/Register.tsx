'use client';

import React from 'react';

import { Modal, AuthFormLayout } from '@/components';

import { useRegister } from './useRegister';

const Register = () => {
  const { register, handleSubmit, onSubmit, errors, inputs } = useRegister();

  return (
    <Modal
      className='btn btn-primary text-sm h-8'
      buttonText='Sign up'
      id='register-modal'
    >
      <AuthFormLayout
        title='Create an account'
        subTitle='Start your journey!'
        inputs={inputs}
        submitText='Get started'
        hasGoogleAuth
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      >
        <p className='text-gray-500 text-center mt-8'>
          Already have an account?{' '}
          <button
            type='button'
            className='link text-blue-500 underline hover:opacity-80 hover:cursor-pointer'
            onClick={() => {
              (
                document.getElementById('login-modal') as HTMLDialogElement
              )?.showModal();
              (
                document.getElementById('register-modal') as HTMLDialogElement
              )?.close();
            }}
          >
            Log in
          </button>
        </p>
      </AuthFormLayout>
    </Modal>
  );
};

export default Register;
