import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Nouislider from 'nouislider-react';

import { getEndYear, getStartYear } from '../../../store/filter-reducer/filter-reducer-selectors';
import { setEndYear, setStartYear } from '../../../store/action';
import { getParamsFromSearch } from '../../../utils/url-utils';
import { Field, FilterRange } from '../../../const';


export default function YearsFilter ({reset} : {reset : boolean}) {

  const [searchParams] = useSearchParams();


  const {start, end} = getParamsFromSearch(searchParams, Field.Year, FilterRange.Year.Start, FilterRange.Year.End);
  const [startEnd, setStartEnd] = useState([start, end]);

  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStartYear(start));
    dispatch(setEndYear(end));
  }, [start, end, dispatch]);

  const handleClick = () => setStartEnd([startYear, endYear]);

  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (reset && ref.current) {
      // setStartEnd([startYear, endYear]);
      // setTimeout(() => ref.current ? setStartEnd([startYear, endYear]): null, 0); / а так не работает / да и вообще - магия ((

      ref.current.click();
      setTimeout(() => ref.current ? ref.current.click() : null, 0);
    }
  }, [reset]);


  const onSlide = (render: any, handle: any, value: number[], un: any, percent: any) => {
    dispatch(setStartYear(Math.round(value[0])));
    dispatch(setEndYear(Math.round(value[1])));
  };


  return (
    <fieldset className='grey darken-3'>
      <legend>Период</legend>
      <button onClick={handleClick} type='button' ref={ref} style={{display: 'none'}}></button>
      <div className='react-filters'>
        <div className='react-filters-text'>
        с <span className="orange-text">{startYear}</span> по  <span className="orange-text"> {endYear} </span> год
        </div>
        <Nouislider
          className='range-field'
          connect
          step={1}
          start={startEnd}
          behaviour="tap"
          range={{
            min: [FilterRange.Year.Start],
            '50%': [FilterRange.Year.Middle],
            max: [FilterRange.Year.End],
          }}
          onSlide={onSlide}

        />
      </div>
    </fieldset>
  );
}
