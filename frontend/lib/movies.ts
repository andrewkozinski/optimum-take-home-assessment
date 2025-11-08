export enum TimeFrame {
    DAY = "day",
    WEEK = "week"
}

/**
 * Helper function to fetch trending movies
 * @param period - TimeFrame.DAY or TimeFrame.WEEK
 * @returns A promise that resolves to the list of trending movies
 */
export async function fetchTrendingMovies(period: TimeFrame) {
    const response = await fetch(`/api/trending/movie/${period}`);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.error ? `Failed to fetch trending movies. With Status: ${response.status}. Error Message: ${data.error}` : 'Failed to fetch trending movies');
    }

    return data;
}

/**
 * Helper function to fetch movie details by ID
 * @param id - TMDB API Movie ID
 * @returns Details of the movie
 */
export async function fetchMovieDetails(id: string) {
    const response = await fetch(`/api/movies/${id}`);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.error || 'Failed to fetch movie details');
    }

    return data;
}