import { FieldValues } from 'react-hook-form';

import { Button, InputField } from '@/components';
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
  control,
}: PropsType<FormValues>) => {
  const { user } = useAuth();

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
            register={register}
            errors={errors}
            control={control}
            touchedFields={touchedFields}
            getValues={getValues}
            className='w-full'
          />
        ))}

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
