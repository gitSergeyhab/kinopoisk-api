import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Field, FilterRange, InitFilterParam } from '../../../const';
import { setEndRating, setStartRating } from '../../../store/action';
import { getEndRating, getStartRating } from '../../../store/filter-reducer/filter-reducer-selectors';
import { getParamsFromSearch } from '../../../utils/url-utils';


const round10 = (num: number) => Math.round(num * 10) / 10;


export default function RatingsFilter () {

  const [searchParams] = useSearchParams();

  const {start, end} = getParamsFromSearch(searchParams, Field.Rating.Kp, 0, 10);


  const dispatch = useDispatch();

  const startYear = useSelector(getStartRating);
  const endYear = useSelector(getEndRating);


  const onSlide = (render: any, handle: any, value: number[], un: any, percent: any) => {
    dispatch(setStartRating(round10(value[0])));
    dispatch(setEndRating(round10(value[1])));
  };


  return (
    <div>
      <Nouislider
        connect
        start={[start, end]}
        behaviour="tap"
        range={{
          min: [FilterRange.Rating.Start],
          max: [FilterRange.Rating.End],
        }}
        onSlide={onSlide}
      />
      {startYear && endYear  && (
        <div>
            с {startYear}
            по {endYear}
        </div>
      )}
    </div>
  );
}
