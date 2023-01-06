import styled from 'styled-components';

export const Grade = styled.i.attrs({className: 'material-icons'})<{our?: boolean, size?: number}>`
margin: 0 0.5rem 0 0.1rem;
  font-size: ${({size}) => size ? `${size}rem` : '0.8rem '} ;
  cursor: pointer;
  color: ${({our}) => our ? 'orange' : ''};
`;

export const IconStar = styled.i.attrs({className: 'material-icons'})<{chosen: boolean, size?: number}>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size:  ${({size}) => size ? `${size}rem` : '1rem'};
  cursor: pointer;
  color: ${({chosen}) => chosen ? 'orange' : ''};
`;

export const IconArrow = styled.i.attrs({className: 'material-icons'})`
    color: inherit;
`;

