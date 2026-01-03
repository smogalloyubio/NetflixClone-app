
export interface Movie {
  id: string;
  title: string;
  name?: string; // Some are TV shows
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  first_air_date?: string;
  genre_ids: number[];
}

export interface MovieRowData {
  title: string;
  movies: Movie[];
  isLarge?: boolean;
}

export enum Genre {
  Trending = 'Trending Now',
  Originals = 'Netflix Originals',
  TopRated = 'Top Rated',
  Action = 'Action Movies',
  Comedy = 'Comedy Movies',
  Horror = 'Horror Movies',
  Romance = 'Romance Movies',
  Documentaries = 'Documentaries'
}
