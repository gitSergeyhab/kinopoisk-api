import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetOneFilmQuery } from '../../../services/query-api';
import { setPersonsPopup } from '../../../store/action';
import { getPersonsPopupStatus } from '../../../store/popup-reducer/popup-reducer-selectos';
import { FilmCard, Person, SimilarMovie } from '../../../types/types';
import { getPersonKey, getSyntheticRating } from '../../../utils/utils';
import Loading from '../../loading/loading';
import Stars from '../../stars/stars';

import ModalMoviePersons from '../../_modals/modal-movie-persons/modal-movie-persons';


const StartValue = {
  Country: 1,
  Genre: 1,
  Similar: 3,
  Person: 3,
};

function ItemLi({item} : {item: string}) {
  return <li className="collection-item blue-grey darken-3 white-text">{item}</li>;
}


function PersonLi({person} : {person: Person}) {

  const { id, photo, name, enProfession, description } = person;

  return (
    <div className="col s4">
      <div className="card-image">
        {photo ? <Link to={`/persons/${id}`}> <img className='center' style={{width: '5rem'}} src={photo} alt={name}/> </Link>: null}
      </div>
      <Link to={`/persons/${id}`}>{name}</Link>
      <p><b>{enProfession}</b></p>
      <p><b>{description}</b></p>
    </div>
  );
}

function SimilarMoviesLi({movie} : {movie: SimilarMovie}) {

  const { id, poster, name } = movie;

  return (
    <div className="center-align" style={{width: '30%'}}>
      <Link to={`/films/${id}`}>{name}
        <div className="card-image center-align">
          <img style={{width: '10rem'}}src={poster.previewUrl} alt={name}/>
        </div>
      </Link>
    </div>
  );
}

const createBtnClick = (handle: () => void, name: string) => (
  <button
    onClick={handle}
    type='button' className="btn-floating btn-small waves-effect waves-light black s6 offset-s6"
  ><i className="material-icons">{name}</i>
  </button>
);

const createMovieBtnClick = (handle: () => void, name: string, text: string) => (
  <button
    onClick={handle}
    className="btn btn-large waves-effect waves-light" type="button" name="action"
  >{text}
    <i className="material-icons right">{name}</i>
  </button>
);

export default function OneFilmPage(){

  const [countryNum, setCountryNum] = useState(StartValue.Country);
  const [genreNum, setGenreNum] = useState(StartValue.Genre);
  const [similarNum, setSimilarNum] = useState(StartValue.Similar);

  const dispatch = useDispatch();
  const isPersonsPopup = useSelector(getPersonsPopupStatus);

  const handleMoreSimilarClick = () => setSimilarNum((num) => num + StartValue.Similar);
  const handleHideSimilarClick = () => setSimilarNum(StartValue.Similar);
  const handleShowCountryClick = () => setCountryNum(Infinity);
  const handleHideCountryClick = () => setCountryNum(StartValue.Country);
  const handleShowGenreClick = () => setGenreNum(Infinity);
  const handleHideGenreClick = () => setGenreNum(StartValue.Genre);

  const {id} = useParams();

  const {data, isError, isLoading, isFetching} = useGetOneFilmQuery(id as string);
  // console.log(data);

  if (isLoading) {
    // console.log('loading');
  }

  if (isFetching) {
    // console.log('loading');

    return <Loading/>;
  }


  if (isError || !data) {
    // console.log('isError');
    // if(isError) {console.log('isError!!!');}
    // if(!data) {console.log('!data!!!');}

    return <h2>isError</h2>;
  }

  const {name, votes, year, rating, poster, description, countries, genres, persons, similarMovies} = data;


  // const filmCard = {name, poster, rating, year, movieLength, votes, id: data.id, description};

  const countryList = countries ? countries.slice(0, countryNum).map((item) => <ItemLi item={item.name} key={item.name}/>) : null;
  const genreList = genres ? genres.slice(0, genreNum).map((item) => <ItemLi item={item.name} key={item.name}/>) : null;
  const personList = persons ? persons.slice(0, StartValue.Person).map((item) => <PersonLi person={item} key={getPersonKey(item.id, item.enProfession)}/>) : null;
  const similarMoviesList = similarMovies ? similarMovies.slice(0, similarNum).map((item) => <SimilarMoviesLi movie={item} key={item.id}/>) : null;

  const {ratingSynth, forAudience, forCritics} = getSyntheticRating(rating, votes);


  const btnOpenCountries = createBtnClick(handleShowCountryClick, 'add_circle_outline');
  const btnCloseCountries = createBtnClick(handleHideCountryClick, 'remove_circle_outline');

  const btnOpenGenres = createBtnClick(handleShowGenreClick, 'add_circle_outline');
  const btnCloseGenres = createBtnClick(handleHideGenreClick, 'remove_circle_outline');

  const btnOpenSimilar = createMovieBtnClick(handleMoreSimilarClick, 'add_circle_outline', 'показать еще');
  const btnCloseSimilar = createMovieBtnClick(handleHideSimilarClick, 'remove_circle_outline', 'сбросить');

  const btnCountry = countries && (countryNum < countries.length) ? btnOpenCountries : btnCloseCountries;
  const btnGenre = genres && (genreNum < genres.length) ? btnOpenGenres : btnCloseGenres;
  const btnSimilar = similarMovies && (similarNum < similarMovies.length) ? btnOpenSimilar : btnCloseSimilar;

  const handleOpenAllPersonBtnClick = () => dispatch(setPersonsPopup(true));

  const personsPopup = isPersonsPopup ? <ModalMoviePersons persons={persons || []}/> : null;


  return (
    <div className="black react-one-page">
      <div className="brown darken-3 white-text text-lighten-4 react-one-page__wrapper">
        <h2 className="header center-align">{name}</h2>
        <div className="card horizontal blue-grey darken-1 black-text">
          <div className="card-image">
            <img src={poster?.url} alt={name}/>
          </div>
          <div className="card-stacked">
            <div style={{padding: '1rem'}} className='blue-grey'>
              <Stars filmCard={data as FilmCard}/>
              <p className='blue-grey lighten-1'>Синтетический рейтинг: {ratingSynth} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i>
                {forAudience
                  ?
                  <>
                  (<i className="large grade material-icons" title='for the audience' style={{fontSize: '1.1rem', cursor: 'pointer'}}>sentiment_very_satisfied</i> {forAudience} %
               /
                    <i className="large grade material-icons" title='for the critics' style={{fontSize: '1.1rem', cursor: 'pointer'}}>face</i> {forCritics} %)
                  </>
                  :
                  null}
              </p>

              <p>Кинопоиск: {rating?.kp} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes?.kp})</p>
              <p>IMDB: {rating?.imdb} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes?.imdb})</p>
              <p>Критики: {rating?.filmCritics} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes?.filmCritics})</p>

              <p style={{padding: '1rem'}} className='blue-grey darken-2'>{year} год</p>

            </div>

            <div className='row' >

              <div className="card-action col s6">
                <ul className="collection with-header">
                  <li className="collection-header blue-grey darken-1">

                    <div className="row">
                      <div className="col s7"><span className="flow-text">Страны:</span></div>
                      <div className="col s5">
                        {countries && countries.length > 1 ? btnCountry : null}
                      </div>
                    </div>

                  </li>
                  {countryList}
                </ul>
              </div>

              <div className="card-action col s6">
                <ul className="collection with-header">
                  <li className="collection-header blue-grey darken-1">

                    <div className="row">
                      <div className="col s7"><span className="flow-text">Жанры:</span></div>
                      <div className="col s5">
                        {genres && genres.length > 1 ? btnGenre : null}
                      </div>
                    </div>

                  </li>
                  {genreList}
                </ul>
              </div>


            </div>
            <div className="card-action blue-grey darken-3">
              <h4 className=''>Персоны:</h4>

              <div className="row blue-grey darken-2">

                {personList}

              </div>
              <button
                onClick={handleOpenAllPersonBtnClick}
                type='button' className="waves-effect waves-light btn modal-trigger"
              >
                Открыть всех
                <i className="material-icons right">open_in_new</i>
              </button>

            </div>


          </div>


        </div>

        <div className="card-content grey black-text row">
          <p className="col s2"></p>
          <p className="col s8">{description}</p>
        </div>

        <div className="card-action  center-align">
          <h4 className='center-align'>Похожие фильмы:</h4>

          <div className="blue-grey darken-2" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>

            {similarMoviesList}

          </div>
          {similarMovies && similarMovies.length > 1 ? btnSimilar : null}
        </div>


      </div>

      {personsPopup}
    </div>
  );
}
