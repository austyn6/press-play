import {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import {API_KEY} from '../globals/globals';
import SearchScrollerSection from '../components/SearchScrollerSection';


function PageSearch(searchInput) {
    const [searchData, setSearchData] = useState(false);
    const [searchError, setSearchError] = useState(false);

    const searchParamsArray = useSearchParams()
    const searchParams = searchParamsArray[0];

    const searchErrorMessage = 'Oh no...Something went wrong...Please try again later.';

    let query = searchParams.get('q');
        query = encodeURIComponent(query);

    useEffect(() => {

        

        // console.log(query);

        const fetchSearchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
                                    .catch(err => {
                                        searchData !== false && setSearchData(false);
                                        setSearchError(searchErrorMessage);
                                    })

            const data = await res.json();

            if(data.success === false){
                searchData !== false && setSearchData(false);
                searchError !== false && setSearchError(false);
                setSearchError(searchErrorMessage);
            }else{
                searchError !== false && setSearchError(false);
                const first12Movies = data.results.splice(0,20);
                setSearchData(first12Movies);
            }

        }
        fetchSearchMovies()
    }, [query])

    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=${ search query here }&page=1&include_adult=false

    return (
        <div className='search-page'>
        <h1>Search</h1>
        {searchError !== false && <p className="error">{searchError}</p>}
        {searchData !== false && <SearchScrollerSection searchData={searchData}/>}
        </div>
    )

}

export default PageSearch