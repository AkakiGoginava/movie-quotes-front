import { Button, InfoField } from '@/components';

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
    editingPassword,
    setEditingPassword,
    editingUsername,
    setEditingUsername,
  } = useProfileForm();

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={onSubmit} className='inline-block'>
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
          <InfoField<ProfileEditInput>
            name='Username'
            info={userInfo.username}
            editable
            editing={editingUsername}
            setEditing={setEditingUsername}
            editInputs={
              editUsernameInput as unknown as InputFieldType<ProfileEditInput>[]
            }
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
              editInputs={
                editPasswordInput as unknown as InputFieldType<ProfileEditInput>[]
              }
              register={register}
              getValues={getValues}
              touchedFields={touchedFields}
              errors={errors}
            />
          )}
        </div>
      </div>

      {(editingUsername || editingPassword) && (
        <div className='flex gap-2 mt-20'>
          <Button
            type='button'
            className='btn-ghost ml-auto text-xl bg-transparent h-12'
            handleClick={() => {
              setEditingUsername(false);
              setEditingPassword(false);
            }}
          >
            Cancel
          </Button>

          <Button type='submit' variant='primary' className='text-xl h-12'>
            Save changes
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
