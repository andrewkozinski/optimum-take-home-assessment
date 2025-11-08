"use client";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, TimeFrame, splitMovies } from "@/lib/movies";
import { Movie } from "@/types/movie";
import MovieCarousel from "./movie-carousel";

// This component displays a list of trending movies
export default function TrendingMoviesList({ timeFrame }: { timeFrame: TimeFrame }) {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrending() {
            try {
                const data = await fetchTrendingMovies(timeFrame);
                setMovies(data);
            }
            catch (error) {
                console.error("Error fetching trending movies: ", error);
                setMovies([]);
                setError((error as Error).message);
            }
        }
        fetchTrending();
    }, [timeFrame]);

    //const movieChunks = splitMovies(movies, 5);//Splits the movies into chunks of 5

    if(error) {
        return (
            <div className="justify-center items-center flex flex-col">
                <p>Error: {error}</p>
                <p className="text-red-1000">Error loading trending movies. Please try again later.</p>
            </div>

        )
    }

    if(movies.length === 0) {
        return <div>No trending movies found. Please try again later.</div>;
    }

    return (
        <div className="">
            <MovieCarousel movies={movies} />
        </div>
    );
}