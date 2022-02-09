import { useLocation } from 'react-router-dom';
import { FILMS } from '../../mock/mock';
import { useGetFilmsByParamsQuery } from '../../services/query-api';
import { Film } from '../../types/types';
import { FilmCard } from '../film-card/film-card';


export default function FilmsList() {


  const {search} = useLocation();


  const {isError, isFetching, isLoading, data} = useGetFilmsByParamsQuery(search);


  if (isLoading) {
    return <h2>isFetching</h2>;
  }

  if (isError || !data) {
    return <h2>isError</h2>;
  }

  const films = data.docs as Film[];

  console.log(data);

  // const films = FILMS;
  // console.log(films);


  const filmList = films.map((item) => (
    <div className="card col s6 m4 l3 gap1" key={item.id}>
      <FilmCard film={item} />
    </div>
  ));


  return (
    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>

      {filmList}

    </div>);
}