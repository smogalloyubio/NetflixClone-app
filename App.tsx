
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MovieRow from './components/MovieRow';
import MovieDetailsModal from './components/MovieDetailsModal';
import { fetchAllRows } from './services/geminiService';
import { Movie, Genre } from './types';

const App: React.FC = () => {
  const [rows, setRows] = useState<{ title: Genre; movies: Movie[] }[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const movieRows = await fetchAllRows();
        setRows(movieRows);
        
        // Set a random movie from the Trending row as featured
        const trendingRow = movieRows.find(row => row.title === Genre.Trending);
        if (trendingRow && trendingRow.movies.length > 0) {
          const randomIdx = Math.floor(Math.random() * trendingRow.movies.length);
          setFeaturedMovie(trendingRow.movies[randomIdx]);
        }
      } catch (error) {
        console.error("Failed to load movie data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#141414] text-red-600">
        <div className="animate-pulse flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">NETFLIX</h1>
          <div className="w-12 h-12 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#141414] overflow-x-hidden">
      <Navbar />
      
      <main>
        <Banner 
          movie={featuredMovie} 
          onInfoClick={handleMovieClick} 
        />
        
        <div className="relative -mt-32 md:-mt-48 z-20 pb-20">
          {rows.map((row, index) => (
            <MovieRow 
              key={row.title}
              title={row.title}
              movies={row.movies}
              isLarge={row.title === Genre.Originals}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>
      </main>

      <footer className="px-4 md:px-12 py-10 border-t border-gray-800 text-gray-500 text-sm">
        <div className="flex space-x-6 mb-8">
          <span className="cursor-pointer hover:underline">FAQ</span>
          <span className="cursor-pointer hover:underline">Help Center</span>
          <span className="cursor-pointer hover:underline">Terms of Use</span>
          <span className="cursor-pointer hover:underline">Privacy</span>
        </div>
        <p>&copy; 1997-2024 Netflix, Inc. (Gemini AI Demo)</p>
      </footer>

      <MovieDetailsModal 
        movie={selectedMovie} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default App;
