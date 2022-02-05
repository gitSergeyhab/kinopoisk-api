import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Options } from '../../../const';
import { setVoteOption } from '../../../store/action';
import { getVoteOptionFromSearch } from '../../../utils/url-utils';


const colourStyles = {
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? 'black' : 'white',
    color: state.isSelected ? 'white' : 'black',
  }),
};


export default function VotesFilter () {


  const [searchParams] = useSearchParams();

  const optionFromUrl = getVoteOptionFromSearch(searchParams);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVoteOption(optionFromUrl));
  }, [optionFromUrl, dispatch]);


  return (
    <fieldset className='grey darken-3'>
      <legend>Популярновть</legend>
      <div className='react-filters'>
        <div className='react-filters-text'>
          <div className="App">
            <Select

              defaultValue={optionFromUrl}
              onChange={(item) => {
                if (Array.isArray(item)) {
                  throw new Error('Unexpected type passed to ReactSelect onChange handler');
                }

                if (!item) {
                  throw new Error('Unexpected type passed to ReactSelect onChange handler');
                }
                dispatch(setVoteOption(item));
              }}
              options={Options}
              styles={colourStyles}
            />
          </div>
        </div>


      </div>
    </fieldset>

  );
}
