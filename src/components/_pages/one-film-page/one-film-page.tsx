import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DefaultPath } from '../../../const';
import { useGetOneFilmQuery } from '../../../services/query-api';
import { setPopup } from '../../../store/action';
import { getPopupStatus } from '../../../store/popup-reducer/popup-reducer-selectos';
import { FilmCard, Person, SimilarMovie } from '../../../types/types';
import { toastError } from '../../../utils/error-utils';
import { getPersonKey, getSyntheticRating, TryToTranslate } from '../../../utils/utils';
import { AboutBlock } from '../../about-block/about-block';
import { AdditionalBlock } from '../../additional-block/additional-block';
import { Image, ImageContainer, InfoBlock, InfoLi, InfoList, ListInfoBlock, PageSection, PageWrapper, StarsImageContainer, Subtitle3, TitlePage, TopPageBlock, WideButton } from '../../common/common.style';
import { Error } from '../../error/error';
import LoadingLocal from '../../loading-local/loading-local';
import Stars from '../../stars/stars';
import ModalPersonsInMovie from '../../_modals/modal-persons-in-movie/modal-persons-in-movie';

import { AddImage, AddImageLink, AdditionalLi, AdditionalTitle, DescriptionSection, DirectorLink, SpanText } from './one-film-page.style';


const StartValue = {
  Country: 1,
  Genre: 1,
  Similar: 4,
  Person: 4,
};


const getDirector = (persons: Person[] | undefined) =>
  persons ? persons.filter((item) => item.enProfession === 'director') : [];

function Director({person}: {person: Person}) {
  return <InfoLi><DirectorLink to={`/persons/${person.id}`}>{person.name || person.enName}</DirectorLink></InfoLi>;
}


function PersonLi({person} : {person: Person}) {

  const { id, photo, name, enProfession } = person;
  const profession = TryToTranslate(enProfession);

  return (
    <AdditionalLi>
      {photo ? <AddImageLink to={`/persons/${id}`}> <AddImage src={photo || DefaultPath.Poster} alt={name}/> </AddImageLink>: null}
      <AdditionalTitle><DirectorLink to={`/persons/${id}`}>{name}</DirectorLink></AdditionalTitle>

      <SpanText>{profession}</SpanText>
    </AdditionalLi>
  );
}

function SimilarMoviesLi({movie, onClick} : {movie: SimilarMovie; onClick: () => void}) {

  const { id, poster, name } = movie;

  return (
    <AdditionalLi onClick={onClick}>
      {poster ? <AddImageLink to={`/films/${id}`}> <AddImage src={poster.previewUrl || poster.previewUrl || DefaultPath.Poster} alt={name}/> </AddImageLink>: null}
      <AdditionalTitle><DirectorLink to={`/films/${id}`}>{name}</DirectorLink></AdditionalTitle>

    </AdditionalLi>

  );
}


export default function OneFilmPage(){


  const [similarNum, setSimilarNum] = useState(StartValue.Similar);

  const dispatch = useDispatch();
  const isPersonsPopup = useSelector(getPopupStatus);


  const handleMoreSimilarClick = () => setSimilarNum((num) => num + StartValue.Similar);
  const handleHideSimilarClick = () => setSimilarNum(StartValue.Similar);


  const handleOpenAllPersonBtnClick = () => dispatch(setPopup(true));


  const {id} = useParams();

  const {data, isError, isLoading, error} = useGetOneFilmQuery(id as string);

  if (isLoading) {
    return <LoadingLocal/>;
  }


  if (isError || !data) {
    toastError(error);
    return <Error/>;
  }

  const {name, enName, alternativeName, votes, year, rating, poster, description, countries, genres, persons, similarMovies} = data;

  const directors = getDirector(persons);


  const countryList = countries ? countries.map((item) => <InfoLi key={item.name}> {item.name} </InfoLi>) : null;
  const genreList = genres ? genres.map((item) => <InfoLi key={item.name}> {item.name} </InfoLi>) : null;
  const personList = persons ? persons.slice(0, StartValue.Person).map((item) => <PersonLi person={item} key={getPersonKey(item.id, item.enProfession)}/>) : null;
  const similarMoviesList = similarMovies ? similarMovies.slice(0, similarNum).map((item) => <SimilarMoviesLi onClick={handleHideSimilarClick} movie={item} key={item.id}/> ) : null;
  const directorList = directors.map((item) => <Director key={item.id} person={item}/>);

  const {ratingSynth} = getSyntheticRating(rating, votes);

  const btnOpenSimilar = <WideButton onClick={handleMoreSimilarClick}>показать еще</WideButton>;
  const btnCloseSimilar = <WideButton onClick={handleHideSimilarClick}>свернуть</WideButton>;

  const btnSimilar = similarMovies && (similarNum < similarMovies.length) ? btnOpenSimilar : btnCloseSimilar;
  const btnMoreSimilar = similarMovies && similarMovies.length > StartValue.Similar ? btnSimilar : null;

  const btnOpenPersons = <WideButton id='modal-btn' onClick={handleOpenAllPersonBtnClick}>Открыть всех</WideButton>;

  const personsPopup = isPersonsPopup ? <ModalPersonsInMovie persons={persons || []}/> : null;

  const about = [
    {point: 'Наш рейтинг', value: ratingSynth,  our: true},
    {point: 'Кинопоиск', value: rating?.kp, secondValue: votes?.kp },
    {point: 'IMDB', value: rating?.imdb, secondValue: votes?.imdb},
    {point: 'Критики', value: rating?.filmCritics, secondValue: votes?.filmCritics},
    {point: 'Год', value: year, simple: true },
  ];

  const aboutBlock = <AboutBlock about={about}/>;


  return (
    <PageWrapper>
      <PageSection>
        <TitlePage>{name || enName || alternativeName}</TitlePage>
        <TopPageBlock>

          <StarsImageContainer>
            <ImageContainer>
              <Image src={poster?.url || poster?.previewUrl || DefaultPath.Poster} alt={name || enName || alternativeName}/>
            </ImageContainer>
            <Stars filmCard={data as FilmCard}/>
          </StarsImageContainer>

          <InfoBlock>

            {aboutBlock}

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
          </InfoBlock>
        </TopPageBlock>

        <AdditionalBlock name='Персоны' elements={personList} button={btnOpenPersons}/>

        <DescriptionSection >
          <p>{description}</p>
        </DescriptionSection>
        {similarMoviesList?.length ? <AdditionalBlock name='Похожие фильмы' elements={similarMoviesList} button={btnMoreSimilar}/> : null}


      </PageSection>
      {personsPopup}

    </PageWrapper>
  );


}

