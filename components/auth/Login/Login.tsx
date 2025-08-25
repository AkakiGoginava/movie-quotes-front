import React from 'react';

import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();
  return (
    <Modal
      hasButton
      buttonClassName='text-sm h-8'
      buttonVariant='secondary'
      buttonText={t('login.buttonText')}
      open={loginOpen}
      setOpen={setLoginOpen}
      reset={reset}
    >
      <AuthForm
        title={t('login.title')}
        subTitle={t('login.subTitle')}
        inputs={inputs}
        submitText={t('login.submitText')}
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
          {t('login.noAccount')}{' '}
          <button
            type='button'
            className='text-blue-500 underline hover:opacity-80 hover:cursor-pointer'
            onClick={() => {
              setLoginOpen(false);
              setRegisterOpen(true);
            }}
          >
            {t('login.signUp')}
          </button>
        </p>
      </AuthForm>
    </Modal>
  );
};

export default Login;
