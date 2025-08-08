import { Modal, PlusIcon, Button, QuoteForm } from '@/components';
import { Movie } from '@/types';

import useAddQuote from './useAddQuote';

const AddQuote = ({ movie }: { movie: Movie }) => {
  const {
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
  } = useAddQuote({ movieId: movie.id });

  return (
    <>
      <Button
        type='button'
        variant='primary'
        className='md:text-xl text-base w-fit'
        handleClick={() => {
          setModalOpen(true);
        }}
      >
        <PlusIcon />
        <span>Add quote</span>
      </Button>

      <Modal
        setOpen={setModalOpen}
        open={modalOpen}
        reset={reset}
        modalClassName='p-0'
      >
        <QuoteForm
          title='Add quote'
          submitText='Add quote'
          inputs={quoteInputs}
          register={register}
          onSubmit={onSubmit}
          getValues={getValues}
          errors={errors}
          touchedFields={touchedFields}
          isSubmitting={isSubmitting}
          control={control}
          movie={movie}
        />
      </Modal>
    </>
  );
};

export default AddQuote;
