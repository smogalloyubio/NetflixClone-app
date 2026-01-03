
import React from 'react';
import { Movie } from '../types';
import { CloseIcon, PlayIcon } from './Icons';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm transition-opacity">
      <div 
        className="relative bg-[#181818] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#181818] rounded-full p-2 hover:bg-gray-700 transition"
        >
          <CloseIcon className="w-6 h-6 text-white" />
        </button>

        <div className="relative h-64 md:h-[450px]">
          <img 
            src={movie.backdrop_path} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-200 transition">
                <PlayIcon className="w-6 h-6" />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 grid md:grid-cols-[2fr_1fr] gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-green-500 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
              <span className="text-gray-400 border border-gray-600 px-1.5 text-xs rounded">HD</span>
              <span className="text-gray-400">{movie.release_date.split('-')[0]}</span>
            </div>
            <p className="text-lg leading-relaxed text-gray-200">
              {movie.overview}
            </p>
          </div>

          <div className="text-sm space-y-4">
            <div>
              <span className="text-gray-500">Genres: </span>
              <span className="text-gray-300">Action, Adventure, Fantasy</span>
            </div>
            <div>
              <span className="text-gray-500">Rating: </span>
              <span className="text-gray-300">{movie.vote_average} / 10</span>
            </div>
            <div className="pt-4 p-4 bg-zinc-900 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Director's Cut</p>
              <p className="text-gray-300 italic">"A visual masterpiece that redefines the genre." — CineReview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
