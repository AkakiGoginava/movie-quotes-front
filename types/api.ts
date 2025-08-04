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

export type Movie = {
  id: number;
  title: string;
  director: string;
  description: string;
  categories: Category[];
  year: string;
  poster_url: string;
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  next_cursor: string | null;
  prev_cursor: string | null;
  per_page: number;
  total_movies: number;
};

export type MoviesResponse = PaginatedResponse<Movie>;
