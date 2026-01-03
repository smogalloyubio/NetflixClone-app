
import { GoogleGenAI, Type } from "@google/genai";
import { Movie, Genre } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const movieSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      title: { type: Type.STRING },
      overview: { type: Type.STRING },
      backdrop_path: { type: Type.STRING, description: "A seed number for picsum photos, e.g. '101'" },
      poster_path: { type: Type.STRING, description: "A seed number for picsum photos, e.g. '102'" },
      vote_average: { type: Type.NUMBER },
      release_date: { type: Type.STRING },
    },
    required: ["id", "title", "overview", "backdrop_path", "poster_path", "vote_average", "release_date"]
  }
};

export const fetchMoviesByGenre = async (genre: Genre): Promise<Movie[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a list of 10 fictional but realistic movie objects for the genre: "${genre}". 
      Each movie must have a unique ID, a compelling title, a detailed 2-sentence overview, 
      random numeric seeds (1-1000) for backdrop_path and poster_path, a vote average from 1-10, 
      and a release date between 2010 and 2024.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: movieSchema,
      },
    });

    const movies = JSON.parse(response.text) as Movie[];
    
    // Transform paths into actual URLs using picsum placeholders
    return movies.map(movie => ({
      ...movie,
      backdrop_path: `https://picsum.photos/seed/${movie.backdrop_path}/1280/720`,
      poster_path: `https://picsum.photos/seed/${movie.poster_path}/500/750`,
    }));
  } catch (error) {
    console.error(`Error fetching movies for ${genre}:`, error);
    return [];
  }
};

export const fetchAllRows = async (): Promise<{ title: Genre; movies: Movie[] }[]> => {
  const genres = Object.values(Genre);
  const results = await Promise.all(
    genres.map(async (genre) => {
      const movies = await fetchMoviesByGenre(genre);
      return { title: genre, movies };
    })
  );
  return results;
};
