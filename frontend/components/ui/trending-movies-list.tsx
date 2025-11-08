"use client";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, TimeFrame } from "@/lib/movies";
import { Movie } from "@/types/movie";
import Image from "next/image";

// This component displays a list of trending movies
export default function TrendingMoviesList({ timeFrame }: { timeFrame: TimeFrame }) {
    
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchTrending() {
            const data = await fetchTrendingMovies(timeFrame);
            setMovies(data);
        }
        fetchTrending();
    }, [timeFrame]);
    
    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.id} className="mb-4 p-4 border rounded">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <Image src={movie.poster_path} alt={movie.title} width={100} height={150} />
                </div>
            ))}
        </div>
    );
}