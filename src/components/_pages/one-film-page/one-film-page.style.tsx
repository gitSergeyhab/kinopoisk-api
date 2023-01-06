import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
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

export const OneFilmSection = styled.section`
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

export const FilmImageContainer = styled.div`
  background-color: #212121;
  max-width: 100%;
  min-height: 160px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StarsImageContainer = styled.div`
background-color: #212121;
  width: 100%;

  @media (min-width: 600px) {
    width: 50%;
  };

`;

export const Image = styled.img`
background-color: #000000;
  width: 100%;


`;

export const FilmTopBlock = styled.div`
  
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  @media (min-width: 600px) {
    flex-direction: row;
    padding: 1rem;
  };
`;


export const FilmInfoBlock = styled.div`
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

export const Subtitle2 = styled.h2`
  color: #000000;
  font-size: 24px;
  text-align: center;
`;

export const Subtitle3 = styled.h3`
  color: #FFFFFF;
  font-size: 22px;
  text-align: start;
  padding-left: 1rem;
  margin: 0.5rem 0;
`;

export const InfoList = styled.ul`
  list-style: none;
  margin: 0.5rem 0 1rem;
  background-color: #424242;
  padding: 10px;
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


export const DirectorLink = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  &:hover {
    color: orange;
  }
`;
