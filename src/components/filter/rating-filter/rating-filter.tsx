import Nouislider from 'nouislider-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Field, FilterRange } from '../../../const';
import { setEndRating, setStartRating } from '../../../store/action';
import { getEndRating, getStartRating } from '../../../store/filter-reducer/filter-reducer-selectors';
import { getParamsFromSearch } from '../../../utils/url-utils';


const round10 = (num: number) => Math.round(num * 10) / 10;


export default function RatingsFilter ({reset} : {reset : boolean}) {

  const [searchParams] = useSearchParams();

  const {start, end} = getParamsFromSearch(searchParams, Field.Rating.Kp, 0, 10);
  const [startEnd, setStartEnd] = useState([start, end]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStartRating(start));
    dispatch(setEndRating(end));
  }, [start, end, dispatch]);


  const startRating = useSelector(getStartRating);
  const endRating = useSelector(getEndRating);


  const handleClick = () => setStartEnd([startRating, endRating]);

  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (reset && ref.current) {
      ref.current.click();
      setTimeout(() => ref.current ? ref.current.click() : null, 0);
    }
  }, [reset]);


  const onSlide = (render: any, handle: any, value: number[], un: any, percent: any) => {
    dispatch(setStartRating(round10(value[0])));
    dispatch(setEndRating(round10(value[1])));
  };


  return (
    <fieldset className='grey darken-3'>
      <legend>Рейтинг Кинопоиска</legend>
      <button onClick={handleClick} type='button' ref={ref} style={{display: 'none'}}></button>

      <div className='react-filters'>
        <div className='react-filters-text'>
          от <span className="orange-text">{startRating}</span> до  <span className="orange-text"> {endRating} </span> <i className="large grade material-icons orange-text" style={{fontSize: '1.1rem'}}>grade</i>
        </div>
        <Nouislider

          id='slider-range'
          connect
          step={0.1}

          start={startEnd}


          behaviour="tap"
          range={{
            min: [FilterRange.Rating.Start],
            max: [FilterRange.Rating.End],
          }}
          onSlide={onSlide}
        />

      </div>
    </fieldset>

  );
}
