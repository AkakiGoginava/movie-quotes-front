import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks';
import {
  InputFieldType,
  PasswordEditInput,
  ProfileEditInput,
  UsernameEditInput,
} from '@/types';

const useProfileForm = () => {
  const { isLoading, user, isGoogleUser, handleEditUserFactory } = useAuth();

  const [editingAvatar, setEditingAvatar] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const {
    register,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    handleSubmit,
    watch,
    setValue,
  } = useForm<ProfileEditInput>({
    mode: 'onChange',
    shouldUnregister: true,
    criteriaMode: 'all',
  });

  const watchedImage = watch('image');

  const selectedImage = watchedImage?.[0]
    ? URL.createObjectURL(watchedImage[0])
    : null;

  const hasImage = !!(watchedImage && watchedImage.length > 0);

  useEffect(() => {
    setEditingAvatar(hasImage);
  }, [hasImage]);

  const handleImageClear = () => {
    setEditingAvatar(false);
    setValue('image', undefined);
  };

  const handleEditUser = handleEditUserFactory({
    onSuccess: () => {
      setEditingUsername(false);
      setEditingPassword(false);

      handleImageClear();

      setSuccessModalOpen(true);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' || !value) return;
      formData.append(key, value as string);
    });

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    handleEditUser(formData);
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

  const editUsernameInput: InputFieldType<UsernameEditInput>[] = [
    {
      label: 'New username',
      name: 'name',
      type: 'text',
      placeholder: 'Enter new username',
      rules: {
        required: { value: true, message: 'Required' },
        minLength: { value: 3, message: '3 or more characters' },
        maxLength: { value: 15, message: '15 or fewer characters' },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: 'Lowercase characters',
        },
      },
    },
  ];

  const editPasswordInput: InputFieldType<PasswordEditInput>[] = [
    {
      label: 'New password',
      name: 'password',
      type: 'password',
      placeholder: 'New password',
      rules: {
        required: { value: true, message: 'Required' },
        minLength: { value: 8, message: '8  or more characters' },
        maxLength: { value: 15, message: '15 or fewer characters' },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: 'Lowercase characters',
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
    onSubmit,
    getValues,
    errors,
    touchedFields,
    userInfo,
    editPasswordInput,
    editUsernameInput,
    editingAvatar,
    setEditingAvatar,
    editingPassword,
    setEditingPassword,
    editingUsername,
    setEditingUsername,
    selectedImage,
    handleImageClear,
    isSubmitting,
    successModalOpen,
    setSuccessModalOpen,
  };
};

export default useProfileForm;
