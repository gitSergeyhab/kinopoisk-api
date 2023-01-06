import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const ImageContainer = styled.div`
  max-width: 100%;
  min-height: 160px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover, &:focus {
    opacity: 0.8;
  }
`;

export const Image = styled.img`
background-color: #000000;
  max-width: 100%;
`;

export const CardLi = styled.li`
  background-color: #000000;
  border: #000000 1px solid;
  transition: 0.15s all;
  &:hover {
    border: #FFFFFF 1px solid;
  }

  & * {
    transition: 0.3s all;
  }
`;

export const Title = styled.h3`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  word-wrap: break-word;
  word-break: break-word; /* для Chrome */
  min-height: 80px;

  
  @media (min-width: 1400px) {
    font-size: 1.5rem;
  };

  @media (min-width: 2000px) {
    font-size: 2.2rem;
  };

  @media (min-width: 3000px) {
    font-size: 3rem;
  };
`;

export const TitleLink = styled(Link)`
  color: orange;
  text-decoration: none;

  &:hover, &:focus {
    color: #da9007;
  }
`;

export const ImageLink = styled(Link)`
`;

export const CardContent = styled.div`
  color: #FFFFFF;
  padding: 0 14%;
`;

export const CardInfo = styled.div`
`;
export const CardText = styled.p``;

export const NoImageText = styled.p`
  color: white;
  text-decoration: none;
  text-align: center;
`;
