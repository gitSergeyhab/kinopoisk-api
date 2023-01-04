

import styled from 'styled-components';


export const FilterForm = styled.form`
  min-width: 170px;
  background-color: #212121;
  color: #FFFFFF;
  padding: 10px 2px;
  font-size: smaller;
  box-sizing: border-box;
  & * {
    box-sizing: border-box;
    transition: all 0.3s;
  }

  & > * {
    box-shadow: 2px 2px 4px 0px rgba(197, 213, 224, 0.2);
    &:hover {
      box-shadow: 2px 2px 4px 0px rgba(197, 213, 224, 0.6);
    }
  }
`;

export const FilterFieldset = styled.fieldset`
  background-color: #424242;
  padding: 15px 15px;
  text-align: left;
  margin-bottom: 1rem;
`;


export const TextBlockFilter = styled.div`
  color: orange;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 0.2rem;
`;

export const IconFilter = styled.i`
  font-size: 1rem;
`;

export const FilterButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.4rem;
  border: 1px #FFFFFF solid;
  cursor: pointer;

  &:hover {
    border: 1px orange solid;
    box-shadow: 2px 2px 4px 0px rgba(221, 182, 7, 0.6);
  }
  &:active {
    color: orange;
  }
`;

export const FilterSubmit = styled(FilterButton).attrs({type: 'submit'})`
  color: #FFFFFF;
  background-color: #000000;
`;

export const FilterReset = styled(FilterButton).attrs({type: 'button'})`
  color: #FFFFFF;
  background-color: #424242;
`;
