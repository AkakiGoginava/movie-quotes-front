import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getCategories, storeMovie } from '@/services';
import { InputFieldType, MovieInputsType } from '@/types';

const useAddMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    reset,
    setError,
    control,
  } = useForm<MovieInputsType>({
    mode: 'onChange',
  });

  const storeMovieMutation = useMutation({
    mutationFn: storeMovie,
    onSuccess: () => {
      setModalOpen(false);
    },
  });

  const onSubmitHandler = (data: MovieInputsType) => {
    const formData = new FormData();

    formData.append('name[en]', data.name.en);
    formData.append('name[ka]', data.name.ka);

    formData.append('director[en]', data.director.en);
    formData.append('director[ka]', data.director.ka);

    formData.append('description[en]', data.description.en);
    formData.append('description[ka]', data.description.ka);

    formData.append('year', data.year);

    data.categories.forEach((categoryId, index) => {
      formData.append(`categories[${index}]`, categoryId.toString());
    });

    formData.append('poster', data.poster[0]);

    storeMovieMutation.mutate(formData);
  };

  const onSubmit = handleSubmit(onSubmitHandler);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data.data.categories,
  });

  const movieInputs: InputFieldType<MovieInputsType>[] = [
    {
      label: 'Movie name',
      name: 'name.en',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter name' },
        minLength: { value: 3, message: 'Minimum length is 3' },
        pattern: {
          value: /^[a-zA-Z0-9\s\-.,!?'"():]+$/,
          message: 'Please enter text in English',
        },
      },
    },
    {
      label: 'ფილმის სახელი',
      name: 'name.ka',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter name' },
        minLength: { value: 3, message: 'Minimum length is 3' },
        pattern: {
          value: /^[\u10A0-\u10FF0-9\s\-.,!?'"():]+$/,
          message: 'გთხოვთ შეიყვანოთ ტექსტი ქართულად',
        },
      },
    },
    {
      label: 'Categories',
      name: 'categories',
      type: 'multiselect',
      options: categories,
      rules: {
        required: { value: true, message: 'Please enter categories' },
      },
    },
    {
      label: 'წელი/Year',
      name: 'year',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter categories' },
        pattern: {
          value: /^(19|20)\d{2}$/,
          message: 'Please enter a valid year',
        },
      },
    },
    {
      label: 'Director',
      name: 'director.en',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter director name' },
        pattern: {
          value: /^[a-zA-Z\s\-.']+$/,
          message: 'Please enter director name in English',
        },
      },
    },
    {
      label: 'რეჟისორი',
      name: 'director.ka',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter director name' },
        pattern: {
          value: /^[\u10A0-\u10FF\s\-.']+$/,
          message: 'გთხოვთ შეიყვანოთ რეჟისორის სახელი ქართულად',
        },
      },
    },
    {
      label: 'Movie description',
      name: 'description.en',
      type: 'textarea',
      rules: {
        required: { value: true, message: 'Please enter description' },
        pattern: {
          value: /^[a-zA-Z0-9\s\-.,!?'"():;/\n\r]+$/,
          message: 'Please enter description in English',
        },
      },
    },
    {
      label: 'ფილმის აღწერა',
      name: 'description.ka',
      type: 'textarea',
      rules: {
        required: { value: true, message: 'Please enter description' },
        pattern: {
          value: /^[\u10A0-\u10FF0-9\s\-.,!?'"():;/\n\r]+$/,
          message: 'გთხოვთ შეიყვანოთ აღწერა ქართულად',
        },
      },
    },
    {
      label: 'Upload image',
      name: 'poster',
      type: 'file',
      rules: {
        required: { value: true, message: 'Please upload an image' },
      },
    },
  ];

  return {
    isLoading,
    movieInputs,
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
  };
};

export default useAddMovie;
