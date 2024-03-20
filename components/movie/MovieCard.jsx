import { useEffect, useState } from "react";
import "../movie/movie_card.css"

const KEY = "fb260a76";

export default function Movie({ id }) {

    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchMovie() {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
            const data = await res.json();

            console.log(data);
            setMovie(data);
            setIsLoading(false);

        }

        fetchMovie();
    }, [])

    return (
        <div>
            {movie !== null && !isLoading &&
                <>
                    <div className="box_top">
                        <div>
                            <img src={movie.Poster} alt={`imagem do filme ${movie.Title}`} height={"200px"} width={"130px"} />
                        </div>
                        <div className="box_info">
                            <h3>{movie.Title}</h3>
                            <p>{movie.Released} - {movie.Runtime}</p>
                            <p>{movie.Genre}</p>
                            <p>⭐ {movie.imdbRating} IMDB Rating</p>
                        </div>
                    </div>

                    <div className="box_summary">
                        <p>{movie.Plot}</p>
                        <p>Starring: {movie.Actors}</p>
                        <p>Awards: {movie.Awards}</p>
                    </div>
                </>

            }

            {isLoading && <p>Loading...</p>}
        </div>
    )
}