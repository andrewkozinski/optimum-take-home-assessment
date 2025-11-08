import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';
import { MovieCard } from './movie-card';
import { Movie } from '@/types/movie';
import { splitMovies } from '@/lib/movies';

export default function MovieCarousel({ movies }: { movies: Movie[] }, chunkSize: number = 5) {

    const movieChunks = splitMovies(movies, chunkSize);

    return (
        <>
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
        </>
    );
}

