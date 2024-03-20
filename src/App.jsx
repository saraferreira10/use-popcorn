import { useEffect, useRef, useState } from 'react';
import Box from '../components/box/Box';
import Menu from '../components/menu/Menu';
import MovieCard from '../components/movie/MovieCard';
import './App.css';
import { useMovie } from './useMovie';

function App() {
  
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const {movies, isLoading} = useMovie(search);
  const resultFounds = movies.length;

  function handleSearch(input) {
    setSearch(input);
    setSelectedId(null);
  }

  function handleClick(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
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
            <Movie movie={movie} key={movie.imdbID} handleClick={handleClick} />
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
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, [])

  return <input type="text" name="search" id="search" className="search" ref={inputEl} value={search} onChange={(e) => handleSearch(e.target.value)} />
}

function Results({ num }) {
  return <small>Found <strong>{num}</strong> results</small>
}

export default App
