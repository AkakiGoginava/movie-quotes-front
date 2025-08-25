import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputFieldType, QuoteInputsType } from '@/types';
import { useMovie } from '@/hooks';

const useAddQuoteWithMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { handleStoreQuoteFactory, allMovies, isLoadingMovies } = useMovie();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    reset,
    control,
  } = useForm<QuoteInputsType>({
    mode: 'onChange',
  });

  const handleStoreQuote = handleStoreQuoteFactory(null, {
    onSuccess: () => {
      setModalOpen(false);
      reset();
    },
  });

  const onSubmitHandler = async (data: QuoteInputsType) => {
    const formData = new FormData();

    if (!data.movieId) return;

    formData.append('movie_id', data.movieId.toString());

    formData.append('text[en]', data.text.en);
    formData.append('text[ka]', data.text.ka);

    formData.append('poster', data.poster[0]);

    await handleStoreQuote(formData);
  };

  const onSubmit = handleSubmit(onSubmitHandler);

  const { t, i18n } = useTranslation();

  const movieOptions = allMovies.map((movie) => ({
    id: movie.id,
    name: `${i18n.language === 'ka' ? movie.title.ka : movie.title.en} (${movie.year})`,
  }));

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
      rules: {
        required: { value: true, message: 'Please upload an image' },
      },
      className: 'p-0 md:p-0',
      variant: 'secondary',
    },
    {
      label: t('addQuoteWithMovie.chooseMovieLabel'),
      name: 'movieId',
      type: 'select',
      options: movieOptions,
      rules: {
        required: {
          value: true,
          message: t('addQuoteWithMovie.chooseMovieRequired'),
        },
      },
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
    modalOpen,
    setModalOpen,
    isLoadingMovies,
  };
};

export default useAddQuoteWithMovie;
