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

  const watchedValue = useWatch({
    control,
    name: input.name,
  });

  const hasEnteredInput: boolean = control
    ? !!watchedValue &&
      (Array.isArray(watchedValue) ? watchedValue.length > 0 : true)
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
