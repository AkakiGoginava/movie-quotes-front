import { useTranslation } from 'react-i18next';

import { Button, Modal, MovieForm, PlusIcon } from '@/components';

import useAddMovie from './useAddMovie';

const AddMovie = () => {
  const {
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
  } = useAddMovie();

  const { t } = useTranslation();
  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <>
      <Button
        variant='primary'
        type='button'
        handleClick={() => {
          setModalOpen(true);
        }}
      >
        <PlusIcon />
        <span className='text-base md:text-xl'>{t('addMovie.buttonText')}</span>
      </Button>

      <Modal
        setOpen={setModalOpen}
        open={modalOpen}
        reset={reset}
        modalClassName='p-0'
      >
        <MovieForm
          title={t('addMovie.title')}
          submitText={t('addMovie.submitText')}
          inputs={movieInputs}
          register={register}
          onSubmit={onSubmit}
          getValues={getValues}
          errors={errors}
          touchedFields={touchedFields}
          isSubmitting={isSubmitting}
          control={control}
        />
      </Modal>
    </>
  );
};

export default AddMovie;
