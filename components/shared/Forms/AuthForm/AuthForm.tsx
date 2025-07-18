import { FieldValues } from 'react-hook-form';

import { Button, GoogleIcon } from '@/components';

import { PropsType } from './types';
import { InputField } from './components';

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
            input={input}
            errors={errors}
            register={register}
            touchedFields={touchedFields}
            getValues={getValues}
            handleForgotPasswordClick={handleForgotPasswordClick}
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
            handleClick={() => {}}
            className='text-base'
            disabled={isSubmitting}
          >
            <GoogleIcon />
            <span>Sign {hasGoogleSignIn ? 'in' : 'up'} with Google</span>
          </Button>
        )}

        {children}
      </main>

      <footer className='mt-8'></footer>
    </form>
  );
};

export default AuthForm;
