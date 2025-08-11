import { FieldValues } from 'react-hook-form';

import { Button, InputField } from '@/components';
import { useAuth } from '@/hooks';
import { Category } from '@/types';

import { PropsType } from './types';

const QuoteForm = <FormValues extends FieldValues = FieldValues>({
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
  movie,
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
          className='size-10 md:size-15 object-contain bg-gray-300 rounded-full'
        />

        <p className='flex text-xl items-center '>{user?.name}</p>
      </div>

      {movie && (
        <div className='flex gap-7.5 px-8'>
          <img
            src={movie.poster_url}
            alt='movie poster'
            className='max-w-40 md:max-w-75 max-h-20 md:max-h-40 object-cover rounded-xl'
          />

          <div className='flex flex-col md:gap-7.5'>
            <h1 className='md:text-2xl font-medium text-light-yellow'>
              {movie.title.en} ({movie.year})
            </h1>

            <div className='flex flex-col-reverse md:flex-col md:gap-7.5'>
              <div className='flex gap-2 flex-wrap'>
                {movie.categories.map((category: Category) => (
                  <div
                    key={category.id}
                    className='font-bold text-sm md:text-lg bg-gray-600 py-1 px-2 md:px-3 rounded-lg'
                  >
                    {category.name}
                  </div>
                ))}
              </div>

              <h2 className='md:text-lg font-bold mb-2'>
                Director: {movie.director.en}
              </h2>
            </div>
          </div>
        </div>
      )}

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

export default QuoteForm;
