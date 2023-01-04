import { useState, FormEventHandler } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RatingsFilter from './rating-filter/rating-filter';
import YearsFilter from './years-filter/years-filter';
import VotesFilter from './votes-filter/votes-filter';
import CategoriesFilter from './categories-filter/categories-filter';
import { getFieldFromSearch, getRateFromSearch, getVotesFromSearch, getYearsFromSearch, rewriteSearch } from '../../utils/url-utils';
import { Field, FieldType } from '../../const';
import { FilterForm, FilterReset, FilterSubmit } from './filter.style';

import './filter.css'; //стили для nouislider


export default function Filter() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [years, setYears] = useState(getYearsFromSearch(searchParams));
  const [rate, setRate] = useState(getRateFromSearch(searchParams));
  const [votes, setVotes] = useState(getVotesFromSearch(searchParams));
  const [category, setCategory] = useState(getFieldFromSearch(searchParams, FieldType.TypeNum));


  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    const fields = [
      {field: FieldType.TypeNum, value: category},
      {field: FieldType.Rating, value: rate ? rate.join('-') : null},
      {field: FieldType.Votes, value: votes ? votes.join('-') : null},
      {field: FieldType.Year, value: years ? years.join('-') : null},
      {field: FieldType.Page, value: '1'},
      {field: FieldType.SortField, value: Field.Votes.Kp, noChange: true},
      {field: FieldType.SortType, value: '-1', noChange: true},
    ];

    const newSearch = rewriteSearch({searchParams, fields});
    navigate(newSearch);
  };


  const handleResetClick = () => {
    navigate('');
    setYears(getYearsFromSearch(null));
    setRate(getRateFromSearch(null));
    setVotes(null);
    setCategory(null);
  };


  return(
    <FilterForm onSubmit={handleSubmit}>

      <YearsFilter years={years} setYears={setYears}/>
      <RatingsFilter rate={rate} setRate={setRate}/>
      <VotesFilter votes={votes} setVotes={setVotes}/>
      <CategoriesFilter category={category} setCategory={setCategory} />

      <FilterSubmit>Искать</FilterSubmit>

      <FilterReset onClick={handleResetClick}>Сбросить</FilterReset>

    </FilterForm>
  );
}

