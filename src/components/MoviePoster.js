// Importing React Stuff
import { useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

// Importing Libraries
import $ from 'jquery';
import { addItem, deleteItem } from '../features/favs/favsSlice';
import { addWatchItem, deleteWatchItem } from '../features/watch/watchSlice';
import '../utilities/glitter';

// Importing Elements
import MoreInfoButton from './MoreInfoButton';

// Importing Images
import noPoster from '../images/no-movie-poster.jpg';
import isFavIcon from '../images/is-fav-icon.svg';
import inFavsIcon from '../images/is-fav-icon.svg';
import ratingElement from '../images/rating-bar.svg';
import addFavButton from '../images/add-fav-button.svg';
import addFavButtonHover from '../images/add-fav-button-hover.svg';
import addWatchButton from '../images/add-watch-button.svg';
import addWatchButtonHover from '../images/add-watch-button-hover.svg';
import inWatchIcon from '../images/is-watch-icon.svg';

function MoviePoster({movie, onFavsPage, onWatchPage}){

    const mcEl = useRef();
    const favouriteItems = useSelector((state) => state.favs.items);
    const watchLater = useSelector((state) => state.watch.items);
    const dispatch = useDispatch();
    const date = new Date(movie.release_date);
    const formattedDate = format(date, "MMMM do, yyyy");
 
    let ratingWidth = `${movie.vote_average * 10}%`

    function inFav(id, arr){
        return arr.some(item => item.id === id);
    }

    function inWatch(id, arr){
        return arr.some(item => item.id === id);
    }



    useEffect(() => {

       $(mcEl.current).sparkleh({
            color: "#0754FE",
            count: 300,
            overlap: 8,
            speed: 2.5
        })

    }, [])

    return (
        <article className='movie-card' ref={mcEl}>
            <div className='is-fav'>
                {(onFavsPage === true || inFav(movie.id, favouriteItems) === true) && <img src={isFavIcon} alt="Movie is a fav" />}
            </div>
            <div className='rating-circle'>{movie.vote_average}</div>
            <div className='rating-bar' style={{ width: `${ratingWidth}` }}><span></span><img src={ratingElement} alt="rating" /></div>
            <div className='movie-poster'>
                {movie.poster_path === 'null' ? <img src={noPoster} alt="No poster available" /> : <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />}
                <div className="movie-title">
                    <h2>{movie.title.length > 31 ? `${movie.title.substring(0, 31)}...` : movie.title}</h2>
                </div>
            </div>

            <div className='movie-overlay'>
                <h2>{movie.title}</h2>
                <h3>{formattedDate}</h3>
                <p>{movie.overview.length > 480 ? `${movie.overview.substring(0, 470)} . . .` : movie.overview}</p>

                <div className='poster-buttons'>
                    <Link to={`/movie/${movie.id}`}>
                    <MoreInfoButton />
                    </Link>
                    
                    <div className='fav-button'>
                    {(onFavsPage === true || inFav(movie.id, favouriteItems) === true ) ? 
                            <div className='is-favs-icon' onClick={() => dispatch(deleteItem(movie))}><img src={inFavsIcon} alt='Remove From Favourites' /></div> : 
                            <div className='add-fav-icon-container' onClick={() => dispatch(addItem(movie))}><img src={addFavButton} className='add-fav-display' alt='Add To Favs' /><img src={addFavButtonHover} className='add-fav-overlay' alt='Add To Favs' /></div>
                    }
                    </div>

                    <div className='watch-button'>
                    {(onWatchPage === true || inWatch(movie.id, watchLater) === true ) ? 
                            <div className='is-watch-icon' onClick={() => dispatch(deleteWatchItem(movie))}><img src={inWatchIcon} alt='Remove From Watch Later'/></div> : 
                            <div className='add-watch-icon-container' onClick={() => dispatch(addWatchItem(movie))}><img src={addWatchButton} className='add-watch-display' alt='Add To Watch' /><img src={addWatchButtonHover} className='add-watch-overlay' alt='Add To Watch' /></div>
                    }
                    </div>

                </div>
            </div>
            
        </article>
      )
}

MoviePoster.defaultProps = {
    onFavsPage: false,
    onWatchPage: false,
}

export default MoviePoster;