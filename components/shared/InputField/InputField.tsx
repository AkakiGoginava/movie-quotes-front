import { FieldValues, get } from 'react-hook-form';

import { cn } from '@/helpers';
import { CrossedEyeIcon, EyeIcon, InvalidIcon, ValidIcon } from '@/components';

import { PropsType } from './types';
import { ImageInput, MultiselectInput } from './components';
import useInputField from './useInputField';

const InputField = <FormValues extends FieldValues>({
  input,
  errors,
  register,
  touchedFields,
  getValues,
  handleForgotPasswordClick,
  showError,
  className,
  type,
  control,
}: PropsType<FormValues>) => {
  const { show, setShow, hasEnteredInput, isInvalid, isValid, inputLanguage } =
    useInputField<FormValues>({
      input,
      errors,
      getValues,
      touchedFields,
      control,
    });

  const containerStyles = {
    base: 'relative flex flex-col gap-1',
    checkbox: 'flex-row-reverse gap-3 w-full justify-center items-center',
  };

  const movieInputContainerStyles = {
    base: 'flex gap-2 border rounded-md border-gray-500 py-0.5 px-3 items-center justify-center',
    checkbox: 'flex flex-row-reverse gap-3 items-center mr-auto',
    neutral: 'focus:ring-gray-500',
    invalid: 'border-red-500 focus:ring-red-500',
    valid: 'border-green-500 focus:ring-green-500',
  };

  const labelStyles = {
    base: 'text-white h-4.5 mr-auto mb-1 text-nowrap',
    movie: 'md:text-xl mr-0 mb-1.5 md:mb-2.5 text-gray-500',
    textarea: 'place-self-start mt-2',
  };

  const inputStyles = {
    base: 'outline-none rounded-sm border-2 focus:ring-2 pr-13',
    auth: 'text-black bg-gray-300 w-89 h-9.5 pl-2',
    movie: 'bg-transparent border-0 focus:ring-0 text-white md:text-xl w-full',
    textarea: 'min-h-10',
    checkbox:
      'w-4 h-4 p-0 focus:outline-0 focus:ring-0 rounded-md checked:bg-black hover:cursor-pointer border-white',
    neutral: 'border-transparent focus:ring-gray-500',
    invalid: 'border-red-500 focus:ring-red-500',
    valid: 'border-green-500 focus:ring-green-500',
  };

  const iconContainerStyles = {
    base: 'absolute right-3 md:right-2 top-1/2 -translate-y-1/2 flex gap-1.5 text-gray-600',
    textarea: 'top-6',
  };

  const errorStyles = {
    base: 'absolute -bottom-6 text-red-500 text-sm',
  };

  if (input.type === 'file' && control)
    return (
      <ImageInput
        input={input}
        control={control}
        hasEnteredInput={hasEnteredInput}
        isInvalid={isInvalid}
        isValid={isValid}
      />
    );

  if (input.type === 'multiselect' && control && input.options)
    return (
      <MultiselectInput
        input={input}
        control={control}
        hasEnteredInput={hasEnteredInput}
        isInvalid={isInvalid}
        isValid={isValid}
      />
    );

  return (
    <div
      className={cn(containerStyles.base, {
        [containerStyles.checkbox]: input.type === 'checkbox',
      })}
      key={input.name}
    >
      {input.type === 'checkbox' && (
        <button
          type='button'
          className={cn(
            'link text-blue-500 hover:opacity-85',
            input?.className,
          )}
          onClick={() => {
            handleForgotPasswordClick?.();
          }}
        >
          Forgot password?
        </button>
      )}

      <div
        className={cn({
          [movieInputContainerStyles.base]: type === 'movie',
          [movieInputContainerStyles.neutral]:
            !hasEnteredInput && type === 'movie',
          [movieInputContainerStyles.invalid]: isInvalid && type === 'movie',
          [movieInputContainerStyles.valid]:
            hasEnteredInput && isValid && type === 'movie',
          [movieInputContainerStyles.checkbox]: input.type === 'checkbox',
        })}
      >
        {input?.label && (
          <label
            className={cn(labelStyles.base, {
              [labelStyles.movie]: type === 'movie',
              [labelStyles.textarea]: input.type === 'textarea',
            })}
            htmlFor={input.name}
          >
            {input.label}
          </label>
        )}

        <div className='relative w-full overflow-visible'>
          {input.type === 'textarea' ? (
            <textarea
              id={input.name}
              className={cn(
                inputStyles.base,
                inputStyles.movie,
                inputStyles.textarea,
                className,
                input?.className,
              )}
              placeholder={input.placeholder}
              {...register(input.name, input?.rules)}
            />
          ) : (
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
                inputStyles.base,
                {
                  [inputStyles.auth]:
                    type !== 'movie' &&
                    !['checkbox', 'textarea'].includes(input.type),
                  [inputStyles.movie]: type === 'movie',
                  [inputStyles.checkbox]: input.type === 'checkbox',
                  [inputStyles.neutral]: !hasEnteredInput && type !== 'movie',
                  [inputStyles.invalid]: isInvalid && type !== 'movie',
                  [inputStyles.valid]:
                    hasEnteredInput && isValid && type !== 'movie',
                },
                className,
              )}
              placeholder={input.placeholder}
              {...register(input.name, input?.rules)}
            />
          )}

          <div
            className={cn(iconContainerStyles.base, {
              hidden: input.type === 'checkbox',
              [iconContainerStyles.textarea]: input.type === 'textarea',
            })}
          >
            {type === 'auth' && (
              <>
                {isInvalid && <InvalidIcon />}
                {hasEnteredInput && isValid && <ValidIcon />}
              </>
            )}

            {inputLanguage && (
              <span className='md:text-lg text-gray-500'>{inputLanguage}</span>
            )}

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
      </div>

      <p
        className={cn(errorStyles.base, {
          hidden: input.type === 'checkbox',
        })}
      >
        {showError && get(errors, `${input.name}.message`)}
      </p>
    </div>
  );
};

export default InputField;
