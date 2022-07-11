import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';

import '../scss/styles.scss';

import Header from '../components/Header';

import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavourites from '../pages/PageFavourites';
import PageWatchLater from '../pages/PageWatchLater';
import PageMoreInfo from '../pages/PageMoreInfo'
import PageNotFound from '../pages/PageNotFound';
import PageSearch from '../pages/PageSearch'


function AppRouter() {

  return (
    <BrowserRouter basename='press-play'>
      <div className="site-wrapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PageHome  sort='popular' popChecked={true} />} />

          <Route path="/sort/popular" element={<PageHome sort='popular' sortURL='popular' popChecked={true} />} />
          <Route path="/sort/top-rated" element={<PageHome  sort='top_rated' sorURL='top-rated' popChecked={false} />} />
          <Route path="/sort/upcoming" element={<PageHome  sort='upcoming' sortURL='upcoming' popChecked={false} />} />
          <Route path="/sort/now-playing" element={<PageHome  sort='now_playing' sortURL='now-playing' popChecked={false} />} />

          <Route path='/about' element={<PageAbout />} />
          <Route path='/favourites' element={<PageFavourites />} />
          <Route path='/watch-later' element={<PageWatchLater />} />
          <Route path='/movie/:id' element={<PageMoreInfo />} />
          <Route path='/search' element={<PageSearch />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </main>
      </div>
    </BrowserRouter>
  );
  
}

export default AppRouter;
