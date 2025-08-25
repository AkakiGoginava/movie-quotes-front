import { Dispatch, SetStateAction } from 'react';

import { useTranslation } from 'react-i18next';

import { Modal, MovieForm } from '@/components';
import { Movie } from '@/types';

import useEditMovie from './useEditMovie';

const EditMovie = ({
  modalOpen,
  setModalOpen,
  movie,
}: {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  movie: Movie;
}) => {
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
  } = useEditMovie(setModalOpen, movie);

  const { t } = useTranslation();
  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <>
      <Modal
        setOpen={setModalOpen}
        open={modalOpen}
        reset={reset}
        modalClassName='p-0'
      >
        <MovieForm
          title={t('editMovie.title')}
          submitText={t('editMovie.submitText')}
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

export default EditMovie;
