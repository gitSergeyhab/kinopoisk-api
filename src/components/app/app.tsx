import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FilmsPage from '../_pages/films-page/films-page';
import OneFilmPage from '../_pages/one-film-page/one-film-page';

import 'nouislider/distribute/nouislider.css';


export const enum AppRoute {
  Films = 'films',
  Film = 'films/:id',
}


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Films} element={<FilmsPage/>}/>
        <Route path={AppRoute.Film} element={<OneFilmPage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
