import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { Button, Layout, PlusIcon } from '@/components';
import { getMovie } from '@/services';
import { Category } from '@/types';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovie(id as string),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;

  const movie = data?.data?.movie;

  return (
    <Layout>
      <div className='w-full px-7.5 md:pl-20 md:pr-17'>
        <section className='mb-9'>
          <h1 className='text-2xl font-medium mb-8'>Movie description</h1>

          {movie && (
            <div className='flex gap-6'>
              <div className='flex-4'>
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className='w-full rounded-lg'
                />
              </div>

              <div className='flex-3 flex flex-col gap-5'>
                <h1 className='font-medium text-2xl text-light-yellow'>
                  {movie.title} ({movie.year})
                </h1>

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
          <div className='flex gap-4 items-center'>
            <span className='text-2xl'>Quotes (total 0)</span>
            <span className='text-gray-500'>|</span>
            <Button type='button' variant='primary' className='text-xl'>
              <PlusIcon /> <span>Add quote</span>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
