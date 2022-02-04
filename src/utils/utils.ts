import { Rating, Votes } from '../types/types';

export const getRound = (num : number) => Math.round(num * 100) / 100;

export const getPersonKey = (id: number, prof: string | null) => prof ? `${id}-${prof}` : id;

export const getAudienceRating = (rating: Rating, votes: Votes) => {

  if (votes.imdb && rating.imdb) {
    return getRound((votes.kp * rating.kp + votes.imdb * rating.imdb) / (votes.imdb + votes.kp));
  }
  return rating.kp;
};

export const getSyntheticRating = (rating: Rating, votes: Votes) : {ratingSynth : number, forAudience : number | null, forCritics : number | null} => {

  const audienceRating = getAudienceRating(rating, votes);


  if (rating.filmCritics && votes.filmCritics && votes.filmCritics > 3) {
    const audienceRating2 = audienceRating / (rating.filmCritics);
    const critic2 = rating.filmCritics / audienceRating;

    const forAudience = getRound(audienceRating2 / (audienceRating2 + critic2) * 100);
    const forCritics = getRound(critic2 / (audienceRating2 + critic2) * 100);
    const ratingSynth = getRound((audienceRating + rating.filmCritics) / 2);
    return { ratingSynth, forAudience, forCritics };
  }

  return {ratingSynth : audienceRating, forAudience : null, forCritics : null};
};
