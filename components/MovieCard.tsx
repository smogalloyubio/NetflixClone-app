
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLarge, onClick }) => {
  return (
    <div 
      onClick={() => onClick(movie)}
      className={`relative flex-shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:scale-110 z-10 hover:z-20 ${
        isLarge ? 'w-40 md:w-56' : 'w-48 md:w-72'
      }`}
    >
      <img
        src={isLarge ? movie.poster_path : movie.backdrop_path}
        alt={movie.title}
        className={`w-full object-cover rounded-sm shadow-lg ${
          isLarge ? 'h-60 md:h-80' : 'h-28 md:h-40'
        }`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 rounded-sm" />
    </div>
  );
};

export default MovieCard;
