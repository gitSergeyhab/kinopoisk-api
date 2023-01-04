import styled from 'styled-components';
import FilmsList from '../../films-list/films-list';
import Filter from '../../filter/filter';
import TabsOrder from '../../tabs-order/tabs-order';
import Tabs from '../../tabs/tabs';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  width: 100%;

  @media (min-width: 600px) {
    padding: 0 5%;
  };
  @media (min-width: 900px) {
    padding: 0 10%;
  };

  @media (min-width: 1200px) {
    padding: 0 20%;
  };
`;

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color:  #424242;
  border: white 1px solid;
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;


  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
  };
`;

const TabFilmWrapper = styled.div`
  background-color: #212121 ;
  padding: 20px 2px;
`;


export default function FilmsPage() {

  return (
    <Wrapper>
      <Filter/>

      <TabFilmWrapper >
        <TabsWrapper >

          <Tabs/>
          <TabsOrder/>

        </TabsWrapper>

        <FilmsList/>

      </TabFilmWrapper>
    </Wrapper>
  );
}
