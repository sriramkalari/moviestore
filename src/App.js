import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import './App.css';
import searchIcon from './images/search-icon-png.png'
//9a2ea5a4
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=9a2ea5a4';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data =  response.json();
    console.log(data)
    data.then((res) =>{
      
        setMovies(res.Search);
     
    });
    
  }

  return (
    <div className="app">
      <h1>MovieStore</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
