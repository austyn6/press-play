import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import hamIconOpen from '../images/ham-icon.svg';
import hamIconClose from '../images/ham-icon-close.svg';

function Hamburger() {

    const [hamOpen, setHamOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('');
    const [searchOpen, setSearchOpen] = useState(false)

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        // console.log(searchValue)
    }


    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width:850px)')
        mediaQuery.addEventListener('change', desktopOpen)

    }, [])

    const desktopOpen = (e) => { 
        if(e.matches)
        setHamOpen(false);
    }

    function showHideHam() {
        setHamOpen(!hamOpen)
    }

    return(    

        <div className='hamburger-wrapper' onClick={() => showHideHam()}>
        <div className={hamOpen ? 'ham-show' : 'ham-hide'}>
            <nav className='ham-nav'>
                <ul>
                    <li><NavLink to="/" onClick={() => showHideHam()}>Home</NavLink></li>
                    <li><NavLink to="/about" onClick={() => showHideHam()}>About</NavLink></li>
                    <li><NavLink to="/favourites" onClick={() => showHideHam()}>Favourites</NavLink></li>
                    <li><NavLink to="/watch-later" onClick={() => showHideHam()}>Watch Later</NavLink></li>
                </ul>
                <SearchBar/>
                <ul>
                    <h2>Sort</h2>
                    <li><NavLink to="/sort/popular" onClick={() => showHideHam()}>Popular </NavLink></li>
                    <li><NavLink to="/sort/top-rated" onClick={() => showHideHam()}>Top Rated</NavLink></li>
                    <li><NavLink to="/sort/upcoming" onClick={() => showHideHam()}>Upcoming</NavLink></li>
                    <li><NavLink to="/sort/now-playing" onClick={() => showHideHam()}>Now Playing</NavLink></li>
                </ul>
            </nav>
        </div>
        <div className='main-ham-btn'
                onClick={() => showHideHam()}
                onMouseDown={(e) => { e.preventDefault(); }}>
        <div className='ham-tab'>
            <img src={!hamOpen ? hamIconOpen : hamIconClose} alt='Open Hamburger Menu' />
        </div>
        </div>
    </div>
    )
}

export default Hamburger;