import { Dispatch, SetStateAction } from 'react';

import { useTranslation } from 'react-i18next';

import { DeleteIcon, Modal, QuoteForm } from '@/components';
import { Quote } from '@/types';

import useEditQuote from './useEditQuote';

const EditQuote = ({
  quote,
  modalOpen,
  setModalOpen,
  handleDeleteQuote,
}: {
  quote: Quote;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteQuote?: (...args: any[]) => Promise<any>;
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
      <>
        <div
          onClick={() => handleDeleteQuote?.(quote.id)}
          className='flex md:gap-3 cursor-pointer absolute top-9 md:top-10 left-8 md:left-28 '
        >
          <DeleteIcon className='cursor-pointer' />
          <span className='hidden md:block'>{t('editQuote.delete')}</span>
        </div>
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
      </>
    </Modal>
  );
};

export default EditQuote;
