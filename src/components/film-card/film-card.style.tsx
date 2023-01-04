import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const ImageContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 5px solid transparent;
  &:hover, &:focus {
    outline: 1px solid orange;
  }
`;


export const Grade = styled.i.attrs({className: 'material-icons'})<{our?: boolean}>`
  font-size: 0.8rem !important;
  cursor: pointer;
  color: ${({our}) => our ? 'orange' : ''};
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

  min-height: 70px;

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
