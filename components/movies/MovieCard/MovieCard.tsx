import { QuoteIcon } from '@/components';
import { Movie } from '@/types';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className='flex flex-col gap-3 hover:cursor-pointer'>
      <img
        src={movie.poster_url}
        alt='movie cover'
        className='object-cover w-90 md:w-110 h-75 md:h-118 rounded-lg'
      />

      <span className='font-medium text-2xl'>
        {movie.title} ({movie.year})
      </span>

      <div className='flex gap-3 items-center'>
        <span>10</span>
        <QuoteIcon />
      </div>
    </div>
  );
};

export default MovieCard;
