import {
  Button,
  CheckIcon,
  CrossIcon,
  InfoField,
  ReturnArrowIcon,
} from '@/components';
import { InputFieldType, ProfileEditInput } from '@/types';

import useProfileForm from './useProfileForm';

const ProfileForm = () => {
  const {
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
  } = useProfileForm();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='md:py-8'>
      <form onSubmit={onSubmit}>
        <h1 className='text-2xl font-medium ml-40 mb-30 hidden md:block'>
          My profile
        </h1>

        <ReturnArrowIcon className='my-4 ml-6 md:hidden' />

        <div className='md:w-fit'>
          <div className='relative md:ml-30 px-8 md:px-48 pt-6 md:pt-66 pb-16 md:pb-30 bg-obsidian md:bg-slate-950 rounded-xl inline-flex flex-col gap-15 md:gap-0 w-full md:w-auto h-full max-w-249'>
            <div className='md:absolute md:top-0 md:-translate-y-1/3 md:left-1/2 md:-translate-x-1/2 flex flex-col gap-2 items-center'>
              <div className='relative'>
                <img
                  src={selectedImage || user?.avatar_url}
                  alt='avatar'
                  className='rounded-full size-47 object-top object-cover md:object-contain bg-gray-300'
                />

                {editingAvatar && (
                  <button
                    type='button'
                    className='absolute right-3.5 bottom-3.5 w-6 h-6 rounded-full bg-white text-black text-sm flex items-center justify-center shadow-md hover:bg-gray-300 hover:cursor-pointer transition'
                    onClick={handleImageClear}
                  >
                    x
                  </button>
                )}
              </div>

              <input
                {...register('image')}
                type='file'
                id='image'
                className='hidden'
                accept='image/*'
              />
              <label
                htmlFor='image'
                className='text-xl text-center hover:text-gray-300 cursor-pointer transition'
              >
                Upload new photo
              </label>
            </div>

            <div className='flex flex-col gap-10 w-full md:w-auto'>
              <InfoField<ProfileEditInput>
                name='Username'
                info={userInfo.username}
                editable
                editing={editingUsername}
                setEditing={setEditingUsername}
                editInputs={editUsernameInput}
                register={register}
                getValues={getValues}
                touchedFields={touchedFields}
                errors={errors}
              />

              <InfoField name='Email' info={userInfo.email} />

              {!isGoogleUser && (
                <InfoField<ProfileEditInput>
                  name='Password'
                  info={userInfo.password}
                  editable
                  editing={editingPassword}
                  setEditing={setEditingPassword}
                  editInputs={editPasswordInput}
                  register={register}
                  getValues={getValues}
                  touchedFields={touchedFields}
                  errors={errors}
                />
              )}
            </div>
          </div>

          {(editingAvatar || editingUsername || editingPassword) && (
            <div className='flex gap-2 md:mt-20 p-4 md:p-0 justify-between md:justify-end'>
              <Button
                type='button'
                className='btn-ghost text-xl bg-transparent h-12'
                handleClick={() => {
                  setEditingUsername(false);
                  setEditingPassword(false);
                  setEditingAvatar(false);
                  handleImageClear();
                }}
              >
                Cancel
              </Button>

              <Button
                type='submit'
                variant='primary'
                disabled={isSubmitting}
                className='text-xl h-12'
              >
                Save changes
              </Button>
            </div>
          )}
        </div>
      </form>

      <dialog className='modal modal-top mt-22' open={successModalOpen}>
        <div className='modal-box flex justify-between w-100 bg-green-100 text-green-900 p-4 mt-10 ml-4 rounded-md'>
          <div className='flex gap-2 items-center'>
            <CheckIcon />
            <p>Changes updated successfully</p>
          </div>

          <button
            onClick={() => {
              setSuccessModalOpen(false);
            }}
          >
            <CrossIcon />
          </button>
        </div>
      </dialog>

      <div></div>
    </div>
  );
};

export default ProfileForm;
