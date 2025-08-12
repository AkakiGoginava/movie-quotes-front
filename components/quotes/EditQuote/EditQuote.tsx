import { Modal, QuoteForm } from '@/components';
import { Quote } from '@/types';

import useEditQuote from './useEditQuote';
import { Dispatch, SetStateAction } from 'react';

const EditQuote = ({
  movieId,
  quote,
  modalOpen,
  setModalOpen,
}: {
  movieId: number;
  quote: Quote;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
  } = useEditQuote({ movieId, quote, setModalOpen });

  return (
    <Modal
      setOpen={setModalOpen}
      open={modalOpen}
      reset={reset}
      modalClassName='p-0'
    >
      <QuoteForm
        title='Edit quote'
        submitText='Edit quote'
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
  );
};

export default EditQuote;
