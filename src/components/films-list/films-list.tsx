import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import { moviesMock } from '../../mock/movies-mock';
import Pagination from '../../pagination/pagination';
import { useGetFilmsByParamsQuery } from '../../services/query-api';
import { Film } from '../../types/types';
import { FilmCard } from '../film-card/film-card';
import LoadingLocal from '../loading-local/loading-local';
import Loading from '../loading/loading';


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


export default function FilmsList() {


  const {search} = useLocation();


  const {isError, isFetching, isLoading, data} = useGetFilmsByParamsQuery(search);


  if (isLoading) {
    return <Loading/>;
  }

  if (isError || !data) {
    // console.log('isError');

    return <h2>isError</h2>;
  }

  const films = data.docs as Film[];


  const filmList = films.map((item) => (
    <FilmCard key={item.id} film={item} />
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
