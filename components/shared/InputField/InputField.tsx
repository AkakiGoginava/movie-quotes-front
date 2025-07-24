import { useState } from 'react';

import { FieldValues, get } from 'react-hook-form';

import { cn } from '@/helpers';
import { CrossedEyeIcon, EyeIcon, InvalidIcon, ValidIcon } from '@/components';

import { PropsType } from './types';

const InputField = <FormValues extends FieldValues>({
  input,
  errors,
  register,
  touchedFields,
  getValues,
  handleForgotPasswordClick,
  showError,
  className,
}: PropsType<FormValues>) => {
  const [show, setShow] = useState(false);

  const hasEnteredInput: boolean =
    get(touchedFields, input.name as string) && getValues(input.name);

  const isInvalid: boolean = !!errors[input.name];
  const isValid: boolean = !errors[input.name];

  return (
    <div
      className={cn('relative flex flex-col gap-1', {
        'flex-row-reverse gap-3 w-full justify-center items-center':
          input.type === 'checkbox',
      })}
      key={input.name}
    >
      {input.type === 'checkbox' && (
        <button
          type='button'
          className='link text-blue-500 hover:opacity-85'
          onClick={() => {
            handleForgotPasswordClick?.();
          }}
        >
          Forgot password?
        </button>
      )}

      <label className='text-white h-4.5 mr-auto mb-1' htmlFor={input.name}>
        {input.label}
      </label>

      <div className='relative'>
        <input
          id={input.name}
          type={
            input.type === 'password'
              ? show
                ? 'text'
                : 'password'
              : input.type
          }
          className={cn(
            'text-black bg-gray-300 outline-none rounded-sm border-2 w-89 h-9.5 pl-2 pr-13 focus:ring-2 ',
            {
              'border-transparent focus:ring-gray-500': !hasEnteredInput,
              'border-red-500 focus:ring-red-500': isInvalid,
              'border-green-500 focus:ring-green-500':
                hasEnteredInput && isValid,
              'w-4 h-4 p-0 focus:outline-0 focus:ring-0 rounded-md checked:bg-black hover:cursor-pointer border-white':
                input.type === 'checkbox',
            },
            className,
          )}
          placeholder={input.placeholder}
          {...register(input.name, input?.rules)}
        />

        <div
          className={cn(
            'absolute right-3 md:right-2 top-1/2 -translate-1/2 flex gap-1.5 text-gray-600',
            {
              hidden: input.type === 'checkbox',
            },
          )}
        >
          {isInvalid && <InvalidIcon />}
          {hasEnteredInput && isValid && <ValidIcon />}

          {input.type === 'password' && (
            <div
              className='hover:cursor-pointe'
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? (
                <EyeIcon className='min-h-5 min-w-5' />
              ) : (
                <CrossedEyeIcon className='min-h-5 min-w-5' />
              )}
            </div>
          )}
        </div>
      </div>

      <p
        className={cn('absolute -bottom-6 text-red-500 text-sm', {
          hidden: input.type === 'checkbox',
        })}
      >
        {showError && (errors?.[input.name] as { message?: string })?.message}
      </p>
    </div>
  );
};

export default InputField;
