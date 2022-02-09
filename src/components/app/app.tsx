import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FilmsPage from '../_pages/films-page/films-page';
import OneFilmPage from '../_pages/one-film-page/one-film-page';

import 'nouislider/distribute/nouislider.css';
import Header from '../header/header';
import WatchedFilms from '../_pages/watched-films/watched-films';
import Footer from '../footer/footer';


export const enum AppRoute {
  Films = '/films',
  Film = '/films/:id',
  Watched = '/watched',
}


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="black">
        <Header/>
        <Routes>
          <Route path={AppRoute.Films} element={<FilmsPage/>}/>
          <Route path={AppRoute.Watched} element={<WatchedFilms/>}/>

          <Route path={AppRoute.Film} element={<OneFilmPage/>}/>
        </Routes>
        <Footer/>
      </div>

    </BrowserRouter>

  );
}

export default App;
