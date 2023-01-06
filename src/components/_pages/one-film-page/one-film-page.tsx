import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { DefaultPath } from '../../../const';
import { useGetOneFilmQuery } from '../../../services/query-api';
import { setPersonsPopup } from '../../../store/action';
import { getPersonsPopupStatus } from '../../../store/popup-reducer/popup-reducer-selectos';
import { FilmCard, Person, SimilarMovie } from '../../../types/types';
import { getPersonKey, getSyntheticRating } from '../../../utils/utils';
import { AboutBlock } from '../../about-block/about-block';
import Loading from '../../loading/loading';
import Stars from '../../stars/stars';

import ModalMoviePersons from '../../_modals/modal-movie-persons/modal-movie-persons';
import { DirectorLink, FilmImageContainer, FilmInfoBlock, FilmTopBlock, Image, InfoLi, InfoList, ListInfoBlock, OneFilmSection, StarsImageContainer, Subtitle3, TitlePage, Wrapper } from './one-film-page.style';


const StartValue = {
  Country: 1,
  Genre: 1,
  Similar: 3,
  Person: 3,
};


const getDirector = (persons: Person[] | undefined) =>
  persons ? persons.filter((item) => item.enProfession === 'director') : [];

function Director({person}: {person: Person}) {
  return <InfoLi><DirectorLink to={`/persons/${person.id}`}>{person.name || person.enName}</DirectorLink></InfoLi>;
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

// const createBtnClick = (handle: () => void, name: string) => (
//   <button
//     onClick={handle}
//     type='button' className="btn-floating btn-small waves-effect waves-light black s6 offset-s6"
//   ><i className="material-icons">{name}</i>
//   </button>
// );

const createMovieBtnClick = (handle: () => void, name: string, text: string) => (
  <button
    onClick={handle}
    className="btn btn-large waves-effect waves-light" type="button" name="action"
  >{text}
    <i className="material-icons right">{name}</i>
  </button>
);

export default function OneFilmPage(){

  // const [countryNum, setCountryNum] = useState(StartValue.Country);
  // const [genreNum, setGenreNum] = useState(StartValue.Genre);
  const [similarNum, setSimilarNum] = useState(StartValue.Similar);

  const dispatch = useDispatch();
  const isPersonsPopup = useSelector(getPersonsPopupStatus);

  const handleMoreSimilarClick = () => setSimilarNum((num) => num + StartValue.Similar);
  const handleHideSimilarClick = () => setSimilarNum(StartValue.Similar);
  // const handleShowCountryClick = () => setCountryNum(Infinity);
  // const handleHideCountryClick = () => setCountryNum(StartValue.Country);
  // const handleShowGenreClick = () => setGenreNum(Infinity);
  // const handleHideGenreClick = () => setGenreNum(StartValue.Genre);

  // const x = [handleShowCountryClick, handleHideCountryClick, handleShowGenreClick, handleHideGenreClick];


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

  const {name, enName, alternativeName, votes, year, rating, poster, description, countries, genres, persons, similarMovies} = data;

  const directors = getDirector(persons);

  // const filmCard = {name, poster, rating, year, movieLength, votes, id: data.id, description};

  const countryList = countries ? countries.map((item) => <InfoLi key={item.name}> {item.name} </InfoLi>) : null;
  const genreList = genres ? genres.map((item) => <InfoLi key={item.name}> {item.name} </InfoLi>) : null;
  const personList = persons ? persons.slice(0, StartValue.Person).map((item) => <PersonLi person={item} key={getPersonKey(item.id, item.enProfession)}/>) : null;
  const similarMoviesList = similarMovies ? similarMovies.slice(0, similarNum).map((item) => <SimilarMoviesLi movie={item} key={item.id}/>) : null;


  // const {ratingSynth, forAudience, forCritics} = getSyntheticRating(rating, votes);
  const {ratingSynth} = getSyntheticRating(rating, votes);

  const directorList = directors.map((item) => <Director key={item.id} person={item}/>);
  // const btnOpenCountries = createBtnClick(handleShowCountryClick, 'add_circle_outline');
  // const btnCloseCountries = createBtnClick(handleHideCountryClick, 'remove_circle_outline');

  // const btnOpenGenres = createBtnClick(handleShowGenreClick, 'add_circle_outline');
  // const btnCloseGenres = createBtnClick(handleHideGenreClick, 'remove_circle_outline');

  const btnOpenSimilar = createMovieBtnClick(handleMoreSimilarClick, 'add_circle_outline', 'показать еще');
  const btnCloseSimilar = createMovieBtnClick(handleHideSimilarClick, 'remove_circle_outline', 'сбросить');

  // const btnCountry = countries && (countryNum < countries.length) ? btnOpenCountries : btnCloseCountries;
  // const btnGenre = genres && (genreNum < genres.length) ? btnOpenGenres : btnCloseGenres;
  const btnSimilar = similarMovies && (similarNum < similarMovies.length) ? btnOpenSimilar : btnCloseSimilar;

  const handleOpenAllPersonBtnClick = () => dispatch(setPersonsPopup(true));

  const personsPopup = isPersonsPopup ? <ModalMoviePersons persons={persons || []}/> : null;

  const about = [
    {point: 'Наш рейтинг', value: ratingSynth,  our: true},
    {point: 'Кинопоиск', value: rating?.kp, secondValue: votes?.kp },
    {point: 'IMDB', value: rating?.imdb, secondValue: votes?.imdb},
    {point: 'Критики', value: rating?.filmCritics, secondValue: votes?.filmCritics},
    {point: 'Год', value: year, simple: true },
  ];

  const aboutBlock = <AboutBlock about={about}/>;


  return (
    <Wrapper>
      <OneFilmSection>
        <TitlePage>{name || enName || alternativeName}</TitlePage>
        <FilmTopBlock>

          <StarsImageContainer>
            <FilmImageContainer>
              <Image src={poster?.url || poster?.previewUrl || DefaultPath.Poster} alt={name || enName || alternativeName}/>
            </FilmImageContainer>
            <Stars filmCard={data as FilmCard}/>
          </StarsImageContainer>

          <FilmInfoBlock>
            {aboutBlock}
            {/* <InfoText>Наш рейтинг: {ratingSynth}<Grade our size={1.3}>grade</Grade> </InfoText>
            <InfoText>Кинопоиск: {rating?.kp} <Grade size={1.3}>grade</Grade> ({votes?.kp})</InfoText>
            <InfoText>IMDB: {rating?.imdb} <Grade size={1.3}>grade</Grade> ({votes?.imdb})</InfoText>
            <InfoText>Критики: {rating?.filmCritics} <Grade size={1.3}>grade</Grade> ({votes?.filmCritics})</InfoText>

            <InfoText>{year} год</InfoText> */}
            <ListInfoBlock>


              <div>
                <Subtitle3 >Режисер:</Subtitle3>
                <InfoList>{directorList}</InfoList>
              </div>
              <div>
                <Subtitle3>Страны:</Subtitle3>
                <InfoList>{countryList}</InfoList>

              </div>

              <div>
                <Subtitle3 >Жанры:</Subtitle3>
                <InfoList>{genreList}</InfoList>
              </div>


            </ListInfoBlock>


          </FilmInfoBlock>
        </FilmTopBlock>

        <div>

          <h3>Персоны:</h3>

          <div>

            {personList}

          </div>
          <button
            onClick={handleOpenAllPersonBtnClick}
            type='button'
          >
              Открыть всех
            <i className="material-icons right">open_in_new</i>
          </button>
        </div>

        <div >
          <p>{description}</p>
        </div>
        <div>
          <h3>Похожие фильмы:</h3>

          <div>

            {similarMoviesList}

          </div>
          {similarMovies && similarMovies.length > 1 ? btnSimilar : null}
        </div>
        {personsPopup}
      </OneFilmSection>
    </Wrapper>
  );


}

// return (
//   <div className="black react-one-page">
//     <div className="brown darken-3 white-text text-lighten-4 react-one-page__wrapper">
//       <h2 className="header center-align">{name}</h2>
//       <div className="card horizontal blue-grey darken-1 black-text">
//         <div className="card-image">
//           <img src={poster?.url || poster?.previewUrl || DefaultPath.Poster} alt={name || enName || alternativeName}/>
//         </div>
//         <div className="card-stacked">
//           <div style={{padding: '1rem'}} className='blue-grey'>
//             <Stars filmCard={data as FilmCard}/>
//             <p className='blue-grey lighten-1'>Синтетический рейтинг: {ratingSynth} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i>
//               {forAudience
//                 ?
//                 <>
//     (<i className="large grade material-icons" title='for the audience' style={{fontSize: '1.1rem', cursor: 'pointer'}}>sentiment_very_satisfied</i> {forAudience} %
//  /
//                   <i className="large grade material-icons" title='for the critics' style={{fontSize: '1.1rem', cursor: 'pointer'}}>face</i> {forCritics} %)
//                 </>
//                 :
//                 null}
//             </p>

//             <p>Кинопоиск: {rating?.kp} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes?.kp})</p>
//             <p>IMDB: {rating?.imdb} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes?.imdb})</p>
//             <p>Критики: {rating?.filmCritics} <i className="large grade material-icons" style={{fontSize: '1.1rem'}}>grade</i> ({votes?.filmCritics})</p>

//             <p style={{padding: '1rem'}} className='blue-grey darken-2'>{year} год</p>

//           </div>

//           <div className='row' >

//             <div className="card-action col s6">
//               <ul className="collection with-header">
//                 <li className="collection-header blue-grey darken-1">

//                   <div className="row">
//                     <div className="col s7"><span className="flow-text">Страны:</span></div>
//                     <div className="col s5">
//                       {countries && countries.length > 1 ? btnCountry : null}
//                     </div>
//                   </div>

//                 </li>
//                 {countryList}
//               </ul>
//             </div>

//             <div className="card-action col s6">
//               <ul className="collection with-header">
//                 <li className="collection-header blue-grey darken-1">

//                   <div className="row">
//                     <div className="col s7"><span className="flow-text">Жанры:</span></div>
//                     <div className="col s5">
//                       {genres && genres.length > 1 ? btnGenre : null}
//                     </div>
//                   </div>

//                 </li>
//                 {genreList}
//               </ul>
//             </div>


//           </div>
//           <div className="card-action blue-grey darken-3">
//             <h4 className=''>Персоны:</h4>

//             <div className="row blue-grey darken-2">

//               {personList}

//             </div>
//             <button
//               onClick={handleOpenAllPersonBtnClick}
//               type='button' className="waves-effect waves-light btn modal-trigger"
//             >
//     Открыть всех
//               <i className="material-icons right">open_in_new</i>
//             </button>

//           </div>


//         </div>


//       </div>

//       <div className="card-content grey black-text row">
//         <p className="col s2"></p>
//         <p className="col s8">{description}</p>
//       </div>

//       <div className="card-action  center-align">
//         <h4 className='center-align'>Похожие фильмы:</h4>

//         <div className="blue-grey darken-2" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>

//           {similarMoviesList}

//         </div>
//         {similarMovies && similarMovies.length > 1 ? btnSimilar : null}
//       </div>


//     </div>

//     {personsPopup}
//   </div>
// );
