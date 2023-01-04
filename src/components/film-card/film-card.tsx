import { Film, FilmCard as FilmCardType} from '../../types/types';
import { getSyntheticRating, round10 } from '../../utils/utils';
import BtnDeleteStars from '../btn-delete-stars/btn-delete-stars';
import Stars from '../stars/stars';
import { CardContent, CardInfo, CardLi, CardText, Grade, Image, ImageContainer, ImageLink, Title, TitleLink } from './film-card.style';


export function FilmCard({film} : {film: Film | FilmCardType}) {


  const {name, poster, rating, year, movieLength, votes, id, description} = film;
  const filmCard = {name, poster, rating, year, movieLength, votes, id, description};

  const rateKp = rating?.kp;
  const ourRate = getSyntheticRating(rating, votes).ratingSynth;

  const ourRateKpElement = ourRate ?
    <CardText title='наш рейтинг'>{ourRate}<Grade our >grade</Grade></CardText> :
    null;

  const rateKpElement = rateKp ?
    <CardText title='рейтинг Кинопоиска'>{round10(rateKp)}<Grade >grade</Grade>({votes?.kp})</CardText> :
    null;

  const yearElement = year ? <CardText>{year} год</CardText> : null;

  return (
    <CardLi>


      <BtnDeleteStars id={id} key={id}/>
      <Stars size={0.7} filmCard={filmCard as FilmCardType}/>

      <ImageLink  to={`/films/${id}`}>
        <ImageContainer>
          <Image src={poster?.previewUrl} alt={name} />
        </ImageContainer>
      </ImageLink>
      <CardContent>
        <Title>
          <TitleLink to={`/films/${id}`}>{name}</TitleLink>
        </Title>
        <CardInfo>
          {rateKpElement}
          {ourRateKpElement}
          {yearElement}
        </CardInfo>

      </CardContent>

    </CardLi>
  );
}
