import { useState } from 'react';

import { FieldValues, get, useWatch } from 'react-hook-form';

import { UseInputFieldProps } from './types';

const useInputField = <FormValues extends FieldValues = FieldValues>({
  input,
  errors,
  touchedFields,
  getValues,
  control,
}: UseInputFieldProps<FormValues>) => {
  const [show, setShow] = useState(false);

  const watchedValue = control
    ? useWatch({
        control,
        name: input.name,
      })
    : undefined;

  const hasValue = (value: unknown): boolean => {
    if (Array.isArray(value)) return value.length > 0;
    return !!value;
  };

  const hasEnteredInput: boolean = control
    ? hasValue(watchedValue)
    : get(touchedFields, input.name) && getValues(input.name);

  const isInvalid: boolean = !!get(errors, input.name);
  const isValid: boolean = !get(errors, input.name);

  const languages = {
    en: 'ENG',
    ka: 'ქარ',
  } as const;

  const inputLanguage =
    languages[input.name.split('.')[1] as keyof typeof languages] ?? null;

  return { show, setShow, hasEnteredInput, isInvalid, isValid, inputLanguage };
};

export default useInputField;
