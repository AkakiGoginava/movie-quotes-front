import { QuoteIcon } from '@/components';
import { Movie } from '@/types';
import Link from 'next/link';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className='flex flex-col gap-3 hover:cursor-pointer'
    >
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
    </Link>
  );
};

export default MovieCard;
