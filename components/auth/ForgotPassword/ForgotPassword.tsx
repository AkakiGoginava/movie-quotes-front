import React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthForm, Modal, ReturnArrowIcon } from '@/components';

import { PropsType } from './types';
import { useForgotPassword } from './useForgotPassword';

const ForgotPassword: React.FC<PropsType> = ({
  open,
  setOpen,
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
  } = useForgotPassword(setOpen, setPasswordResetNotificationOpen);

  const { t } = useTranslation();

  return (
    <Modal open={open} setOpen={setOpen} reset={reset}>
      <AuthForm
        title={t('forgotPassword.title')}
        subTitle={t('forgotPassword.subTitle')}
        inputs={inputs}
        submitText={t('forgotPassword.submitText')}
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
          <p>{t('forgotPassword.backToLogin')}</p>
        </button>
      </AuthForm>
    </Modal>
  );
};

export default ForgotPassword;
