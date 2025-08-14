export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  google_id: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar_url: string;
  };
};

export type Quote = {
  id: number;
  text: {
    en: string;
    ka: string;
  };
  poster_url: string;
  movie_id: number;
  movie_title: {
    en: string;
    ka: string;
  };
  movie_year: string;
  likes_count: number;
  is_liked: boolean;
  comments_count: number;
  comments: Comment[];
};

export type Movie = {
  id: number;
  title: {
    en: string;
    ka: string;
  };
  director: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  categories: Category[];
  year: string;
  poster_url: string;
  quotes_count: string;
  quotes: Quote[];
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  path: string;
  per_page: number;
  next_cursor: string | null;
  prev_cursor: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  total_items: number;
};

export type MoviesResponse = PaginatedResponse<Movie>;
export type QuotesResponse = PaginatedResponse<Quote>;

export type LikeQuoteResponse = {
  liked: boolean;
  likes_count: number;
};

export type PostCommentResponse = {
  comment: Comment;
};
