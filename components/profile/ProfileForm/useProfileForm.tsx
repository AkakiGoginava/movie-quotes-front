import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useForm, useWatch } from 'react-hook-form';

import { useAuth } from '@/hooks';
import { InputFieldType, ProfileEditInput } from '@/types';

const useProfileForm = () => {
  const { t } = useTranslation();
  const { isLoading, user, isGoogleUser, handleEditUserFactory } = useAuth();

  const router = useRouter();

  const [editingAvatar, setEditingAvatar] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const {
    register,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    handleSubmit,
    setValue,
    control,
  } = useForm<ProfileEditInput>({
    mode: 'onChange',
    shouldUnregister: true,
    criteriaMode: 'all',
  });

  const watchedImage = useWatch({
    control,
    name: 'image',
  });

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

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.password) {
      formData.append('password', data.password);
    }
    if (data.password_confirmation) {
      formData.append('password_confirmation', data.password_confirmation);
    }

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    await handleEditUser(formData);
  });

  const userInfo = {
    username: {
      label: t('profileForm.usernameLabel'),
      value: user?.name,
      type: 'text',
    },
    email: {
      label: t('profileForm.emailLabel'),
      value: user?.email,
      type: 'text',
    },
    password: {
      label: t('profileForm.passwordLabel'),
      value: 'placeholderpassword',
      type: 'password',
    },
  };

  const editUsernameInput: InputFieldType<ProfileEditInput>[] = [
    {
      label: t('profileForm.nameLabel'),
      name: 'name',
      type: 'text',
      placeholder: t('profileForm.namePlaceholder'),
      rules: {
        required: { value: true, message: t('profileForm.nameRequired') },
        minLength: { value: 3, message: t('profileForm.nameMinLength') },
        maxLength: { value: 15, message: t('profileForm.nameMaxLength') },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: t('profileForm.namePattern'),
        },
      },
    },
  ];

  const editPasswordInput: InputFieldType<ProfileEditInput>[] = [
    {
      label: t('profileForm.passwordLabel'),
      name: 'password',
      type: 'password',
      placeholder: t('profileForm.passwordPlaceholder'),
      rules: {
        required: { value: true, message: t('profileForm.passwordRequired') },
        minLength: { value: 8, message: t('profileForm.passwordMinLength') },
        maxLength: { value: 15, message: t('profileForm.passwordMaxLength') },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: t('profileForm.passwordPattern'),
        },
      },
    },
    {
      label: t('profileForm.confirmPasswordLabel'),
      name: 'password_confirmation',
      type: 'password',
      placeholder: t('profileForm.confirmPasswordPlaceholder'),
      rules: {
        required: {
          value: true,
          message: t('profileForm.confirmPasswordRequired'),
        },
        validate: (value) =>
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
    router,
  };
};

export default useProfileForm;
