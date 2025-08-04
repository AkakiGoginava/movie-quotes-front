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

  if (isLoading) return <div>Loading...</div>;

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
