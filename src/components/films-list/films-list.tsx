import { useLocation } from 'react-router-dom';
import { FILMS } from '../../mock/mock';
import Pagination from '../../pagination/pagination';
import { useGetFilmsByParamsQuery } from '../../services/query-api';
import { Film } from '../../types/types';
import { FilmCard } from '../film-card/film-card';
import LoadingLocal from '../loading-local/loading-local';
import Loading from '../loading/loading';


export default function FilmsList() {


  const {search} = useLocation();


  const {isError, isFetching, isLoading, data} = useGetFilmsByParamsQuery(search);


  if (isLoading) {
    return <Loading/>;
  }

  if (isError || !data) {
    console.log('isError');

    return <h2>isError</h2>;
  }

  const films = data.docs as Film[];


  const filmList = films.map((item) => (
    <div className="card col s6 m4 l3 gap1" key={item.id}>
      <FilmCard film={item} />
    </div>
  ));


  return (
    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
      {isFetching ? <LoadingLocal/> : null}

      {filmList}

      <Pagination currentPage={data.page} pages={data.pages}/>

    </div>);
}
