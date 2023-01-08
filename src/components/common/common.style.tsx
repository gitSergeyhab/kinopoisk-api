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

export const WideButton = styled.button.attrs({type: 'button'})`
  width: 100%;
  cursor: pointer;
  margin-bottom: 0.1rem;
  font-size: 18px;
  background-color: #000000;
  color:#000000;
  height: 2rem;
  color: #FFFFFF;
  border: 2px solid #000000;

  &:hover {
    border: 2px solid #FFFFFF;
  }

`;

export const Subtitle2 = styled.h2`
  color: #000000;
  font-size: 24px;
  text-align: center;

  @media (min-width: 900px) {
    font-size: 28px;
  };

  @media (min-width: 1200px) {
    font-size: 32px;
  };
`;

export const Subtitle3 = styled.h3`
  color: #FFFFFF;
  font-size: 22px;
  text-align: start;
  padding-left: 1rem;
  margin: 0.5rem 0;

  @media (min-width: 900px) {
    font-size: 24px;
  };

  @media (min-width: 1200px) {
    font-size: 28px;
  };
`;
export const Image = styled.img`
  background-color: #000000;
  display: block;
  width: 100%;
  object-fit: contain;
  height: 100%;
`;
