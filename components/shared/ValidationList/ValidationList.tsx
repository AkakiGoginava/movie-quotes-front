import { FieldValues } from 'react-hook-form';

import { cn } from '@/helpers';
import { InputField } from '@/components';

import { PropsType } from './types';

const ValidationList = <FormValues extends FieldValues = FieldValues>({
  name,
  editInputs,
  getValues,
  errors,
  register,
  touchedFields,
}: PropsType<FormValues>) => {
  return (
    <div className='w-full md:w-132 flex flex-col gap-6 md:mt-8 bg-obsidian md:bg-transparent px-8 md:px-0 py-18 md:py-0 rounded-xl'>
      <div className='p-6 border border-gray-600 rounded-sm'>
        <p className='mb-4'>{name} should contain:</p>

        <ul className='text-sm'>
          {editInputs[0].rules &&
            Object.entries(editInputs[0].rules).map(
              ([ruleName, ruleConfig], idx) => {
                const fieldName = editInputs[0].name;

                const hasFieldValue = !!getValues(fieldName);
                const fieldError = errors[fieldName];

                const hasRuleError =
                  fieldError?.types &&
                  typeof fieldError.types === 'object' &&
                  ruleName in fieldError.types;

                const isValid = !hasRuleError && hasFieldValue;

                const bulletClassName = cn('text-gray-400 mr-2 mt-0.5', {
                  'text-green-500': isValid,
                });

                const textClassName = cn('text-gray-400', {
                  'text-white': isValid,
                });

                return (
                  <li key={idx}>
                    <span className={bulletClassName}>•</span>
                    <span className={textClassName}>{ruleConfig.message}</span>
                  </li>
                );
              },
            )}
        </ul>
      </div>

      {editInputs.map((input, idx) => (
        <InputField<FormValues>
          key={idx}
          input={input}
          errors={errors}
          register={register}
          touchedFields={touchedFields}
          getValues={getValues}
          className='w-full bg-white text-lg rounded-md text-black py-5'
        />
      ))}
    </div>
  );
};

export default ValidationList;
