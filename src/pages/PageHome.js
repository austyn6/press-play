import {useEffect, useState} from 'react';
import SortFilter from '../components/SortFilter';
import MovieScrollerSection from '../components/MovieScrollerSection';
import {API_KEY} from '../globals/globals';
import Spotlight from '../components/Spotlight';

const PageHome = ({sort, sortURL, popChecked}) => {

    const [moviesData, setMoviesData] = useState(false);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState('Popular')

    const errorMessage = 'Oh no...Something went wrong...Please try again later.';

    
    useEffect(() => {

        const fetchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${sort}?api_key=${API_KEY}&language=en-US&page=1`)
                                    .catch(err => {
                                        moviesData !== false && setMoviesData(false);
                                        setError(errorMessage);
                                    })

            const data = await res.json();

            if(data.success === false){
                moviesData !== false && setMoviesData(false);
                error !== false && setError(false);
                setError(errorMessage);
            }else{
                error !== false && setError(false);
                const first12Movies = data.results.splice(0,12);
                setMoviesData(first12Movies);
            }

        }
        fetchMovies()

        switch(sort){
            case 'popular':
                setTitle('Popular');
                break;
            case 'top_rated':
                setTitle('Top Rated')
                break;
            case 'upcoming':
                setTitle('Upcoming')
                break;
            case 'now_playing':
                setTitle('Now Playing')
                break;
            default:
                setTitle('Popular')
        }

    }, [sort]);

    return(
        <>
        <SortFilter popChecked={popChecked} sort={sortURL} />
        <div className='home-page'>
        <h1>{title} Movies</h1>
        {error !== false && <p className="error">{error}</ p>}
        {moviesData !== false && <MovieScrollerSection moviesData={moviesData}/>}
        <Spotlight/>
        <div className='side-fade'></div>
        </div>
        </>
    )
}

export default PageHome;