import { tmdb } from "../api/tmdb";

export async function getPopularMovies() {
  try {
    const response = await tmdb.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    return [];
  }
}

export async function getPopularSeries() {
  try {
    const response = await tmdb.get("/tv/popular");
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar series populares:", error);
    return [];
  }
}

export async function getMoviesByGenre(genreId: number, page: number = 1) {
  const response = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
      page: page,
    },
  });

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}

export async function getSeriesByGenre(genreId: number, page: number = 1) {
  const response = await tmdb.get("/discover/tv", {
    params: {
      with_genres: genreId,
      page,
      language: "pt-BR",
    },
  });

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}

export async function searchMulti(query: string) {
  if (!query || query.trim() === "") return [];

  try {
    const response = await tmdb.get("/search/multi", {
      params: {
        query,
        language: "pt-BR",
        include_adult: false,
        page: 1,
      },
    });

    const filtered = (response.data.results || []).filter((item: any) => item.poster_path);
    return filtered;
  } catch (error) {
    console.error("Erro na busca:", error);
    return [];
  }
}