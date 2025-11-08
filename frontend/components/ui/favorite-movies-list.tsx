"use client";
import { useEffect, useState } from "react";
import { getFavoriteMovies } from "@/lib/favorites";
import { fetchMovieDetails, splitMovies } from "@/lib/movies";
import { Movie } from "@/types/movie";
import { Carousel, CarouselContent, CarouselItem, CarouselNext,CarouselPrevious } from "./carousel";
import { MovieCard } from "./movie-card";


export default function FavoriteMoviesList() {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const favoriteMovies = getFavoriteMovies();

        //For each movie ID in favoriteMovies, fetch the movie details from TMDB API
        const movieDetails = favoriteMovies.map(id => fetchMovieDetails(id.toString()));

        Promise.all(movieDetails)
            .then(movies => setMovies(movies))
            .catch(error => console.error("Error fetching favorite movies: ", error));

    }, []);

    if(movies.length === 0) {
        return <div>No movies favorited. Favorite a movie and it will appear here!</div>;
    }

    const movieChunks = splitMovies(movies, 5);//Splits the movies into chunks of 3

    return (
        <div>

            <Carousel>
                <CarouselContent>
                    {movieChunks.map((chunk, index) => (
                        <CarouselItem key={index}>
                            <div 
                                className="flex flex-wrap gap-4 p-4 justify-center items-center"
                                //style={{gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'}}
                            >
                                {chunk.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    );
}