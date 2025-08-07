import { CommentIcon, HeartIcon } from '@/components/icons';
import { SimpleQuote } from '@/types';

const QuoteCard = ({ quote }: { quote: SimpleQuote }) => {
  return (
    <section className='w-full flex flex-col gap-6 rounded py-5 px-7.5 bg-zinc-900'>
      <div className='w-full flex flex-col md:flex-row gap-6'>
        <img
          src={quote.poster_url}
          alt='quote poster'
          className='w-full max-h-32.5 md:max-w-60 object-cover rounded'
        />

        <p className='text-2xl italic'>"{quote.text.en}"</p>

        <div className='ml-auto text-2xl font-bold hidden md:flex'>...</div>
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

        <div className='ml-auto font-bold md:hidden'>...</div>
      </div>
    </section>
  );
};

export default QuoteCard;
