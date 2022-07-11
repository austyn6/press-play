import {useState, useEffect} from 'react';
import SearchBar from './SearchBar';

function SearchBar() {

    const [searchOpen, setSearchOpen] = useState(false)

    // useEffect(() => {
    //     let mediaQuery = window.matchMedia('(min-width:850px)')
    //     mediaQuery.addEventListener('change', desktopOpen)

    // }, [])

    // const desktopOpen = (e) => { 
    //     if(e.matches)
    //     setSearchOpen(false);
    // }

    function showHideSearch() {
        setSearchOpen(!searchOpen)
    }

    return(    
        <>
            <SearchBar/>
        </>
    )
}

export default SearchBar;