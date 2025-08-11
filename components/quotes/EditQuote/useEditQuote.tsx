import { Dispatch, SetStateAction, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { InputFieldType, QuoteInputsType, SimpleQuote } from '@/types';
import { useMovie } from '@/hooks';

const useEditQuote = ({
  movieId,
  quote,
  setModalOpen,
}: {
  movieId: number;
  quote: SimpleQuote;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleUpdateQuoteFactory } = useMovie();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    reset,
    control,
  } = useForm<QuoteInputsType>({
    mode: 'onChange',
    defaultValues: {
      text: {
        en: quote?.text.en || '',
        ka: quote?.text.ka || '',
      },
    },
  });

  useEffect(() => {
    reset({
      text: {
        en: quote?.text.en || '',
        ka: quote?.text.ka || '',
      },
    });
  }, [quote]);

  const handleUpdateQuote = handleUpdateQuoteFactory(movieId, quote.id, {
    onSuccess: () => {
      setModalOpen(false);
      reset();
    },
  });

  const onSubmitHandler = (data: QuoteInputsType) => {
    const formData = new FormData();

    formData.append('movie_id', movieId.toString());

    formData.append('text[en]', data.text.en);
    formData.append('text[ka]', data.text.ka);

    if (data?.poster?.[0]) {
      formData.append('poster', data.poster[0]);
    }

    handleUpdateQuote(formData);
  };

  const onSubmit = handleSubmit(onSubmitHandler);

  const quoteInputs: InputFieldType<QuoteInputsType>[] = [
    {
      placeholder: '"Quote in English."',
      name: 'text.en',
      type: 'textarea',
      rules: {
        required: { value: true, message: 'Please enter title' },
        minLength: { value: 3, message: 'Minimum length is 3' },
        pattern: {
          value: /^[a-zA-Z0-9\s\-.,!?'"():]+$/,
          message: 'Please enter text in English',
        },
      },
      className: 'italic placeholder:text-white px-0',
    },
    {
      placeholder: '"ციტატა ქართულად"',
      name: 'text.ka',
      type: 'textarea',
      rules: {
        required: { value: true, message: 'Please enter title' },
        minLength: { value: 3, message: 'Minimum length is 3' },
        pattern: {
          value: /^[\u10A0-\u10FF0-9\s\-.,!?'"():]+$/,
          message: 'გთხოვთ შეიყვანოთ ტექსტი ქართულად',
        },
      },
      className: 'italic placeholder:text-white px-0',
    },
    {
      label: 'Upload image',
      name: 'poster',
      type: 'file',
      className: 'p-0 md:p-0',
      variant: 'secondary',
    },
  ];

  return {
    quoteInputs,
    register,
    onSubmit,
    getValues,
    reset,
    errors,
    touchedFields,
    isSubmitting,
    control,
  };
};

export default useEditQuote;
