import { useEffect, useState } from 'react';
import { API_KEY } from "../globals/globals";

import favExample from '../images/fav-example.png';

const NoFavs =() => {
    const [movieBackdrop, setMovieBackdrop] = useState("");

    const backdropUrl = "https://image.tmdb.org/t/p/w1280"

    useEffect(() => {

        const fetchMovieBackdrops = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
                const data = await res.json();
                // console.log(data)
                const randomBackdrop = data.results[Math.floor(Math.random()*data.results.length)].backdrop_path
                setMovieBackdrop(backdropUrl+randomBackdrop);
                // https://image.tmdb.org/t/p/w1280/A3bsT0m1um6tvcmlIGxBwx9eAxn.jpg
        }
        fetchMovieBackdrops()

    }, []);
    return(
        <>
        <section className='nofavs'>
            <div className='nofavs-info'>
            <h2>Oh no!</h2>
            <h3>You don't have any favourite movies!</h3>
            <p>Please return to the home page and add a favourite movie by clicking on the star icon.</p>
            </div>
            <img src={favExample} className='fav-example' alt='Favourites Example' />
        </section>

        {movieBackdrop && <img src={movieBackdrop} className='no-favs-bg' alt='Movie Database Logo' />}

        </>
    )
}

export default NoFavs;