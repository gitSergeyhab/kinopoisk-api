import Select from 'react-select';
import { Options, TOO_MANY_VOTES } from '../../../const';
import { FilterFieldset } from '../filter.style';


export const getVoteOptionFromSearch = (votes: number[] | null) => {

  if (!votes || !votes.length) {
    return Options[0];
  }

  if (votes[0] < +Options[4].value) {
    return Options[0];
  }
  if (votes[0] < +Options[3].value) {
    return Options[4];
  }
  if (votes[0] < +Options[2].value) {
    return Options[3];
  }
  if (votes[0] < +Options[1].value) {
    return Options[2];
  }

  return Options[1];
};


type VotesFilterProps = {
  votes: number[] | null,
  setVotes: React.Dispatch<React.SetStateAction<number[] | null>>
};

export default function VotesFilter ({votes, setVotes} : VotesFilterProps) {

  const optionFromUrl = getVoteOptionFromSearch(votes);

  return (
    <FilterFieldset className='grey darken-3'>
      <legend>Популярновть</legend>

      <Select

        value={optionFromUrl}
        onChange={(item) => {
          if (Array.isArray(item)) {
            throw new Error('Unexpected type passed to ReactSelect onChange handler');
          }

          if (!item) {
            throw new Error('Unexpected type passed to ReactSelect onChange handler');
          }
          setVotes([+item.value, TOO_MANY_VOTES]);
        }}
        options={Options}
        styles={{
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? 'black' : 'white',
            color: state.isSelected ? 'white' : 'black',
          }),
        }}
      />
    </FilterFieldset>

  );
}
