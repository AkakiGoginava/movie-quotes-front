import { Modal, QuoteForm, PencilIcon } from '@/components';

import useAddQuoteWithMovie from './useAddQuoteWithMovie';

const AddQuoteWithMovie = () => {
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
    isLoadingMovies,
  } = useAddQuoteWithMovie();

  if (isLoadingMovies) return <div>Loading...</div>;

  return (
    <>
      <div className='flex-1 md:bg-obsidian px-8 md:px-4 py-8 md:py-3 rounded-xl '>
        <div
          className='flex gap-4 items-center text-nowrap cursor-pointer hover:opacity-80'
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <PencilIcon />
          <span>Write new quote</span>
        </div>
      </div>

      <Modal
        setOpen={setModalOpen}
        open={modalOpen}
        reset={reset}
        modalClassName='p-0'
      >
        <QuoteForm
          title='Write new quote'
          submitText='Post'
          inputs={quoteInputs}
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

export default AddQuoteWithMovie;
