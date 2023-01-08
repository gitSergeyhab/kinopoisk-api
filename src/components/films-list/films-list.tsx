import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import { moviesMock } from '../../mock/movies-mock';
import Pagination from '../pagination/pagination';
import { useGetFilmsByParamsQuery } from '../../services/query-api';
import { FilmCard } from '../film-card/film-card';
import LoadingLocal from '../loading-local/loading-local';
import Loading from '../loading/loading';
import { Error } from '../error/error';


const FilmSection = styled.section`width: 100%;`;


const FilmUl = styled.ul`
  padding: 2px;
  margin: 0;
  list-style: none;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  };
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  };
`;

export const Li = styled.li`
background-color: #000000;

  &:hover {
    border: #FFFFFF 1px solid;
  }
`;


export default function FilmsList() {


  const {search} = useLocation();


  const {isError, isFetching, isLoading, data} = useGetFilmsByParamsQuery(search);


  if (isLoading) {
    return <Loading/>;
  }

  if (isError || !data) {
    // console.log('isError');

    return <Error/>;
  }

  const films = data.docs;


  const filmList = films.map((item) => (
    <Li key={item.id}><FilmCard  film={item} /></Li>
  ));


  return (
    <FilmSection>
      {isFetching ? <LoadingLocal/> : null}

      <FilmUl>

        {filmList}


      </FilmUl>
      <Pagination currentPage={data.page} pages={data.pages}/>


    </FilmSection>

  );
}
