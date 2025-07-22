import { InfoField, InputField } from '@/components';
import { useAuth } from '@/hooks';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { isLoading, user, isGoogleUser } = useAuth();

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  const userInfo = {
    username: {
      label: 'Username',
      value: user?.name,
      type: 'text',
    },
    email: {
      label: 'Email',
      value: user?.email,
      type: 'text',
    },
    password: {
      label: 'Password',
      value: 'placeholderpassword',
      type: 'password',
    },
  };

  const editUsernameInput = [
    {
      label: 'Username',
      name: 'name',
      type: 'text',
      placeholder: 'At least 3 & max.15 lower case characters',
      rules: {
        required: { value: true, message: 'Please enter new name' },
        minLength: { value: 3, message: 'Minimum length is 3' },
        maxLength: { value: 15, message: 'Maximum length is 15' },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: 'Only lowercase letters and numbers allowed',
        },
      },
    },
  ];

  const editPasswordInput = [
    {
      label: 'New password',
      name: 'password',
      type: 'password',
      placeholder: 'New password',
      rules: {
        required: { value: true, message: 'Please enter new password' },
        minLength: { value: 8, message: 'Minimum length is 8' },
        maxLength: { value: 15, message: 'Maximum length is 15' },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: 'Only lowercase letters and numbers allowed',
        },
      },
    },
    {
      label: 'Confirm new password',
      name: 'password_confirmation',
      type: 'password',
      placeholder: 'Confirm new password',
      rules: {
        required: { value: true, message: 'Please confirm your password' },
        validate: (value) =>
          value === getValues('password') || 'Passwords do not match',
      },
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='py-8 h-screen bg-primary'>
      <section>
        <h1 className='text-2xl font-medium ml-10 mb-20'>My profile</h1>

        <div className='relative ml-42 px-66 pt-66 pb-30 bg-slate-950 rounded-xl inline-flex'>
          <div className='absolute top-0 -translate-y-1/3 left-1/2 -translate-x-1/2 flex flex-col gap-2'>
            <img
              src='https://placehold.co/188'
              alt='avatar'
              className='rounded-full'
            />
            <p className='text-xl text-center'>Upload new photo</p>
          </div>

          <div className='flex flex-col gap-10'>
            <InfoField info={userInfo.username} editable />

            <InfoField info={userInfo.email} />

            {!isGoogleUser && <InfoField info={userInfo.password} editable />}
          </div>
        </div>
      </section>
    </div>
  );
}
