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

  &:active {
    color: orange;
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

export const ImageContainer = styled.div`
  background-color: #212121;
  max-width: 100%;
  min-height: 160px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageWrapper = styled.div`
  width: 100%;


  @media (min-width: 600px) {
    padding: 0 5%;
  };

  @media (min-width: 900px) {
    padding: 0 10%;
  };

  @media (min-width: 1200px) {
    padding: 0 20%;
  };
`;

export const PageSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #424242;
`;

export const TitlePage = styled.h1`
  color: orange;
  text-align: center;

  font-size: 24px;

  @media (min-width: 600px) {
    font-size: 28px;
  };

  @media (min-width: 900px) {
    font-size: 32px;
  };

  @media (min-width: 1200px) {
    font-size: 36px;
  };
`;

export const TopPageBlock = styled.div`

  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  @media (min-width: 600px) {
    flex-direction: row;
    padding: 1rem;
  };
`;


export const InfoBlock = styled.div`
padding: 0.5rem;
background-color: #212121;
width: 100%;

@media (min-width: 360px) {
  padding: 2rem;
};

@media (min-width: 600px) {
  padding: 0.5rem;
  width: 50%;
};

@media (min-width: 900px) {
  padding: 2rem;
  width: 50%;
};

`;


export const ListInfoBlock = styled.div``;


export const InfoList = styled.ul`
  list-style: none;
  margin: 0.5rem 0 1rem;
  background-color: #424242;
  padding: 10px;
  box-shadow: 1px 0px 4px 2px rgb(0, 0, 0, 0.3) inset;
`;

export const InfoLi = styled.li`

font-size: 14px;


@media (min-width: 900px) {
  font-size: 16px;
};

@media (min-width: 1200px) {
  font-size: 20px;
};
`;

export const StarsImageContainer = styled.div`
background-color: #212121;
  width: 100%;

  @media (min-width: 600px) {
    width: 50%;
  };
`;
