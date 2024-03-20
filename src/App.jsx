import { useEffect, useState } from 'react';
import Box from '../components/box/Box';
import Menu from '../components/menu/Menu';
import MovieCard from '../components/movie/MovieCard';
import './App.css';

function App() {

  const KEY = "fb260a76";
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("marvel");
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const resultFounds = movies.length;

  useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${search}`);
      const data = await res.json();

      if (data.Response === "True" && data.Search) {
        console.log(data.Search)
        setMovies(data.Search);
      } else {
        setMovies([]);
      }

      setIsLoading(false);
    }

    fetchMovies();
  }, [search])

  function handleSearch(input){
    setSearch(input);
    setSelectedId(null);
  }

  return (
    <div className='app'>
      <Menu>
        <Search search={search} handleSearch={handleSearch} />
        <Results num={resultFounds} />
      </Menu>

      <main>
        <Box width='25rem' height='fit-content' alignItems='center' justifyContent='center' flexDirection='column' padding='0' gap='0' minHeight='100px'>
          {!isLoading && movies.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} handleClick={setSelectedId} />
          ))}

          {isLoading && <p>Loading...</p>}
          {!isLoading && search.length === 0 && movies.length === 0 && <p>search a movie...</p>}
          {!isLoading && search.length > 0 && movies.length === 0 && <p>movie not found :(...</p>}
        </Box>

        <Box width='25rem' height='fit-content' minHeight='100px' flexDirection='column' justifyContent='flex-start' padding='0'>
          {selectedId !== null && <MovieCard id={selectedId} key={selectedId} />}
        </Box>
      </main>
    </div>
  )
}

function Movie({ movie, handleClick }) {
  return (
    <li className='movie_item' onClick={() => handleClick(movie.imdbID)}>
      <div style={{ width: "20%" }}>
        <img src={movie.Poster} alt={`Imagem do filme ${movie.Title}`} height={"90px"} width={"65px"} />
      </div>
      <div style={{ width: "80%" }}>
        <h3>{movie.Title}</h3>
        <p>📅 {movie.Year}</p>
        <p style={{ textTransform: "capitalize" }}>🎥 {movie.Type}</p>
      </div>
    </li>
  )
}

function Search({ search, handleSearch }) {
  return <input type="text" name="search" id="search" className="search" value={search} onChange={(e) => handleSearch(e.target.value)} />
}

function Results({ num }) {
  return <small>Found <strong>{num}</strong> results</small>
}

export default App
