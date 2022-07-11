import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { API_KEY } from '../globals/globals';
import SingleMovie from '../components/SingleMovie';

function PageSingleMovie() {
    const [movieData, setMovieData] = useState(false);
    
// this ID comes from the AppRouter.
    const { id } = useParams()

    //https://api.themoviedb.org/3/movie/414906?api_key=e2be774394fd67e79142c1318cddcc84&language=en-US
  
    useEffect(() => {
        const fetchMovie = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${ id }?api_key=${API_KEY}&language=en-US1&append_to_response=credits,release_dates,videos`);
               
            const data = await res.json();
            setMovieData(data);
        } 
          
          fetchMovie()
    }, [id])

  return (

    <section className="single-movie-container-page">
        {movieData !== false && <SingleMovie movie={movieData}/>}
    </section>

  )
}

export default PageSingleMovie

