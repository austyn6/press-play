
//adding the import//
import {useEffect, useState} from 'react';
import ratingElement from '../images/rating-bar.svg';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../features/favs/favsSlice';
import { addWatchItem, deleteWatchItem } from '../features/watch/watchSlice';

//import images
import noPoster from '../images/no-movie-poster.jpg';
import addFavButton from '../images/add-fav-button.svg';
import addFavButtonHover from '../images/add-fav-button-hover.svg';
import isFavIcon from '../images/is-fav-icon.svg';
import inFavsIcon from '../images/is-fav-icon.svg';
import addWatchButton from '../images/add-watch-button.svg';
import addWatchButtonHover from '../images/add-watch-button-hover.svg';
import inWatchIcon from '../images/is-watch-icon.svg';
import trailerButton from '../images/trailer-button.svg';
import trailerButtonHover from '../images/trailer-button-hover.svg';

function SingleMovie({movie, onFavsPage, onWatchPage}) {


    const [trailerKey, setTrailerKey] = useState(false);
    const [rating, setRating] = useState(false);

    const favouriteItems = useSelector((state) => state.favs.items);
    const watchLater = useSelector((state) => state.watch.items);
    const dispatch = useDispatch();
 
    function inFav(id, arr){
        return arr.some(item => item.id === id);
    }

    function inWatch(id, arr){
        return arr.some(item => item.id === id);
    }

    useEffect(() => {
        const youTubeTrailer = movie.videos.results.find(element => (element.type === 'Trailer' && element.site === 'YouTube'));
        let movieRating = movie.release_dates.results.find(element => (element.iso_3166_1 === 'US'));
        // const MPAA = (movieRating.release_dates[0].certification);

        

        // if(MPAA === undefined || MPAA === ""){
        //     setRating('NA')
        // } else{
        //     setRating(MPAA);
        // }

        if(movieRating === undefined || movieRating === ""){
            setRating('NA')
        } else {
            setRating(movieRating.release_dates[0].certification);
        }
        

        if(youTubeTrailer === undefined){
            setTrailerKey('No Trailer Available')
        }else{
            setTrailerKey(youTubeTrailer.key);
        }
    }, []);


    // end of add

    let date = "";
    // error handling for release dates
    if (movie.release_date === undefined || movie.release_date === ""){
        date = 1999-12-31;
    } else {
        date = new Date(movie.release_date);
    }


    let ratingWidth = `${movie.vote_average * 10}%`
    // const date = new Date(movie.release_date);
    const formattedDate = format(date, "MMMM do, yyyy");
    let runTime = (movie.runtime);
    let hours = Math.floor(runTime /60);
    let minutes = runTime % 60;

    // console.log(movie.release_date,date,formattedDate);

    return (
        <div className='single-movie-page'>  
            <div className="single-movie-container">

                <div className='single-movie-poster'>

                    <div className='rating-circle'>{movie.vote_average}</div>
                    <div className='rating-bar' style={{ width: `${ratingWidth}` }}><span></span><img src={ratingElement} alt="rating" /></div>
                        {movie.poster_path === null ?
                            <img src={noPoster} alt="No Poster Available" /> :
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                        }
                    <div className='is-fav'>
                        {(onFavsPage === true || inFav(movie.id, favouriteItems) === true) && <img src={isFavIcon} alt="Movie is a fav" />}
                    </div>        
                </div>


                
                    <div className="single-movie-info">
                    <div className='desktop-rating-bar' style={{ width: `${ratingWidth}` }}><span></span><img src={ratingElement} alt="rating" /></div>
                        <div className="movie-info-section">
                            <div className="movie-info-details">

                                <p className="movie-rating-text">{rating}</p>
                                <p>{`${hours} h ${minutes} min`}</p>
                                <p>{formattedDate}</p>

                                <div className="details-genres">
                                    {movie.genres.map(genreList => <p key={genreList.id}>{genreList.name}</p>)}
                                </div>
                            </div>   


                            <h1>{movie.title}</h1>
                            <h3>{movie.tagline}</h3>

                            <div className='more-info-buttons'>
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

                                <div className='trailer-button'
                                onClick={()=> window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")}>
                                    <img src={trailerButton} alt='Watch Trailer' />
                                </div>
                            </div>

                           <p>{movie.overview}</p>
                        </div>
                    </div>
                
                <div className='cast-wrapper'>       
                    <h2>STARRING</h2>
                    <div className="cast-info">
                        
                        {movie.credits.cast.slice(0, 6).map(castList => 
                        <div className='cast-member' key={castList.id}>
                            {castList.profile_path === null ? 
                            <img src={noPoster} alt="No Poster Available" /> :
                            <img src={`https://image.tmdb.org/t/p/original/${castList.profile_path}`} alt={castList.name}/>}
                            <p  className='cast-name'>{castList.name}</p>
                            <p className='cast-role'>{castList.character}</p>
                        </div>
                        )}
                    </div>
                </div> 

            </div>      
        </div>
      )

}
export default SingleMovie