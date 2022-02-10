import Pagination from '../../../pagination/pagination';
import FilmsList from '../../films-list/films-list';
import Filter from '../../filter/filter';
import TabsOrder from '../../tabs-order/tabs-order';
import Tabs from '../../tabs/tabs';

export default function FilmsPage() {

  return (
    <main className="mdl-layout__content row center-align black">
      <div className="col s1"></div>
      <div className="page-content col s10 row  grey darken-1">

        <Filter/>

        <div className="mdl-grid mdl-center col s9" >
          <div className="row grey darken-3" style={{marginLeft: '0.1rem'}}>

            <Tabs/>
            <TabsOrder/>

          </div>

          <FilmsList/>

        </div>

      </div>
    </main>);
}
