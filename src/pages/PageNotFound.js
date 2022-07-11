import { useEffect, useState } from 'react';
import { API_KEY } from "../globals/globals";
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.svg';
import logoHover from '../images/logo-hover.svg';

const PageNotFound = () => {

    const [movieBackdrop, setMovieBackdrop] = useState("");

    const backdropUrl = "https://image.tmdb.org/t/p/w1280";

    useEffect(() => {

        const fetchMovieBackdrops = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
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
        <section className='error-page'>
                <h1>404 Error!</h1>
                <h2>Something has<br/>gone wrong!</h2>
                <p>We can't find the page you're looking for. <br/>Please go home!</p>
                <NavLink to="/">
                    <div className='error-button-container'>
                        <img src={logo} className='error-button-display' alt='error Button' />
                        <img src={logoHover} className='error-button-overlay' alt='error Button' />
                    </div>
                </NavLink>

        </section>
        {movieBackdrop && <img src={movieBackdrop} className='no-favs-bg' alt='Movie Database Logo' />}
        </>
    )
}

export default PageNotFound;