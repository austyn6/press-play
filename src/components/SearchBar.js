import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import searchIconWhite from '../images/search-icon-white.svg';




const SearchBar = (movie) => {

    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

    const searchItems = (searchValue) => {
        //searchValue = searchValue.replace(/ /g,'%')
        let uriEncodedSearchValue = encodeURIComponent(searchValue);
        // console.log(uriEncodedSearchValue);
        setSearchInput(uriEncodedSearchValue);
    }

    function submitSearch(e){
        e.preventDefault();
        if(searchInput === ''){
            return;
        }
        e.target.elements.search.value = '';
        navigate(`/search?q=${searchInput}`, { replace: true })
        
    }

    return(
        
            <div className='search-wrapper'>
                <form action="#" onSubmit={submitSearch}>
                <label htmlFor="search" className='sr-only'>Search: </label>
                <input className='search-bar' type="text" placeholder="Search.." id="search" name="search" onChange={(e) => searchItems(e.target.value)} />
                    <button className='search-bttn' type="submit">
                        <img src={searchIconWhite} className='search-white' alt='Search' />
                        <span className='sr-only'>Search</span>
                    </button>
                </form>
            </div>
    )
}

export default SearchBar;