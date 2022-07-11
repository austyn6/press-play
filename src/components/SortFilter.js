import { useEffect, useState } from 'react';
import {NavLink, useNavigate, useLocation } from 'react-router-dom';

function SortFilter({popChecked, sort}) {

    let navigate = useNavigate();
    let location = useLocation();

    // console.log(location);

    const [checkState, setCheckState] = useState({ 
        ["popular"]: false,
        ["top-rated"]: false,
        ["upcoming"]: false,
        ["now-playing"]: false,
        [sort]: true
     })

    function handleSort(e){
        setCheckState({
            ["popular"]: false,
            ["top-rated"]: false,
            ["upcoming"]: false,
            ["now-playing"]: false,
            [`${e.target.value}`]: true,
            
        })
        navigate(`/sort/${e.target.value}`, { replace: true });
    }

    useEffect(()=> {
        // console.log('popular checked changed...' + ' ' + popChecked)
        if(popChecked === true){
            setCheckState({
                ["popular"]: true,
                ["top-rated"]: false,
                ["upcoming"]: false,
                ["now-playing"]: false
            })
        }
    }, [popChecked]);

    return(
        <div className='sub-nav'>
            <fieldset>
                
                <div className="radio-btn">
                

                    
                <label className="switch">
                <span className='switch-title'>Popular</span>
                    <input type="radio" id="popular" name="sort" value="popular" checked={checkState["popular"]} onChange={handleSort} />
                    <span className="slider round"></span>
                </label>
                </div>
                

                <div>
                
 
                <label className="switch">
                <span className='switch-title'>Top Rated</span>
                <input type="radio" id="top-rated" name="sort" value="top-rated" checked={checkState["top-rated"]} onChange={handleSort} />
                <span className="slider round"></span>
                </label>
                </div>

                
                <div>
               
  
                <label className="switch">
                <span className='switch-title'>Upcoming</span>
                <input type="radio" id="upcoming" name="sort" value="upcoming" checked={checkState["upcoming"]} onChange={handleSort} />
                <span className="slider round"></span>
                </label>
                </div>


                
                <div>
                
 
                <label className="switch">
                <span className='switch-title'>Now Playing</span>
                <input type="radio" id="now-playing" name="sort" value="now-playing" checked={checkState["now-playing"]} onChange={handleSort} />
                <span className="slider round"></span>
                </label>
                </div>
              
            </fieldset>
    </div>
    )
}

export default SortFilter;