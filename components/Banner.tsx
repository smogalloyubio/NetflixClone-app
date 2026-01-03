
import React from 'react';
import { Movie } from '../types';
import { PlayIcon, InfoIcon } from './Icons';

interface BannerProps {
  movie: Movie | null;
  onInfoClick: (movie: Movie) => void;
}

const Banner: React.FC<BannerProps> = ({ movie, onInfoClick }) => {
  if (!movie) return (
    <div className="h-[80vh] bg-neutral-900 animate-pulse w-full" />
  );

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header 
      className="relative h-[80vh] md:h-[90vh] text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to top, #141414, transparent), url(${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      <div className="relative pt-[15vh] md:pt-[30vh] px-4 md:px-12 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 max-w-2xl">
          {movie.title || movie.name}
        </h1>

        <div className="flex space-x-3 mb-4">
          <button className="flex items-center space-x-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
            <PlayIcon className="w-6 h-6" />
            <span>Play</span>
          </button>
          <button 
            onClick={() => onInfoClick(movie)}
            className="flex items-center space-x-2 bg-gray-500/50 text-white px-6 py-2 rounded font-bold hover:bg-gray-500/80 transition"
          >
            <InfoIcon className="w-6 h-6" />
            <span>More Info</span>
          </button>
        </div>

        <p className="text-sm md:text-lg max-w-xl text-gray-100 drop-shadow-lg leading-relaxed">
          {truncate(movie.overview, 180)}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent" />
    </header>
  );
};

export default Banner;
