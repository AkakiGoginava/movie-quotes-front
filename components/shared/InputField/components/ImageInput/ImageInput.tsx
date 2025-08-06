import { useDropzone } from 'react-dropzone';
import { FieldValues, Controller } from 'react-hook-form';

import { ImageIcon } from '@/components';
import { cn } from '@/helpers';

import { PropsType } from './types';

const ImageInput = <FormValues extends FieldValues = FieldValues>({
  input,
  control,
  hasEnteredInput,
  isInvalid,
  isValid,
}: PropsType<FormValues>) => {
  return (
    <Controller
      name={input.name}
      control={control}
      rules={input.rules}
      render={({ field: { onChange, value } }) => {
        const selectedFile = value;

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
          },
          multiple: false,
          onDrop: (acceptedFiles) => {
            if (acceptedFiles[0]) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(acceptedFiles[0]);
              onChange(dataTransfer.files);
            }
          },
        });

        return (
          <div
            {...getRootProps()}
            className={cn(
              'border hover:bg-gray-800 rounded-md p-4 md:p-6 cursor-pointer transition-colors flex items-center gap-3',
              {
                'border-blue-500 bg-blue-500/10': isDragActive,
                'border-gray-500': !hasEnteredInput,
                'border-red-500': isInvalid,
                'border-green-500': hasEnteredInput && isValid,
              },
            )}
          >
            <input {...getInputProps()} />
            <div className='flex items-center gap-4 md:text-lg w-full'>
              {selectedFile && selectedFile.length > 0 ? (
                <div className='flex gap-4 w-full'>
                  <img
                    src={URL.createObjectURL(selectedFile[0])}
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
        );
      }}
    />
  );
};

export default ImageInput;
