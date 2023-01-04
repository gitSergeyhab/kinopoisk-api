import { ResourceNum } from '../types/types';

export const round10 = (num: number) => Math.round(num * 10) / 10;
export const round100 = (num: number) => Math.round(num * 100) / 100;


export const getPersonKey = (id: number, prof?: string) => prof ? `${id}-${prof}` : id;

export const getAudienceRating = (rating: ResourceNum, votes: ResourceNum) => {

  if (votes.imdb && rating.imdb && votes.kp && rating.kp  ) {
    return round100((votes.kp * rating.kp + votes.imdb * rating.imdb) / (votes.imdb + votes.kp));
  }
  return rating.kp;
};

export const getSyntheticRating = (rating?: ResourceNum, votes?: ResourceNum) : {ratingSynth : number, forAudience : number | null, forCritics : number | null} => {

  const audienceRating = votes && rating ? getAudienceRating(rating, votes) || 0 : 0;


  if (rating?.filmCritics && votes?.filmCritics && votes.filmCritics > 3) {
    const audienceRating2 = audienceRating / (rating.filmCritics);
    const critic2 = rating.filmCritics / audienceRating;

    const forAudience = round100(audienceRating2 / (audienceRating2 + critic2) * 100);
    const forCritics = round100(critic2 / (audienceRating2 + critic2) * 100);
    const ratingSynth = round100((audienceRating + rating.filmCritics) / 2) ;
    return { ratingSynth, forAudience, forCritics };
  }

  return {ratingSynth : round100(audienceRating), forAudience : null, forCritics : null};
};


