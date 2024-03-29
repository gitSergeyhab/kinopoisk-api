import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../pagination/pagination';
import { useGetFilmsByParamsQuery } from '../../services/query-api';
import { FilmCard } from '../film-card/film-card';
import LoadingLocal from '../loading-local/loading-local';
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
  transition: all 0.3s;
  & * {
    transition: all 0.3s;
  }
`;

type ModifyData = {
  status?: string
}

export default function FilmsList() {


  const {search} = useLocation();


  const {isError, isLoading, isFetching, data} = useGetFilmsByParamsQuery(search);


  if (isLoading) {
    return (
      <FilmSection><LoadingLocal/></FilmSection>
    );
  }

  if (isError || !data || (data as ModifyData).status === 'error') {
    return <FilmSection><Error/></FilmSection>;
  }

  if (!data.docs.length) {
    return (
      <FilmSection>
        <Error message='По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтра'/>
      </FilmSection>
    );
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
