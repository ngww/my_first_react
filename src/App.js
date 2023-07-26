import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// bf3a36c6

const API_URL = 'http://www.omdbapi.com?apikey=bf3a36c6'

const movie1 = {
    "Title": "Happy Feet",
    "Year": "2006",
    "imdbID": "tt0366548",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWU2NDkxYjktNWVlMS00MTM4LWJjMDAtOWYxZjJkZWFhYzAxXkEyXkFqcGdeQXVyMTA1NjE5MTAz._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('Happy Feet');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input 
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                 ? (
                    <div className='container'>
                        {movies.map((movie) => 
                        <MovieCard movie={movie}/>)}
                    </div>
                 ) :(
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                 )
            }

            
        </div>
    );
}

export default App;
