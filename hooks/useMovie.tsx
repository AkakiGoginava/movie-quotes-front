import { useContext } from 'react';
import { MovieContext } from '@/state';

function useMovie() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovie must be used within an MovieProvider');
  }

  return context;
}

export default useMovie;
