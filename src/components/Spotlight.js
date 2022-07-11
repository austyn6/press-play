import {useEffect, useState} from 'react';
import {API_KEY} from '../globals/globals';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Importing Libraries
import { addItem, deleteItem } from '../features/favs/favsSlice';
import { addWatchItem, deleteWatchItem } from '../features/watch/watchSlice';

// Importing Images
import moreInfoButton from '../images/more-info-button.svg';
import moreInfoButtonHover from '../images/more-info-button-hover.svg';
import inFavsIcon from '../images/is-fav-icon.svg';
import addFavButton from '../images/add-fav-button.svg';
import addFavButtonHover from '../images/add-fav-button-hover.svg';
import addWatchButton from '../images/add-watch-button.svg';
import addWatchButtonHover from '../images/add-watch-button-hover.svg';
import inWatchIcon from '../images/is-watch-icon.svg';

const Spotlight = (movie, onFavsPage, onWatchPage) => {

    const favouriteItems = useSelector((state) => state.favs.items);
    const watchLater = useSelector((state) => state.watch.items);
    const dispatch = useDispatch();

    function inFav(id, arr){
        return arr.some(item => item.id === id);
    }

    function inWatch(id, arr){
        return arr.some(item => item.id === id);
    }

    const [spotlightData, setSpotlightData] = useState(false);
    
    useEffect(() => {
        const fetchSpotlight = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await res.json();
            const randomSpotlight = data.results[Math.floor(Math.random()*data.results.length)]
            console.log(randomSpotlight)
            // const randomSpotlightOverview = data.results[Math.floor(Math.random()*data.results.length)]
            // const randomSpotlightBackdrop = data.results[Math.floor(Math.random()*data.results.length)].backdrop_path
            // console.log(randomSpotlight)
            setSpotlightData(randomSpotlight);
            // https://image.tmdb.org/t/p/w1280/A3bsT0m1um6tvcmlIGxBwx9eAxn.jpg
        }
        fetchSpotlight()
    }, []);

    const spotlightTitle = new String(spotlightData.title);
    const spotlightOverview = new String(spotlightData.overview);

    return(
    <section className='spotlight'>
        <div className='spotlight-info'>
            <h3>Spotlight Feature:</h3>
            <h2>{spotlightTitle.length > 27 ? `${spotlightTitle.substring(0, 27)}...` : spotlightTitle}</h2>

            {/* <p>{spotlightData.overview}</p> */}
            <p>{spotlightOverview.length > 225 ? `${spotlightOverview.substring(0, 225)}...` : spotlightOverview}</p>
        </div>
            <div className='spotlight-buttons'>
                <div className='spot-more-info-container'>
                    <Link to={`/movie/${spotlightData.id}`}>
                        <img src={moreInfoButton} className='spot-more-info-display' alt='More Info Button' />
                        <img src={moreInfoButtonHover} className='spot-more-info-overlay' alt='More Info Button' />
                    </Link>
                </div>
                <div className='fav-button'>
                    {(onFavsPage === true || inFav(spotlightData.id, favouriteItems) === true ) ? 
                            <div className='is-favs-icon' onClick={() => dispatch(deleteItem(spotlightData))}><img src={inFavsIcon} alt='Remove From Favourites' /></div> : 
                            <div className='add-fav-icon-container' onClick={() => dispatch(addItem(spotlightData))}><img src={addFavButton} className='add-fav-display' alt='Add To Favs' /><img src={addFavButtonHover} className='add-fav-overlay' alt='Add To Favs' /></div>
                    }
                </div>
                <div className='watch-button'>
                    {(onWatchPage === true || inWatch(spotlightData.id, watchLater) === true ) ? 
                            <div className='is-watch-icon' onClick={() => dispatch(deleteWatchItem(spotlightData))}><img src={inWatchIcon} alt='Remove From Watch Later'/></div> : 
                            <div className='add-watch-icon-container' onClick={() => dispatch(addWatchItem(spotlightData))}><img src={addWatchButton} className='add-watch-display' alt='Add To Watch' /><img src={addWatchButtonHover} className='add-watch-overlay' alt='Add To Watch' /></div>
                    }
                </div>
            </div>
        <img src={"https://image.tmdb.org/t/p/w1280"+spotlightData.backdrop_path} className='spotlight-bg' alt='Spotlight Feature Movie Backdrop' />
    </section>
    )
}

export default Spotlight;