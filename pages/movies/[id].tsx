import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import i18n from '@/src/i18n';
import {
  AddQuote,
  DeleteIcon,
  EditIcon,
  EditMovie,
  Layout,
  QuoteCard,
} from '@/components';
import { getMovie } from '@/services';
import { Category } from '@/types';
import { useMovie } from '@/hooks';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [openEditModal, setOpenEditModal] = useState(false);

  const { handleDeleteMovie, handleDeleteQuoteFactory } = useMovie();
  const { t } = useTranslation();

  if (!id || typeof id !== 'string') {
    return <div>{t('movies.invalidId', 'Invalid movie ID')}</div>;
  }

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovie(id),
    enabled: !!id,
    select: (data) => data?.data?.movie,
  });

  if (isLoading) return <div>{t('movies.loading')}</div>;

  if (!movie) return <div>{t('movies.notFound')}</div>;

  const handleDeleteQuote = handleDeleteQuoteFactory(movie.id);

  return (
    <Layout>
      <div className='w-full py-8 md:py-0 md:pl-20 md:pr-17'>
        <section className='mb-9 px-7.5 md:px-0'>
          <h1 className='text-2xl font-medium mb-8 hidden md:inline-block'>
            {t('movies.description')}
          </h1>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='w-full md:w-auto md:flex-4'>
              <img
                src={movie.poster_url}
                alt={movie.title.en}
                className='w-full rounded-lg object-cover max-h-110'
              />
            </div>

            <div className='w-full md:w-auto md:flex-3 flex flex-col gap-5'>
              <div className='flex justify-between items-center'>
                <h1 className='font-medium text-2xl text-light-yellow'>
                  {i18n.language === 'ka' ? movie.title.ka : movie.title.en} (
                  {movie.year})
                </h1>

                <div className='flex gap-4 items-center bg-obsidian px-6 py-2 rounded-xl'>
                  <EditIcon
                    className='cursor-pointer'
                    onClick={() => setOpenEditModal(true)}
                  />
                  <span className='text-gray-500'>|</span>
                  <DeleteIcon
                    className='cursor-pointer'
                    onClick={() => handleDeleteMovie(movie.id)}
                  />
                </div>
              </div>

              <div className='flex gap-2 flex-wrap'>
                {movie.categories.map((category: Category) => (
                  <div
                    key={category.id}
                    className='font-bold text-lg bg-gray-600 py-1 px-3 rounded-lg'
                  >
                    {category.name}
                  </div>
                ))}
              </div>

              <h2 className='text-lg font-bold mb-2'>
                {t('movies.director')}:{' '}
                {i18n.language === 'ka' ? movie.director.ka : movie.director.en}
              </h2>

              <p className='text-lg'>
                {i18n.language === 'ka'
                  ? movie.description.ka
                  : movie.description.en}
              </p>
            </div>

            <EditMovie
              modalOpen={openEditModal}
              setModalOpen={setOpenEditModal}
              movie={movie}
            />
          </div>
        </section>

        <section className='flex flex-col gap-9'>
          <div className='px-7.5 md:px-0 flex flex-col-reverse md:flex-row gap-8 md:gap-4 md:items-center'>
            <div className='flex flex-col md:flex-row'>
              <span className='text-2xl'>{t('movies.quotes')}</span>
              <span className='md:ml-2 md:text-2xl'>
                ({t('movies.total', { count: Number(movie.quotes_count) })})
              </span>
            </div>

            <span className='text-gray-500 hidden md:inline-block'>|</span>
            <div className='border-b border-gray-600 md:hidden' />

            <AddQuote movie={movie} />
          </div>

          <div className='flex flex-col gap-9 md:max-w-207 pb-9'>
            {movie.quotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                handleDeleteQuote={handleDeleteQuote}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
