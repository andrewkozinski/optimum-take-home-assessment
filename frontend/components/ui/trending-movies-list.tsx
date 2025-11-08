"use client";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, TimeFrame } from "@/lib/movies";
import { Movie } from "@/types/movie";

// This component displays a list of trending movies
export default function TrendingMovies() {
    
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchTrending() {
            const data = await fetchTrendingMovies(TimeFrame.WEEK);
            setMovies(data);
        }
        fetchTrending();
    }, []);

    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.id} className="mb-4 p-4 border rounded">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                </div>
            ))}
        </div>
    );
}