import { useForm } from 'react-hook-form';

import { useAuth, useMovie } from '@/hooks';
import { Quote } from '@/types';

type CommentFormData = {
  content: string;
};

const useViewQuote = (quote: Quote) => {
  const { user, isLoading } = useAuth();
  const { handleQuoteLikeFactory, handlePostCommentFactory } = useMovie();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const handleQuoteLike = handleQuoteLikeFactory(quote.movie_id);
  const handlePostComment = handlePostCommentFactory(quote.movie_id);

  const onSubmitHandler = async (data: CommentFormData) => {
    try {
      await handlePostComment(quote.id, data.content);
      reset();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const onSubmit = handleSubmit(onSubmitHandler);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return {
    user,
    isLoading,
    handleQuoteLike,
    register,
    onSubmit,
    handleKeyDown,
    errors,
    isSubmitting,
  };
};

export default useViewQuote;
