// MovieSearch.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search for movies when query changes
  useEffect(() => {
    const searchMovies = async () => {
      if (query.length < 3) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/search`, {
          params: { query },
        });
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent too many requests
    const timeoutId = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Get recommendations when a movie is selected
  const getRecommendations = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/recommend`, {
        params: { movie_id: movieId },
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    getRecommendations(movie.movieId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movie Recommendation System</h1>

      {/* Search input */}
      <div className="mb-6">
        <label htmlFor="movie-search" className="block text-lg mb-2">
          Search for a movie:
        </label>
        <input
          id="movie-search"
          type="text"
          className="w-full p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
        />
      </div>

      {/* Search results */}
      {query.length >= 3 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
          {loading && query ? (
            <p>Loading...</p>
          ) : searchResults.length > 0 ? (
            <ul className="border rounded divide-y">
              {searchResults.map((movie) => (
                <li
                  key={movie.movieId}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMovieSelect(movie)}
                >
                  <p className="font-medium">{movie.title}</p>
                  <p className="text-sm text-gray-600">{movie.genres}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies found</p>
          )}
        </div>
      )}

      {/* Selected movie */}
      {selectedMovie && (
        <div className="mb-6 p-4 bg-blue-50 rounded">
          <h2 className="text-xl font-semibold mb-2">Selected Movie:</h2>
          <p className="text-lg font-medium">{selectedMovie.title}</p>
          <p className="text-gray-600">{selectedMovie.genres}</p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recommendations:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((movie) => (
              <div
                key={movie.movieId}
                className="border rounded p-4 hover:shadow-md"
              >
                <h3 className="font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.genres}</p>
                <p className="mt-2">
                  <span className="font-semibold">Score:</span>{" "}
                  {movie.score.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
