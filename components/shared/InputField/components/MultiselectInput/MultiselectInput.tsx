import { useState, useRef } from 'react';

import { FieldValues, Controller } from 'react-hook-form';
import { useClickAway } from 'react-use';

import { cn } from '@/helpers';

import { OptionType, PropsType } from './types';

const MultiselectInput = <FormValues extends FieldValues = FieldValues>({
  input,
  control,
  hasEnteredInput,
  isInvalid,
  isValid,
}: PropsType<FormValues>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => setIsOpen(false));

  return (
    <Controller
      name={input.name}
      control={control}
      rules={input.rules}
      render={({ field: { onChange, value } }) => {
        const selectedValues: number[] = value || [];

        const handleOptionClick = (optionValue: number) => {
          const newValues = selectedValues.includes(optionValue)
            ? selectedValues.filter((val: number) => val !== optionValue)
            : [...selectedValues, optionValue];

          onChange(newValues);
        };

        const handleRemoveOption = (optionValue: number) => {
          const newValues = selectedValues.filter(
            (val: number) => val !== optionValue,
          );

          onChange(newValues);
        };

        const getSelectedOptions = (): OptionType[] => {
          return (
            input.options?.filter((option: OptionType) =>
              selectedValues.includes(option.id),
            ) || []
          );
        };

        return (
          <div className='relative' ref={dropdownRef}>
            <div
              className={cn(
                'min-h-12 border rounded-md p-3 cursor-pointer transition-colors flex flex-wrap gap-2 items-center',
                {
                  'border-gray-500': !hasEnteredInput,
                  'border-red-500': isInvalid,
                  'border-green-500': hasEnteredInput && isValid,
                },
              )}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {getSelectedOptions().length > 0 ? (
                getSelectedOptions().map((option: OptionType) => (
                  <div
                    key={option.id}
                    className='flex items-center gap-1 bg-gray-500 px-2 py-1 rounded text-sm'
                  >
                    <span>{option.name}</span>

                    <button
                      type='button'
                      className='ml-1 hover:bg-gray-400 hover:cursor-pointer rounded-full w-4 h-4 flex items-center justify-center text-xs'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveOption(option.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <span className='text-gray-500 text-xl'>{input.label}</span>
              )}
            </div>

            {isOpen && (
              <div className='absolute z-10 w-full mt-1 bg-obsidian border border-gray-500 rounded-md shadow-lg max-h-60 overflow-auto'>
                {input.options?.map((option: OptionType) => (
                  <div
                    key={option.id}
                    className={cn(
                      'px-3 py-2 cursor-pointer hover:opacity-80 flex items-center justify-between',
                      {
                        'bg-gray-900': selectedValues.includes(option.id),
                      },
                    )}
                    onClick={() => handleOptionClick(option.id)}
                  >
                    <span>{option.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default MultiselectInput;
