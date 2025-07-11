import { FieldValues } from 'react-hook-form';

import { Button, GoogleIcon } from '@/components';

import { PropsType } from './types';
import { InputField } from './components';

const AuthForm = <FormValues extends FieldValues>({
  title,
  subTitle,
  submitText,
  inputs,
  hasGoogleAuth: hasGoogleSignUp = false,
  register,
  handleSubmit,
  onSubmit,
  errors,
  touchedFields,
  getValues,
  children,
}: PropsType<FormValues>) => {
  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <header className='flex flex-col gap-3'>
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
          />
        ))}

        <Button
          type='submit'
          variant='primary'
          handleClick={() => {}}
          className='w-full text-base'
        >
          {submitText}
        </Button>

        <Button
          type='button'
          variant='secondary'
          handleClick={() => {}}
          className='text-base'
        >
          <GoogleIcon />
          <span>Sign {hasGoogleSignUp ? 'up' : 'in'} with Google</span>
        </Button>

        {children}
      </main>

      <footer className='mt-8'></footer>
    </form>
  );
};

export default AuthForm;
