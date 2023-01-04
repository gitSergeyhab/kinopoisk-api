import Nouislider from 'nouislider-react';
import { FilterRange } from '../../../const';
import { useDebounce } from '../../../hooks/use-debounce';
import { round10 } from '../../../utils/utils';
import { FilterFieldset, IconFilter, TextBlockFilter } from '../filter.style';


type RatingsFilterProps = {
  rate: number[],
  setRate: React.Dispatch<React.SetStateAction<number[]>>
};

export default function YearsFilter ({rate, setRate}: RatingsFilterProps) {

  const debounceRate = useDebounce(rate);

  const onSlide = (render: unknown, handle: unknown, value: number[], un: unknown, percent: unknown) => {

    setRate([round10(value[0]), round10(value[1])]);
  };


  return (
    <FilterFieldset>
      <legend>Рейтинг Кинопоиска</legend>

      <TextBlockFilter >
          от <span >{rate[0]}</span> до  <span > {rate[1]} </span> <IconFilter className="material-icons">grade</IconFilter>
      </TextBlockFilter>
      <Nouislider
        id='slider-range'
        connect
        step={0.1}

        start={debounceRate}

        behaviour="tap"
        range={{
          min: [FilterRange.Rating.Start],
          max: [FilterRange.Rating.End],
        }}
        onSlide={onSlide}
      />

    </FilterFieldset>

  );
}
