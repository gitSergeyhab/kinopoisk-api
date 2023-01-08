import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetOnePersonQuery } from '../../../services/query-api';
import { setPopup } from '../../../store/action';
import { getPopupStatus } from '../../../store/popup-reducer/popup-reducer-selectos';
import { formatDateDDMonthYYYY } from '../../../utils/date-utils';
import { AboutBlock } from '../../about-block/about-block';
import { Image, ImageContainer, InfoBlock, InfoLi, InfoList, ListInfoBlock, PageSection, PageWrapper, StarsImageContainer, Subtitle3, TitlePage, TopPageBlock, WideButton } from '../../common/common.style';
import Loading from '../../loading/loading';
import ModalMoviesOfPerson from '../../_modals/modal-movies-of-person/modal-movies-of-person';
import { BtnWrapper } from './person-page.style';


export default function PersonPage(){


  const {id} = useParams();
  const dispatch = useDispatch();
  const isPopup = useSelector(getPopupStatus);
  const {data, isError, isLoading} = useGetOnePersonQuery(id as string);

  const handleOpenPopup = () => dispatch(setPopup(true));

  if (isLoading) {
    return <Loading/>;
  }

  if (isError || !data) {
    return <h2>isError</h2>;
  }

  const {name, birthPlace, birthday, death, movies, photo, profession, sex, age, enName} = data;
  const moviesPopup = isPopup ? <ModalMoviesOfPerson movies={movies || []}/> : null;


  const birthdayString = birthday ? formatDateDDMonthYYYY(birthday) : 'Неизвестна';
  const deathString = death ? formatDateDDMonthYYYY(death) : null;

  const professionList = (profession && profession.length) ?
    profession
      .map((item) => item.value || null)
      .filter((item) => !!item) : null;


  const birthPlaceList = birthPlace && birthPlace.length ?
    birthPlace
      .map((item) => item.value || null)
      .filter((item) => !!item).join(', ') : null;


  const about = [
    {point: 'Дата рождения', value: birthdayString,  simple: true},
    {point: 'Дата смерти', value: deathString,  simple: true},
    {point: 'Место рождения', value: birthPlaceList ,  simple: true},
    {point: 'Возраст', value: age, simple: true},
    {point: 'Пол', value: sex, simple: true},

  ];

  const professionElements = professionList ? (professionList as string[]).map((item) => <InfoLi key={item}> {item} </InfoLi>) : null;

  const aboutBlock = <AboutBlock about={about}/>;

  return (
    <PageWrapper>
      <PageSection>
        <TitlePage>{ name || enName }</TitlePage>
        <TopPageBlock>
          <StarsImageContainer>
            <ImageContainer>
              <Image src={photo} alt={name || enName}/>
            </ImageContainer>
          </StarsImageContainer>

          <InfoBlock>

            {aboutBlock}

            <ListInfoBlock>
              <div>
                <Subtitle3 >Профессии:</Subtitle3>
                <InfoList>{professionElements}</InfoList>
              </div>
            </ListInfoBlock>
          </InfoBlock>

        </TopPageBlock>

        <BtnWrapper>
          <WideButton id='modal-btn' onClick={handleOpenPopup}>фильмография</WideButton>
        </BtnWrapper>
      </PageSection>

      {moviesPopup}

    </PageWrapper>
  );
}
