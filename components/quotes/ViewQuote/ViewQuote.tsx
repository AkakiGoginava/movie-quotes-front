import { useTranslation } from 'react-i18next';

import {
  CommentIcon,
  DeleteIcon,
  EditIcon,
  HeartIcon,
  LikedHeartIcon,
} from '@/components';

import { PropsType } from './types';
import useViewQuote from './useViewQuote';

const ViewQuote: React.FC<PropsType> = ({
  quote,
  setModalOpen,
  setOpenQuoteEdit,
  handleDeleteQuote,
  readonly,
}) => {
  const {
    user,
    isLoading,
    handleQuoteLike,
    register,
    onSubmit,
    handleKeyDown,
    isSubmitting,
  } = useViewQuote(quote);
  const { t, i18n } = useTranslation();
  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <section className='flex flex-col gap-9 pb-6'>
      {!readonly && (
        <>
          <div className='absolute flex gap-4 md:gap-6 top-6 md:top-13'>
            <EditIcon
              className='cursor-pointer'
              onClick={() => {
                setModalOpen?.(false);
                setOpenQuoteEdit?.(true);
              }}
            />
            <span>|</span>
            <DeleteIcon
              className='cursor-pointer'
              onClick={() => handleDeleteQuote?.(quote.id)}
            />
          </div>

          <h1 className='hidden md:block text-xl md:text-2xl font-medium text-center'>
            {t('quoteCard.view')}
          </h1>

          <div className='border-b border-gray-700 mt-5 md:mt-0' />
        </>
      )}

      <div className='flex gap-4 md:gap-9'>
        <img
          src={quote.user.avatar_url}
          alt='avatar'
          className='size-10 md:size-15 object-contain bg-gray-300 rounded-full'
        />

        <p className='flex text-xl items-center '>{quote.user.name}</p>
      </div>

      <div className='flex flex-col gap-4'>
        {readonly ? (
          <p className='md:text-xl'>
            "{i18n.language === 'ka' ? quote.text.ka : quote.text.en}"{' '}
            {t('viewQuote.movie')} -{' '}
            <span className='text-light-yellow'>
              {i18n.language === 'ka'
                ? quote.movie_title.ka
                : quote.movie_title.en}
            </span>{' '}
            ({quote.movie_year})
          </p>
        ) : (
          <>
            <div className='relative w-full border border-gray-700 md:text-2xl rounded pl-2 pr-10 py-1'>
              <span className='italic'>"{quote.text.en}"</span>
              <span className='absolute right-3 top-1 text-gray-500 md:text-xl'>
                Eng
              </span>
            </div>

            <div className='relative w-full border border-gray-700 md:text-2xl rounded pl-2 pr-10 py-1'>
              <span className='italic'>"{quote.text.ka}"</span>
              <span className='absolute right-3 top-1 text-gray-500 md:text-xl'>
                ქარ
              </span>
            </div>
          </>
        )}

        <img
          src={quote.poster_url}
          alt='quote poster'
          className='rounded-lg w-full max-h-75 mt-5 object-cover'
        />

        <div className='flex gap-6 text-xl mt-5 border-b border-gray-600 pb-5'>
          <div className='flex items-center gap-3'>
            <CommentIcon />
            <span>{quote.comments_count}</span>
          </div>

          <div className='flex items-center gap-3'>
            <div
              onClick={() => handleQuoteLike(quote.id)}
              className='cursor-pointer hover:opacity-80 fill-current'
            >
              {quote.is_liked ? <LikedHeartIcon /> : <HeartIcon />}
            </div>
            <span>{quote.likes_count}</span>
          </div>
        </div>

        <div className='pt-2 flex flex-col gap-6'>
          {quote.comments.map((comment) => (
            <div className='flex flex-col gap-3 md:text-xl' key={comment.id}>
              <div className='flex gap-4 items-center'>
                <img
                  src={comment.user.avatar_url}
                  alt='user_avatar'
                  className='size-10 md:size-13 rounded-full object-contain bg-gray-300'
                />

                <span className='font-medium'>{comment.user.name}</span>
              </div>

              <p className='md:ml-15 md:pl-2 border-b border-gray-600 pb-6'>
                {comment.content}
              </p>
            </div>
          ))}

          <form onSubmit={onSubmit} className='flex gap-3 md:text-xl'>
            <img
              src={user?.avatar_url}
              alt='user_avatar'
              className='size-10 md:size-13 rounded-full object-contain bg-gray-300'
            />

            <textarea
              {...register('content', {
                required: t('viewQuote.commentRequired'),
                minLength: {
                  value: 1,
                  message: t('viewQuote.commentNotEmpty'),
                },
              })}
              onKeyDown={handleKeyDown}
              className='bg-obsidian rounded-lg border-0 h-10 md:h-13 w-full placeholder:text-white focus:ring-0'
              placeholder={t('viewQuote.writeComment')}
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewQuote;
