import { FieldValues } from 'react-hook-form';

import { GoogleIcon } from '@/components';

import { PropsType } from './types';

const AuthFormLayout = <FormValues extends FieldValues>({
  title,
  subTitle,
  submitText,
  inputs,
  hasGoogleAuth = false,
  register,
  handleSubmit,
  onSubmit,
  errors,
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
        {inputs.map((input) => (
          <div className='relative flex flex-col gap-1' key={input.name}>
            <label className='text-white' htmlFor={input.name}>
              {input.label}
            </label>

            <input
              id={input.name}
              type={input.type}
              className='text-black bg-gray-300 outline-none rounded-sm w-90 h-9.5 px-2 focus:ring-4 focus:ring-gray-500'
              placeholder={input.placeholder}
              {...register(input.name, input?.rules)}
            />

            <p className='absolute -bottom-6 text-red-500 text-sm'>
              {(errors?.[input.name] as { message?: string })?.message}
            </p>
          </div>
        ))}

        <button type='submit' className='btn btn-primary w-full text-base mt-3'>
          {submitText}
        </button>

        {hasGoogleAuth && (
          <button type='button' className='btn btn-secondary text-base'>
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>
        )}

        {children}
      </main>

      <footer className='mt-8'></footer>
    </form>
  );
};

export default AuthFormLayout;
