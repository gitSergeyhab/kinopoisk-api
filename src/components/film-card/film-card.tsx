import { Film, FilmCard as FilmCardType} from '../../types/types';
import { getSyntheticRating, round10 } from '../../utils/utils';
import BtnDeleteStars from '../btn-delete-stars/btn-delete-stars';
import { Grade } from '../common/common.style';
import Stars from '../stars/stars';
import { CardContent, CardInfo, CardLi, CardText, Image, ImageContainer, ImageLink, NoImageText, Title, TitleLink } from './film-card.style';


export function FilmCard({film} : {film: Film | FilmCardType}) {


  const {name, enName, alternativeName, poster, rating, year, movieLength, votes, id, description} = film;
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

  const image = poster?.previewUrl || poster?.url ? <Image src={poster?.previewUrl || poster?.url} alt={name || enName || alternativeName} /> : <NoImageText>На Кинопоиске нет постера для этого фильма...</NoImageText>;

  return (
    <CardLi>
      <BtnDeleteStars id={id} key={id}/>
      <Stars size={0.7} filmCard={filmCard as FilmCardType}/>

      <ImageLink  to={`/films/${id}`}>
        <ImageContainer>
          {image}
        </ImageContainer>
      </ImageLink>
      <CardContent>
        <Title>
          <TitleLink to={`/films/${id}`}>{name || enName || alternativeName || 'кинопоиск решил обойтись без названия фильма)'}</TitleLink>
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
