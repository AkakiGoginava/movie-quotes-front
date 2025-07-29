import { InputFieldType, MovieInputsType } from '@/types';
import { useForm } from 'react-hook-form';

const useAddMovie = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    reset,
    setError,
  } = useForm<MovieInputsType>({
    mode: 'onChange',
  });

  const onSubmitHandler = (data: MovieInputsType) => {
    console.log(data);
  };

  const onSubmit = handleSubmit(onSubmitHandler);

  const movieInputs: InputFieldType<MovieInputsType>[] = [
    {
      label: 'Movie name',
      name: 'name.en',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter name' },
        minLength: { value: 3, message: 'Minimum length is 3' },
      },
    },
    {
      label: 'ფილმის სახელი',
      name: 'name.ka',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter name' },
        minLength: { value: 3, message: 'Minimum length is 3' },
      },
    },
    {
      label: 'Categories',
      name: 'categories',
      type: 'text',
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
      },
    },
    {
      label: 'რეჟისორი',
      name: 'director.ka',
      type: 'text',
      rules: {
        required: { value: true, message: 'Please enter director name' },
      },
    },
    {
      label: 'Movie description',
      name: 'description.en',
      type: 'textarea',
      rules: {
        required: { value: true, message: 'Please enter description' },
      },
    },
    {
      label: 'ფილმის აღწერა',
      name: 'description.ka',
      type: 'textarea',
      rules: {
        required: { value: true, message: 'Please enter description' },
      },
    },
  ];

  return {
    movieInputs,
    register,
    onSubmit,
    getValues,
    reset,
    errors,
    touchedFields,
    isSubmitting,
  };
};

export default useAddMovie;
