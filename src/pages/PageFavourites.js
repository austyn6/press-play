import { useSelector } from 'react-redux';
import MoviePoster from '../components/MoviePoster'; 
import NoFavs from '../components/NoFavs';

const PageFavourites = (onFavsPage) => {

    const favouriteItems = useSelector((state) => state.favs.items);

    return(
        <>
        <section className='fav-page'>
            <h1>Favourites</h1>
            <div className='favs-movie-container'>
                {favouriteItems.length === 0 ?
                 <NoFavs/> : favouriteItems.map(movie => <MoviePoster key={movie.id} movie={movie} onFavsPage={true} />)}
            </div>
        </section>
        <div className='side-fade fade-hide'></div>
        </>
    )
}

export default PageFavourites;