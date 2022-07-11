import { useSelector } from 'react-redux';
import MoviePoster from './MoviePoster';

function MovieScrollerSection({moviesData}){

    const favs = useSelector((state) => state.favs.items);

    return (
        <div className='movies-container'>
            {moviesData.map(movie => <MoviePoster key={movie.id} movie={movie}/>)}
            <article className='movie-poster-blank'></article>
        </div>
      )
}

export default MovieScrollerSection;