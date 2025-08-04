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
  year: string;
  poster_url: string;
  created_at: string;
  updated_at: string;
};
