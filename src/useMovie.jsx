import { useEffect, useState } from "react";

const KEY = "fb260a76";

export function useMovie(search = null, id = null) {

    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(function () {
        async function fetchMovies() {
            setIsLoading(true);
            const url = id !== null ? `http://www.omdbapi.com/?apikey=${KEY}&i=${id}` : `http://www.omdbapi.com/?apikey=${KEY}&s=${search}`;

            const res = await fetch(url);
            const data = await res.json();

            if (id !== null) {
                console.log(data);
                setMovies(data);
                setIsLoading(false);
                return;
            }

            if (data.Response === "True" && data.Search) {
                console.log(data.Search)
                setMovies(data.Search);
            } else {
                setMovies([]);
            }

            setIsLoading(false);
        }

        fetchMovies();
    }, [search, id])

    return { movies, isLoading }
}