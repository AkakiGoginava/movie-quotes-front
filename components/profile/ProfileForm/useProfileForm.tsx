import { useAuth } from '@/hooks';
import { InputFieldType } from '@/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordEditInputType, UsernameEditInputType } from './types';

const useProfileForm = () => {
  const { isLoading, user, isGoogleUser } = useAuth();

  const [editingUsername, setEditingUsername] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

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

  const editUsernameInput: InputFieldType<UsernameEditInputType>[] = [
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

  const editPasswordInput: InputFieldType<PasswordEditInputType>[] = [
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
        validate: (value: string) =>
          value === getValues('password') || 'Passwords do not match',
      },
    },
  ];

  return {
    isLoading,
    user,
    isGoogleUser,
    register,
    errors,
    getValues,
    userInfo,
    editPasswordInput,
    editUsernameInput,
    editingPassword,
    setEditingPassword,
    editingUsername,
    setEditingUsername,
  };
};

export default useProfileForm;
