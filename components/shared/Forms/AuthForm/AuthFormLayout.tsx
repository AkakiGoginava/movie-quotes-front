import { GoogleIcon } from '@/components';
import { PropsType } from './types';

const AuthFormLayout: React.FC<PropsType> = ({
  title,
  subTitle,
  submitText,
  inputs,
  hasGoogleAuth = false,
  children,
}) => {
  return (
    <form className='flex flex-col gap-6' noValidate>
      <header className='flex flex-col gap-3'>
        <h1 className='text-center font-medium text-2xl md:text-3xl text-white'>
          {title}
        </h1>
        <h3 className='text-center text-gray-600'>{subTitle}</h3>
      </header>

      <main className='flex flex-col gap-7'>
        {inputs.map((input) => (
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor='name'>
              {input.label}
            </label>

            <input
              type={input.type}
              className='text-black bg-gray-300 outline-none rounded-sm w-90 h-9.5 px-2 focus:ring-4 focus:ring-gray-500'
              placeholder={input.placeholder}
              name={input.name}
            />
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
