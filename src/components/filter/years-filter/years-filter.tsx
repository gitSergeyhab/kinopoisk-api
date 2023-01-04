import Nouislider from 'nouislider-react';

import { FilterRange } from '../../../const';
import { useDebounce } from '../../../hooks/use-debounce';
import { FilterFieldset, TextBlockFilter } from '../filter.style';


type YearsFilterProps = {
  years: number[],
  setYears: React.Dispatch<React.SetStateAction<number[]>>
};

export default function YearsFilter ({years, setYears}: YearsFilterProps) {

  const debounceYears = useDebounce(years);

  const onSlide = (render: unknown, handle: unknown, value: number[], un: unknown, percent: unknown) => {
    setYears([Math.round(value[0]), Math.round(value[1])]);
  };


  return (
    <FilterFieldset>
      <legend>Период</legend>
      <TextBlockFilter>
        с <span className="orange-text">{years[0]}</span> по  <span className="orange-text">{years[1]}</span> год
      </TextBlockFilter>
      <Nouislider
        className='range-field'
        connect
        step={1}
        start={debounceYears}
        behaviour="tap"
        range={{
          min: [FilterRange.Year.Start],
          '50%': [FilterRange.Year.Middle],
          max: [FilterRange.Year.End],
        }}
        onSlide={onSlide}

      />
    </FilterFieldset>
  );
}
