import { FieldValues } from 'react-hook-form';

import { InputField } from '@/components';

import { PropsType } from './types';
import { cn } from '@/helpers';

const InfoField = <FormValues extends FieldValues = FieldValues>({
  name,
  info,
  editable,
  editing,
  setEditing,
  editInputs,
  register,
  getValues,
  errors,
  touchedFields,
}: PropsType<FormValues>) => {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label>{info.label}</label>

        <div className='flex gap-4 items-center'>
          <input
            type={info.type}
            className='w-132 rounded-md text-black text-xl'
            value={info.value}
            disabled
          />

          {editable && (
            <button
              type='button'
              className='btn btn-ghost font-normal text-xl'
              onClick={() => {
                setEditing((prev) => !prev);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {editing && (
        <div className='w-132 flex flex-col gap-6 mt-8'>
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
                        <span className={textClassName}>
                          {ruleConfig.message}
                        </span>
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
              className='w-full bg-white text-xl rounded-md text-black py-5'
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoField;
