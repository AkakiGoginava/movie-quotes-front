import { FieldValues } from 'react-hook-form';

import { cn } from '@/helpers';

import { PropsType } from './types';

const InputField = <FormValues extends FieldValues>({
  input,
  errors,
  register,
}: PropsType<FormValues>) => {
  return (
    <div
      className={cn('relative flex flex-col gap-1', {
        'flex-row-reverse gap-3 w-full items-center': input.type === 'checkbox',
      })}
      key={input.name}
    >
      {input.type === 'checkbox' && (
        <button type='button' className='link text-blue-500 hover:opacity-85'>
          Forgot password?
        </button>
      )}

      <label className='text-white h-4.5 mr-auto' htmlFor={input.name}>
        {input.label}
      </label>

      <input
        id={input.name}
        type={input.type}
        className={cn(
          'text-black bg-gray-300 outline-none rounded-sm w-90 h-9.5 px-2 focus:ring-4 focus:ring-gray-500',
          {
            'w-4 h-4.5 focus:outline-0 focus:ring-0 rounded-md checked:bg-black hover:cursor-pointer':
              input.type === 'checkbox',
          },
        )}
        placeholder={input.placeholder}
        {...register(input.name, input?.rules)}
      />

      <p className='absolute -bottom-6 text-red-500 text-sm'>
        {(errors?.[input.name] as { message?: string })?.message}
      </p>
    </div>
  );
};

export default InputField;
