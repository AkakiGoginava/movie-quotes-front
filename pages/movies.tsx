import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { AddMovie, Layout, MovieCard, Search } from '@/components';
import { getUserMovies } from '@/services';
import { Movie } from '@/types';

export default function Movies() {
  const [activeSearch, setActiveSearch] = useState('');

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['userMovies', activeSearch],
      queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
        getUserMovies(pageParam, activeSearch || undefined),
      getNextPageParam: (lastPage) => lastPage.data.next_cursor,
      initialPageParam: undefined,
    });

  if (isLoading) return <div>Loading...</div>;

  const allMovies = data?.pages.flatMap((page) => page.data.data) ?? [];
  const totalMovies = data?.pages[0]?.data.total_movies ?? 0;

  return (
    <Layout>
      <div>
        <section className='w-full px-7.5 md:pl-20 md:pr-17 flex flex-col gap-10'>
          <header className='flex gap-6 md:items-center justify-between py-4 md:py-0'>
            <div className='text-2xl font-medium text-wrap max-w-50 md:max-w-full'>
              My list of movies{' '}
              <span className='text-base md:text-2xl'>
                (Total {totalMovies})
              </span>
            </div>

            <div className='flex gap-8 items-center flex-1'>
              <Search
                onSearch={(searchTerm: string) => {
                  setActiveSearch(searchTerm);
                }}
                placeholder='Search movies... (Press Enter)'
              />

              <AddMovie />
            </div>
          </header>

          <main className='grid grid-cols-[repeat(auto-fit,22.5rem)] md:grid-cols-[repeat(auto-fit,27.5rem)] gap-y-8 pb-5 justify-between'>
            {allMovies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </main>

          {hasNextPage && (
            <div className='flex justify-center py-8'>
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className='px-6 py-3 text-lg text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:cursor-pointer'
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More Movies'}
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
