import { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` // If using a Bearer token for authentication
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]); // State to store movie data
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch movies from the TMDB API
  const fetchMovies = async () => {
    setIsLoading(true);  // Set isLoading to True
    setErrorMessage(''); // Reset any previous error message
    try {
      const response = await fetch(
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch movies');

      const data = await response.json();

      // If no movies are returned, set an error message
      if (data.results && data.results.length === 0) {
        setErrorMessage('No movies found.');
        setMovies([]);
        return;
      }

      setMovies(data.results || []); // Store the movie results in state if any
    } catch (error) {
      console.log(`Error Fetching Movies: ${error}`);
      setErrorMessage('Error Fetching Movies');
    } finally {
      setIsLoading(false);   // No Need to show the loading state anymore
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when the component mounts
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero" />
          <h1>
            Find your Favorite <span className="text-gradient">Movies without any hassle!</span>
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* Render the list of movies */}
        <section className="movie-list">
          <h2 className="mt-40px">All Movies</h2>

          {isLoading ? (
              <div className="text-white"> {/* Changed <p> to <div> */}
                <Spinner /> {/* Spinner Component */}
                <div role="status">Loading...</div>
              </div>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                 <MovieCard key={movie.id} movie={movie}/>  // Pass the id of the Movie to MovieCard component
                ))}
              </ul>
            )}

        </section>
      </div>
    </main>
  );
};

export default App;
