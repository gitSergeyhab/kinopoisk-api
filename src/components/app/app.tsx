import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FilmsPage from '../_pages/films-page/films-page';
import OneFilmPage from '../_pages/one-film-page/one-film-page';

import 'nouislider/distribute/nouislider.css';
import Header from '../header/header';
import WatchedFilms from '../_pages/watched-films/watched-films';
import Footer from '../footer/footer';

import './app.css';
import PersonPage from '../_pages/person-page/person-page';

export const enum AppRoute {
  Films = '/films',
  Film = '/films/:id',
  Watched = '/watched',
  Persons = '/persons/:id',
}


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="black">
        <div className="wrapper">
          <Header/>
          <Routes>
            <Route path={AppRoute.Films} element={<FilmsPage/>}/>
            <Route path={AppRoute.Watched} element={<WatchedFilms/>}/>
            <Route path={AppRoute.Persons} element={<PersonPage/>}/>
            <Route path={AppRoute.Film} element={<OneFilmPage/>}/>
            <Route path='*' element={<div> НЕТ ТАКИХ</div>}/>
          </Routes>
        </div>
        <Footer/>
      </div>

    </BrowserRouter>

  );
}

export default App;
