import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  CommentIcon,
  DeleteIcon,
  EditIcon,
  EditQuote,
  EyeIcon,
  HeartIcon,
  Modal,
  ViewQuote,
} from '@/components';
import { Quote } from '@/types';

const QuoteCard = ({
  quote,
  handleDeleteQuote,
}: {
  quote: Quote;
  handleDeleteQuote: (...args: any[]) => Promise<any>;
}) => {
  const [openQuoteEdit, setOpenQuoteEdit] = useState(false);
  const [openQuoteView, setOpenQuoteView] = useState(false);

  const { t, i18n } = useTranslation();

  return (
    <section className='relative w-full flex flex-col gap-6 rounded py-5 px-7.5 bg-slate-950'>
      <div className='w-full flex flex-col md:flex-row gap-6'>
        <img
          src={quote.poster_url}
          alt='quote poster'
          className='w-full max-h-32.5 md:max-w-60 object-cover rounded'
        />

        <p className='text-2xl italic flex items-center'>
          "{i18n.language === 'ka' ? quote.text.ka : quote.text.en}"
        </p>
      </div>

      <div className='border-b border-gray-700'></div>

      <div className='flex gap-6 text-xl'>
        <div className='flex items-center gap-3'>
          <CommentIcon />
          <span>{quote.comments_count}</span>
        </div>

        <div className='flex items-center gap-3'>
          <HeartIcon />
          <span>{quote.likes_count}</span>
        </div>

        <div className='dropdown dropdown-top dropdown-end absolute bottom-5 right-5 md:top-3'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost font-bold text-2xl'
          >
            ...
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content bg-neutral menu rounded-box z-1 w-52 p-2 shadow-sm'
          >
            <li className='mb-2'>
              <div
                className='flex gap-4'
                onClick={() => setOpenQuoteView(true)}
              >
                <EyeIcon className='size-5' />
                <span>{t('quoteCard.view')}</span>
              </div>
            </li>

            <li className='flex gap-4'>
              <div
                className='flex gap-4 mb-2'
                onClick={() => setOpenQuoteEdit(true)}
              >
                <EditIcon />
                <span>{t('quoteCard.edit')}</span>
              </div>
            </li>

            <li className='flex gap-4'>
              <div
                className='flex gap-4'
                onClick={() => handleDeleteQuote(quote.id)}
              >
                <DeleteIcon />
                <span>{t('quoteCard.delete')}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <EditQuote
        setModalOpen={setOpenQuoteEdit}
        modalOpen={openQuoteEdit}
        quote={quote}
        handleDeleteQuote={handleDeleteQuote}
      />

      <Modal
        setOpen={setOpenQuoteView}
        open={openQuoteView}
        modalClassName='px-9 md:px-8 md:w-[45vw]'
      >
        <ViewQuote
          setModalOpen={setOpenQuoteView}
          quote={quote}
          setOpenQuoteEdit={setOpenQuoteEdit}
          handleDeleteQuote={handleDeleteQuote}
        />
      </Modal>
    </section>
  );
};

export default QuoteCard;
