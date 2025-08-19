import { FieldValues, Controller } from 'react-hook-form';

import { CameraIcon, CaretIcon } from '@/components';
import { cn } from '@/helpers';
import { OptionType } from '@/types';

import { PropsType } from './types';

const SelectInput = <FormValues extends FieldValues = FieldValues>({
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
        const selectedValue = value || '';

        return (
          <div className='relative md:text-2xl'>
            <CameraIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10 size-6 md:size-8' />
            <CaretIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10 size-6' />
            <select
              className={cn(
                'select select-bordered w-full border-none bg-black rounded-md text-white text-base md:text-xl pl-14 md:pl-16 pr-12 h-21.5',
                {
                  'border-gray-500': !hasEnteredInput,
                  'border-red-500': isInvalid,
                  'border-green-500': hasEnteredInput && isValid,
                },
                input.className,
              )}
              value={selectedValue}
              onChange={(e) =>
                onChange(e.target.value ? Number(e.target.value) : '')
              }
            >
              <option disabled value='' className='bg-black text-white'>
                {input.label}
              </option>

              {input.options?.map((option: OptionType) => (
                <option
                  key={option.id}
                  value={option.id}
                  className='bg-black text-white'
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        );
      }}
    />
  );
};

export default SelectInput;
