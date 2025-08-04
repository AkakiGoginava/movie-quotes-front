import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { AddMovie, Layout, MovieCard, SearchIcon } from '@/components';
import { getUserMovies } from '@/services';
import { Movie } from '@/types';

export default function Movies() {
  const { data: moviesData, isLoading } = useQuery<
    AxiosResponse<{ movies: Movie[] }>
  >({
    queryKey: ['userMovies'],
    queryFn: getUserMovies,
  });

  if (isLoading) return <div>Loading...</div>;

  const userMovies = moviesData?.data?.movies;

  return (
    <Layout>
      <div>
        <section className='w-full px-7.5 md:pl-20 md:pr-17 flex flex-col gap-10'>
          <header className='flex md:items-center justify-between py-4 md:py-0'>
            <div className='text-2xl font-medium text-wrap max-w-50 md:max-w-full'>
              My list of movies{' '}
              <span className='text-base md:text-2xl'>(Total 0)</span>
            </div>

            <div className='flex gap-8 items-center'>
              <div className='hidden md:flex md:gap-4 md:items-center'>
                <SearchIcon />
                <span>Search</span>
              </div>

              <AddMovie />
            </div>
          </header>

          <main className='grid grid-cols-[repeat(auto-fit,22.5rem)] md:grid-cols-[repeat(auto-fit,27.5rem)] gap-y-8 pb-5 justify-between'>
            {userMovies?.map((movie, idx) => (
              <MovieCard key={idx} movie={movie} />
            ))}
          </main>
        </section>
      </div>
    </Layout>
  );
}
