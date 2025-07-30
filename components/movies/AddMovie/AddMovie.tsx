import { useState } from 'react';

import { Button, Modal, MovieForm, PlusIcon } from '@/components';

import useAddMovie from './useAddMovie';

const AddMovie = () => {
  const {
    movieInputs,
    register,
    onSubmit,
    getValues,
    reset,
    errors,
    touchedFields,
    isSubmitting,
    control,
  } = useAddMovie();

  const [modalOpen, setModalOpen] = useState(false);

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
        <span className='text-base md:text-xl'>Add movie</span>
      </Button>

      <Modal
        setOpen={setModalOpen}
        open={modalOpen}
        reset={reset}
        modalClassName='p-0'
      >
        <MovieForm
          title='Add movie'
          submitText='Add movie'
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
