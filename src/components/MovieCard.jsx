import React from 'react';

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
  return (
    <div className='movie-card'>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : '/no-movie.png'} 
        alt={title} 
      />
      <div className="mt-4">
        <h3 className="text-white">{title}</h3>
      </div>
      <div className="content">
        <div className="rating">
          <img src="/star.svg" alt="Star Icon" />
          <p className="text-white">{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        </div>
        <span>•</span>
        <p className="text-white">{original_language}</p> 
        <span>•</span>        
        <p className="text-white">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
