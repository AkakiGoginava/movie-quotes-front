import { createContext, useState } from 'react';

import { produce } from 'immer';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';

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
import {
  Quote,
  QuotesResponse,
  LikeQuoteResponse,
  PostCommentResponse,
} from '@/types';

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
  const totalMovies = moviesData?.pages[0]?.data.total_items ?? 0;

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
    movieId: number | null,
    options?: { onSuccess?: () => void },
  ) => {
    return useFormMutation(storeQuote, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userMovies'] });

        if (movieId) {
          queryClient.invalidateQueries({
            queryKey: ['movie', movieId.toString()],
          });
        }

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
    return useSimpleMutation<LikeQuoteResponse>(likeQuote, {
      onSuccess: (response, variables) => {
        if (!variables?.[0] || !response?.data) return;

        const quoteId = variables[0];
        const responseData = response.data;

        queryClient.setQueriesData(
          { queryKey: ['quotes'] },
          (oldData: InfiniteData<AxiosResponse<QuotesResponse>>) => {
            return produce(
              oldData,
              (draft: InfiniteData<AxiosResponse<QuotesResponse>>) => {
                draft?.pages.forEach((page) => {
                  page.data.data.forEach((quote: Quote) => {
                    if (quote.id === quoteId) {
                      quote.is_liked = responseData.liked;
                      quote.likes_count = responseData.likes_count;
                    }
                  });
                });
              },
            );
          },
        );

        queryClient.invalidateQueries({ queryKey: ['userMovies'] });
        queryClient.invalidateQueries({
          queryKey: ['movie', movieId.toString()],
        });
      },
    });
  };

  const handlePostCommentFactory = (movieId: number) => {
    return useSimpleMutation<PostCommentResponse>(postComment, {
      onSuccess: (response, variables) => {
        if (!variables?.[0] || !variables?.[1] || !response?.data) return;
        const quoteId = variables[0];
        const newComment = response.data.comment;

        queryClient.setQueriesData(
          { queryKey: ['quotes'] },
          (oldData: InfiniteData<AxiosResponse<QuotesResponse>>) => {
            return produce(
              oldData,
              (draft: InfiniteData<AxiosResponse<QuotesResponse>>) => {
                draft?.pages.forEach((page) => {
                  page.data.data.forEach((quote: Quote) => {
                    if (quote.id === quoteId) {
                      quote.comments_count += 1;
                      quote.comments.unshift(newComment);
                    }
                  });
                });
              },
            );
          },
        );

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
