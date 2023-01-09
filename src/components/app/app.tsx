import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FilmsPage from '../_pages/films-page/films-page';
import OneFilmPage from '../_pages/one-film-page/one-film-page';

import 'nouislider/distribute/nouislider.css';
import Header from '../header/header';
import WatchedFilms from '../_pages/watched-films/watched-films';
import Footer from '../footer/footer';

import './app.css';
import PersonPage from '../_pages/person-page/person-page';
import styled from 'styled-components';
import { Error } from '../error/error';

export const enum AppRoute {
  Main = '/',
  Films = '/films',
  Film = '/films/:id',
  Watched = '/watched',
  Persons = '/persons/:id',
}


const Main = styled.main`
  min-width: 320px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding-bottom: 160px;

`;

const Wrapper = styled.div`
  width: 100%;
	min-height: 100%;
  position: relative;
  background-color: #000000;


  & * {
    box-sizing: border-box;
  }
`;


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header/>
        <Main>
          <Routes>
            <Route path={AppRoute.Main} element={<FilmsPage/>}/>

            <Route path={AppRoute.Films} element={<FilmsPage/>}/>
            <Route path={AppRoute.Watched} element={<WatchedFilms/>}/>
            <Route path={AppRoute.Persons} element={<PersonPage/>}/>
            <Route path={AppRoute.Film} element={<OneFilmPage/>}/>

            <Route path='*' element={<Error message='Нет такой страницы'/>}/>
          </Routes>
        </Main>
        <Footer/>
      </Wrapper>
    </BrowserRouter>

  );
}

export default App;
