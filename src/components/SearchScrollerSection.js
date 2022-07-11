import { useSelector } from 'react-redux';
import MoviePoster from './MoviePoster';

function SearchScrollerSection({searchData}){

    const favs = useSelector((state) => state.favs.items);

    return (
        <div className='movies-container'>
            {searchData.map(movie => <MoviePoster key={movie.id} movie={movie}/>)}
        </div>
      )
}

export default SearchScrollerSection;