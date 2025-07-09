'use client';

import React from 'react';

import { AuthFormLayout, Modal } from '@/components';
import { useLogin } from './useLogin';

const Login = () => {
  const { register, handleSubmit, onSubmit, errors, inputs } = useLogin();

  return (
    <Modal
      className='btn btn-secondary text-sm h-8'
      buttonText='Log in'
      id='login-modal'
    >
      <AuthFormLayout
        title='Log in to your account'
        subTitle='Welcome back! Please enter your details.'
        inputs={inputs}
        submitText='Sign in'
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      >
        <p className='text-gray-500 text-center mt-8'>
          Don't have an account?{' '}
          <button
            type='button'
            className='text-blue-500 underline hover:opacity-80 hover:cursor-pointer'
            onClick={() => {
              (
                document.getElementById('login-modal') as HTMLDialogElement
              )?.close();
              (
                document.getElementById('register-modal') as HTMLDialogElement
              )?.showModal();
            }}
          >
            Sign up
          </button>
        </p>
      </AuthFormLayout>
    </Modal>
  );
};

export default Login;
