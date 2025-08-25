import React from 'react';

import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <Modal
      hasButton
      buttonClassName='text-sm h-8'
      buttonVariant='primary'
      buttonText={t('register.buttonText')}
      open={registerOpen}
      setOpen={setRegisterOpen}
      reset={reset}
    >
      <AuthForm
        title={t('register.title')}
        subTitle={t('register.subTitle')}
        inputs={inputs}
        submitText={t('register.submitText')}
        hasGoogleSignUp
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errors={errors}
        touchedFields={touchedFields}
        getValues={getValues}
      >
        <p className='text-gray-500 text-center mt-8'>
          {t('register.alreadyAccount')}{' '}
          <button
            type='button'
            className='link text-blue-500 underline hover:opacity-80 hover:cursor-pointer'
            onClick={() => {
              setRegisterOpen(false);
              setLoginOpen(true);
            }}
          >
            {t('register.login')}
          </button>
        </p>
      </AuthForm>
    </Modal>
  );
};

export default Register;
