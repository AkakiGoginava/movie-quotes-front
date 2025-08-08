import { createContext, useState } from 'react';

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  deleteMovie,
  deleteQuote,
  getCategories,
  getUserMovies,
  storeMovie,
  storeQuote,
  updateMovie,
  updateQuote,
} from '@/services';
import { useFormMutation, useSimpleMutation } from '@/hooks';

import { MovieContextType } from './types';

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [activeSearch, setActiveSearch] = useState('');

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data.data.categories,
  });

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['userMovies', activeSearch],
      queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
        getUserMovies('en', pageParam, activeSearch || undefined),
      getNextPageParam: (lastPage) => lastPage.data.next_cursor,
      initialPageParam: undefined,
    });

  const allMovies = data?.pages.flatMap((page) => page.data.data) ?? [];
  const totalMovies = data?.pages[0]?.data.total_movies ?? 0;

  const handleDeleteMovie = useSimpleMutation(deleteMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMovies'] });
      router.push('/movies');
    },
  });

  const handleStoreMovieFactory = (options?: { onSuccess?: () => void }) => {
    return useFormMutation(storeMovie, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userMovies'] });

        options?.onSuccess?.();
      },
    });
  };

  const handleUpdateMovieFactory = (
    id: number,
    options?: { onSuccess?: () => void },
  ) => {
    return useFormMutation((formData: FormData) => updateMovie(id, formData), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userMovies'] });
        queryClient.invalidateQueries({ queryKey: ['movie', id.toString()] });

        options?.onSuccess?.();
      },
    });
  };

  const handleStoreQuoteFactory = (
    id: number,
    options?: { onSuccess?: () => void },
  ) => {
    return useFormMutation(storeQuote, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userMovies'] });
        queryClient.invalidateQueries({ queryKey: ['movie', id.toString()] });

        options?.onSuccess?.();
      },
    });
  };

  const deleteQuoteMutation = useSimpleMutation(deleteQuote);

  const handleDeleteQuoteFactory = (movieId: number) => {
    return async (quoteId: number) => {
      const result = await deleteQuoteMutation(quoteId);

      queryClient.invalidateQueries({ queryKey: ['userMovies'] });
      queryClient.invalidateQueries({
        queryKey: ['movie', movieId.toString()],
      });

      return result;
    };
  };

  const handleUpdateQuoteFactory = (
    movieId: number,
    quoteId: number,
    options?: { onSuccess?: () => void },
  ) => {
    return useFormMutation(
      (formData: FormData) => updateQuote(quoteId, formData),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['movie', movieId.toString()],
          });

          options?.onSuccess?.();
        },
      },
    );
  };

  return (
    <MovieContext.Provider
      value={{
        categories,
        isLoadingCategories,

        allMovies,
        totalMovies,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        setActiveSearch,

        handleDeleteMovie,
        handleStoreMovieFactory,
        handleUpdateMovieFactory,

        handleStoreQuoteFactory,
        handleDeleteQuoteFactory,
        handleUpdateQuoteFactory,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
