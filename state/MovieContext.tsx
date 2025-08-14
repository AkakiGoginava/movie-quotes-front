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
  getQuotes,
  getUserMovies,
  likeQuote,
  postComment,
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

  const [activeMoviesSearch, setActiveMoviesSearch] = useState('');
  const [activeQuotesSearch, setActiveQuotesSearch] = useState('');

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data.data.categories,
  });

  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    isFetchingNextPage: isFetchingMoviesNextPage,
    hasNextPage: hasMoviesNextPage,
    fetchNextPage: fetchMoviesNextPage,
  } = useInfiniteQuery({
    queryKey: ['userMovies', activeMoviesSearch],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getUserMovies(pageParam, activeMoviesSearch || undefined),
    getNextPageParam: (lastPage) => lastPage.data.next_cursor,
    initialPageParam: undefined,
  });

  const allMovies = moviesData?.pages.flatMap((page) => page.data.data) ?? [];
  const totalMovies = moviesData?.pages[0]?.data.total_movies ?? 0;

  const {
    data: quotesData,
    isLoading: isLoadingQuotes,
    isFetchingNextPage: isFetchingQuotesNextPage,
    hasNextPage: hasQuotesNextPage,
    fetchNextPage: fetchQuotesNextPage,
  } = useInfiniteQuery({
    queryKey: ['quotes', activeQuotesSearch],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getQuotes(pageParam, activeQuotesSearch || undefined),
    getNextPageParam: (lastPage) => lastPage.data.next_cursor,
    initialPageParam: undefined,
  });

  const allQuotes = quotesData?.pages.flatMap((page) => page.data.data) ?? [];

  // Movie CRUD

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

  // Quote CRUD

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

  // Quote interactions

  const handleQuoteLikeFactory = (movieId: number) => {
    return useSimpleMutation(likeQuote, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userMovies'] });
        queryClient.invalidateQueries({
          queryKey: ['movie', movieId.toString()],
        });
      },
    });
  };

  const handlePostCommentFactory = (movieId: number) => {
    return useSimpleMutation(postComment, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userMovies'] });
        queryClient.invalidateQueries({
          queryKey: ['movie', movieId.toString()],
        });
      },
    });
  };

  return (
    <MovieContext.Provider
      value={{
        categories,
        isLoadingCategories,

        allMovies,
        totalMovies,
        isLoadingMovies,
        isFetchingMoviesNextPage,
        hasMoviesNextPage,
        fetchMoviesNextPage,
        setActiveMoviesSearch,

        handleDeleteMovie,
        handleStoreMovieFactory,
        handleUpdateMovieFactory,

        allQuotes,
        isLoadingQuotes,
        isFetchingQuotesNextPage,
        hasQuotesNextPage,
        fetchQuotesNextPage,
        setActiveQuotesSearch,

        handleStoreQuoteFactory,
        handleDeleteQuoteFactory,
        handleUpdateQuoteFactory,

        handleQuoteLikeFactory,
        handlePostCommentFactory,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
