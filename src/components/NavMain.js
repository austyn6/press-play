import {NavLink, Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar'
// import SearchMenu from '../components/SearchMenu';
import headerLeft from '../images/header-left.svg';
import headerRight from '../images/header-right.svg';
import logo from '../images/logo.svg';
import logoHover from '../images/logo-hover.svg';
import searchIcon from '../images/search-icon.svg';
import searchIconHover from '../images/search-icon-hover.svg';
import dot from '../images/dot.svg';


const NavMain = (movie) => {

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

    function showHideSearch() {
        setSearchOpen(!searchOpen)
    }

    return(
        <>
        <section className='header-wrapper'>
            <img src={headerLeft} className='header-left' alt='Header Background' />
                <nav className='header-nav'>
                    <ul>
                        <li><NavLink to="/">
                            <div className='home-button-container'>
                            <img src={logo} className='home-button-display' alt='Home Button' />
                            <img src={logoHover} className='home-button-overlay' alt='Home Button' />
                            </div>
                        </NavLink></li>
                        <li className='hide'><NavLink to="/about">About</NavLink></li>
                        <img src={dot} className='dot' alt='dot' />
                        <li className='hide'><NavLink to="/favourites">Favourites</NavLink></li>
                        <img src={dot} className='dot' alt='dot' />
                        <li className='hide'><NavLink to="/watch-later">Watch Later</NavLink></li>
                        <img src={dot} className='dot' alt='dot' />
                        <div className='sb-hide'>
                        <SearchBar/>
                        </div>
                        <li className='search-button-large'>
                            <img src={searchIcon} className='search-icon' alt='Search Button' />
                            <img src={searchIconHover}  className='search-icon-hover'
                                                        alt='Search Button' 
                                                        onClick={() => showHideSearch()}
                                                        onMouseDown={(e) => { e.preventDefault(); }}/>
                        </li>
                    </ul>
                </nav>
            <img src={headerRight} className='header-right' alt='Header Background' />
        </section>
        <div className={searchOpen ? 'search-show' : 'search-hide'}>   
            <div className='search-nav'>
            <SearchBar/>
            </div>
        </div>
                </>
    )
}

export default NavMain;