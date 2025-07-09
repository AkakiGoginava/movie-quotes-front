'use client';

import React from 'react';

import { Modal, AuthFormLayout } from '@/components';

import { useRegister } from './useRegister';

const Register = () => {
  const { inputs } = useRegister();

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
      />
    </Modal>
  );
};

export default Register;
