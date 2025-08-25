import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import { QuoteIcon } from '@/components';
import { Movie } from '@/types';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { i18n } = useTranslation();

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
        {i18n.language === 'ka' ? movie.title.ka : movie.title.en} ({movie.year}
        )
      </span>

      <div className='flex gap-3 items-center'>
        <span>{movie.quotes_count}</span>
        <QuoteIcon />
      </div>
    </Link>
  );
};

export default MovieCard;
