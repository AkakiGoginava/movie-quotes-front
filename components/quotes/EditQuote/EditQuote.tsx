import { Dispatch, SetStateAction } from 'react';

import { useTranslation } from 'react-i18next';

import { Modal, QuoteForm } from '@/components';
import { Quote } from '@/types';

import useEditQuote from './useEditQuote';

const EditQuote = ({
  quote,
  modalOpen,
  setModalOpen,
}: {
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
  } = useEditQuote({ quote, setModalOpen });
  const { t } = useTranslation();

  return (
    <Modal
      setOpen={setModalOpen}
      open={modalOpen}
      reset={reset}
      modalClassName='p-0'
    >
      <QuoteForm
        title={t('editQuote.title')}
        submitText={t('editQuote.submitText')}
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
