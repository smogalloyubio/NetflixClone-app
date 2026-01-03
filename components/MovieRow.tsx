
import React, { useRef } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLarge?: boolean;
  onMovieClick: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, isLarge, onMovieClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-8 px-4 md:px-12 relative group">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-200 capitalize">
        {title}
      </h2>

      <div 
        ref={rowRef}
        className="flex space-x-2 md:space-x-4 overflow-x-auto no-scrollbar py-4 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isLarge={isLarge} 
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
