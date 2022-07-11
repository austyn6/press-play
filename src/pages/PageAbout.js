import logo from '../images/logo.svg';
import tmdblogo from '../images/movie-db.svg';
import { FaTiktok, FaTwitter, FaFacebook, FaInstagram, FaYoutubeSquare } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { getYear } from '../globals/globals';
import { backdrops } from '../globals/backdrops';
import { useEffect, useState } from 'react';
import { API_KEY } from "../globals/globals";

const PageAbout = () => {

    const [movieBackdrop, setMovieBackdrop] = useState("");

    const backdropUrl = "https://image.tmdb.org/t/p/w1280"

    useEffect(() => {

        const fetchMovieBackdrops = async () => {
                const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
                const data = await res.json();
                // console.log(data)
                const randomBackdrop = data.results[Math.floor(Math.random()*data.results.length)].backdrop_path
                setMovieBackdrop(backdropUrl+randomBackdrop);
                // https://image.tmdb.org/t/p/w1280/A3bsT0m1um6tvcmlIGxBwx9eAxn.jpg
        }
        fetchMovieBackdrops()

    }, []);

    // console.log(movieBackdrop);

    return(
        <>
        <section className='about-page'>
                    <h2>Welcome to</h2>
            <div className='about-wrapper'>
                <div className='section-title'>
                
                    <img src={logo} className='logo' alt='Press Play Logo' />
                    {/* <hr/> */}
                </div>
                <div>

                    <p>The site where you can view all your favourite movies in one place... <br/>and find new ones to watch</p>
                    <p>Browse popular, now playing and upcoming movies.<br/> Favourite and save the ones you like. Watch trailers, view info, and much, much more!</p>
                </div>   
                <div className='about-socials'>
                    <IconContext.Provider value={{size: 35 }}>
                    <a href='https://www.facebook.com'><FaFacebook className='fa-icon'/></a>
                    <a href='https://www.twitter.com'><FaTwitter className='fa-icon'/></a>
                    <a href='https://www.tiktok.com'><FaTiktok className='fa-icon'/></a>
                    <a href='https://www.instagram.com'><FaInstagram className='fa-icon'/></a>
                    <a href='https://www.youtube.com'><FaYoutubeSquare  className='fa-icon'/></a>
                    </IconContext.Provider>
                </div>
                <div>
                    <p>If you like this site, like and share on all the socials!</p>
                </div>
                <div className='about-about'>
                    <h1>About</h1>
                    <p>This site uses the TMDb API but is not endorsed or certified by TMDb.</p>
                    <img src={tmdblogo} className='tmbd' alt='Movie Database Logo' />
                    <h2>The Team</h2>
                    <p>Press Play was designed by Austyn Philpott <br/>and coded by Austyn Philpott and Adam Hauck.</p>
                    <p>&copy; {getYear()} Austyn Philpott.</p>
                </div>
            </div>
                {/* <img src={backdrops[Math.floor(Math.random()*backdrops.length)].link} className='about-bg' alt='Movie Database Logo' /> */}
        </section>
        {movieBackdrop && <img src={movieBackdrop} className='about-bg' alt='Movie Database Logo' />}
        </>
    )
   
}

export default PageAbout;