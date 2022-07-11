import { useSelector } from 'react-redux';
import MoviePoster from '../components/MoviePoster'; 
import NoWatch from '../components/NoWatch';

const PageWatchLater = (onWatchPage) => {

    const watchLaterItems = useSelector((state) => state.watch.items);

    return(
        <>
        <section className='watch-page'>
            <h1>Watch Later</h1>
            <div className='watch-later-movie-container'>
            {watchLaterItems.length === 0 ?
                 <NoWatch/> : watchLaterItems.map(movie => <MoviePoster key={movie.id} movie={movie} onWatchPage={true} />)}
            </div>
        </section>
        <div className='side-fade fade-hide'></div>
        </>
    )
}

export default PageWatchLater;