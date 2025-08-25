import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, GoogleIcon, InputField } from '@/components';

import { PropsType } from './types';

const AuthForm = <FormValues extends FieldValues>({
  title,
  subTitle,
  submitText,
  inputs,
  hasGoogleSignUp,
  hasGoogleSignIn,
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  errors,
  touchedFields,
  getValues,
  handleForgotPasswordClick,
  children,
}: PropsType<FormValues>) => {
  const googleAuth = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = 'openid email profile';

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${googleClientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code&` +
      `scope=${scope}`;

    window.location.href = authUrl;
  };

  const { t } = useTranslation();

  return (
    <form
      className='flex flex-col gap-6 items-center'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <header className='flex flex-col gap-3 max-w-80'>
        <h1 className='text-center font-medium text-2xl md:text-3xl text-white'>
          {title}
        </h1>
        <h3 className='text-center text-gray-600'>{subTitle}</h3>
      </header>

      <main className='flex flex-col gap-7'>
        {inputs.map((input, idx) => (
          <InputField
            key={idx}
            type='auth'
            input={input}
            errors={errors}
            register={register}
            touchedFields={touchedFields}
            getValues={getValues}
            handleForgotPasswordClick={handleForgotPasswordClick}
            showError
          />
        ))}

        <Button
          type='submit'
          variant='primary'
          handleClick={() => {}}
          className='w-full text-base'
          disabled={isSubmitting}
        >
          {submitText}
        </Button>

        {(hasGoogleSignUp || hasGoogleSignIn) && (
          <Button
            type='button'
            variant='secondary'
            handleClick={() => {
              googleAuth();
            }}
            className='text-base'
            disabled={isSubmitting}
          >
            <GoogleIcon />
            <span>
              {hasGoogleSignIn
                ? t('authForm.googleSignIn')
                : t('authForm.googleSignUp')}
            </span>
          </Button>
        )}

        {children}
      </main>

      <footer className='mt-8'></footer>
    </form>
  );
};

export default AuthForm;
