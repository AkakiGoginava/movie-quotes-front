import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button, DeleteIcon, EditIcon, Layout, PlusIcon } from '@/components';
import { getMovie, deleteMovie } from '@/services';
import { Category } from '@/types';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovie(id as string),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: (movieId: string) => deleteMovie(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMovies'] });
      router.push('/movies');
    },
  });

  const handleDelete = () => {
    if (id && typeof id === 'string') {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const movie = data?.data?.movie;

  return (
    <Layout>
      <div className='w-full px-7.5 py-8 md:py-0 md:pl-20 md:pr-17'>
        <section className='mb-9'>
          <h1 className='text-2xl font-medium mb-8 hidden md:inline-block'>
            Movie description
          </h1>

          {movie && (
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='w-full md:w-auto md:flex-4'>
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className='w-full rounded-lg'
                />
              </div>

              <div className='w-full md:w-auto md:flex-3 flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                  <h1 className='font-medium text-2xl text-light-yellow'>
                    {movie.title} ({movie.year})
                  </h1>

                  <div className='flex gap-4 items-center bg-obsidian px-6 py-2 rounded-xl'>
                    <EditIcon className='cursor-pointer' />
                    <span className='text-gray-500'>|</span>
                    <DeleteIcon
                      className='cursor-pointer'
                      onClick={() => handleDelete()}
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
                  Director: {movie.director}
                </h2>

                <p className='text-lg'>{movie.description}</p>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className='flex flex-col-reverse md:flex-row gap-8 md:gap-4 md:items-center'>
            <div className='flex flex-col md:flex-row'>
              <span className='text-2xl'>Quotes </span>
              <span className='md:text-2xl'>(total 0)</span>
            </div>

            <span className='text-gray-500 hidden md:inline-block'>|</span>
            <div className='border-b border-gray-600 md:hidden' />

            <Button
              type='button'
              variant='primary'
              className='md:text-xl text-base w-fit'
            >
              <PlusIcon /> <span>Add quote</span>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
