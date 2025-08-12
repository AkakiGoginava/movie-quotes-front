import {
  CommentIcon,
  DeleteIcon,
  EditIcon,
  HeartIcon,
  LikedHeartIcon,
  Modal,
} from '@/components';
import { useAuth, useMovie } from '@/hooks';

import { PropsType } from './types';
import { cn } from '@/helpers';

const ViewQuote: React.FC<PropsType> = ({
  quote,
  modalOpen,
  setModalOpen,
  setOpenQuoteEdit,
  handleDeleteQuote,
}) => {
  const { user, isLoading } = useAuth();

  const { handleQuoteLikeFactory } = useMovie();

  const handleQuoteLike = handleQuoteLikeFactory(quote.movie_id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Modal
      setOpen={setModalOpen}
      open={modalOpen}
      modalClassName='px-9 md:px-8'
    >
      <div className='flex flex-col gap-9 md:min-w-225 pb-6'>
        <div className='absolute flex gap-4 md:gap-6 top-6 md:top-13'>
          <EditIcon
            className='cursor-pointer'
            onClick={() => {
              setModalOpen(false);
              setOpenQuoteEdit(true);
            }}
          />
          <span>|</span>
          <DeleteIcon
            className='cursor-pointer'
            onClick={() => handleDeleteQuote(quote.id)}
          />
        </div>

        <h1 className='hidden md:block text-xl md:text-2xl font-medium text-center'>
          View quote
        </h1>

        <div className='border-b border-gray-700 mt-5 md:mt-0' />

        <div className='flex gap-9'>
          <img
            src={user?.avatar_url}
            alt='avatar'
            className='size-10 md:size-15 object-contain bg-gray-300 rounded-full'
          />

          <p className='flex text-xl items-center '>{user?.name}</p>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='relative w-full border border-gray-700 md:text-2xl rounded pl-2 pr-5 py-1'>
            <span className='italic'>"{quote.text.en}"</span>
            <span className='absolute right-3 top-1 text-gray-500 md:text-xl'>
              Eng
            </span>
          </div>

          <div className='relative w-full border border-gray-700 md:text-2xl rounded pl-2 pr-5 py-1'>
            <span className='italic'>"{quote.text.ka}"</span>
            <span className='absolute right-3 top-1 text-gray-500 md:text-xl'>
              ქარ
            </span>
          </div>

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
        </div>
      </div>
    </Modal>
  );
};

export default ViewQuote;
