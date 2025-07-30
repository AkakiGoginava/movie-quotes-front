import { FieldValues, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import { Button, ImageIcon, InputField } from '@/components';
import { useAuth } from '@/hooks';

import { PropsType } from './types';

const MovieForm = <FormValues extends FieldValues = FieldValues>({
  title,
  inputs,
  register,
  onSubmit,
  getValues,
  errors,
  touchedFields,
  submitText,
  isSubmitting,
  setValue,
  control,
}: PropsType<FormValues>) => {
  const { user } = useAuth();

  const selectedFile = useWatch({
    control,
    name: 'image',
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0] && setValue) {
        setValue('image', acceptedFiles[0], {
          shouldValidate: true,
        });
      }
    },
  });

  return (
    <div className='flex flex-col gap-8 md:min-w-225 pb-6'>
      <h1 className='text-xl md:text-2xl font-medium pt-8 pb-6 text-center border-b border-gray-700'>
        {title}
      </h1>

      <div className='flex gap-6 px-8'>
        <img
          src={user?.avatar_url}
          alt='avatar'
          className='size-15 object-contain bg-gray-300 rounded-full'
        />

        <p className='flex text-2xl items-center '>{user?.name}</p>
      </div>

      <form className='flex flex-col gap-8 px-8' onSubmit={onSubmit}>
        {inputs.map((input, idx) => (
          <InputField
            key={idx}
            type='movie'
            input={input}
            errors={errors}
            register={register}
            touchedFields={touchedFields}
            getValues={getValues}
            className='w-full'
          />
        ))}

        <div
          {...getRootProps()}
          className={`border rounded-md p-4 md:p-6 cursor-pointer transition-colors flex items-center gap-3 ${
            isDragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-gray-500 hover:bg-gray-800'
          }`}
        >
          <input id='image' {...getInputProps()} {...register('image')} />
          <div className='flex items-center gap-4 md:text-lg w-full'>
            {selectedFile ? (
              <div className='flex gap-4 w-full'>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt='selected image'
                  className='max-w-50 md:max-w-100 object-cover'
                />

                <div className='flex flex-col gap-5 items-center justify-center w-full md:ml-auto'>
                  <p className='text-xs md:text-base font-bold text-light-yellow'>
                    REPLACE PHOTO
                  </p>

                  <div className='hidden md:flex gap-2'>
                    <ImageIcon />
                    <p className='hidden md:inline-block text-xl'>
                      Drag & drop your image here or
                    </p>
                  </div>

                  <div className='text-sm md:text-lg bg-purple-900 p-2'>
                    Choose file
                  </div>
                </div>
              </div>
            ) : (
              <>
                <ImageIcon />
                <p className='hidden md:inline-block'>
                  Drag & drop your image here or
                </p>

                <p className='md:hidden'>Upload image</p>

                <div className='bg-purple-900 p-2 ml-auto md:ml-0'>
                  Choose file
                </div>
              </>
            )}
          </div>
        </div>

        <Button
          type='submit'
          variant='primary'
          className='text-xl'
          disabled={isSubmitting}
        >
          {submitText}
        </Button>
      </form>
    </div>
  );
};

export default MovieForm;
