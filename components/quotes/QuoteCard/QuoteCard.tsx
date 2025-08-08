import {
  CommentIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  HeartIcon,
} from '@/components/icons';
import { SimpleQuote } from '@/types';

const QuoteCard = ({
  quote,
  handleDeleteQuote,
}: {
  quote: SimpleQuote;
  handleDeleteQuote: (...args: any[]) => Promise<any>;
}) => {
  return (
    <section className='relative w-full flex flex-col gap-6 rounded py-5 px-7.5 bg-zinc-900'>
      <div className='w-full flex flex-col md:flex-row gap-6'>
        <img
          src={quote.poster_url}
          alt='quote poster'
          className='w-full max-h-32.5 md:max-w-60 object-cover rounded'
        />

        <p className='text-2xl italic'>"{quote.text.en}"</p>
      </div>

      <div className='border-b border-gray-700'></div>

      <div className='flex gap-6 text-xl'>
        <div className='flex items-center gap-3'>
          <CommentIcon />
          <span>3</span>
        </div>

        <div className='flex items-center gap-3'>
          <HeartIcon />
          <span>10</span>
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
            className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'
          >
            <li className='mb-2'>
              <div className='flex gap-4'>
                <EyeIcon className='size-5' />
                <span>View quote</span>
              </div>
            </li>

            <li className='flex gap-4'>
              <div className='flex gap-4 mb-2'>
                <EditIcon />
                <span>Edit</span>
              </div>
            </li>

            <li className='flex gap-4'>
              <div
                className='flex gap-4'
                onClick={() => handleDeleteQuote(quote.id)}
              >
                <DeleteIcon />
                <span>Delete</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default QuoteCard;
