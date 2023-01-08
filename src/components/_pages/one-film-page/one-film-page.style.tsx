import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image } from '../../common/common.style';


export const DirectorLink = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  &:hover {
    color: orange;
  }
`;


export const SimpleText = styled.p`
  font-size: 14px;

@media (min-width: 900px) {
  font-size: 16px;
};

@media (min-width: 1200px) {
  font-size: 20px;
};
`;


export const SpanText = styled.span`
  font-size: 20px;
  text-align: center;
  margin: 0.2rem 0;
`;


export const AddImage = styled(Image)`
background-color: #424242;
&:hover {
  box-shadow: 1px 0px 4px 4px rgb(0, 0, 0, 0.3);
}
`;

export const AddImageLink = styled(Link)`
display: block;
height: 280px;
`;

export const DescriptionSection = styled.section`
color: #FFFFFF;
background-color: #212121;
padding: 1rem 2rem;

font-size: 18px;


@media (min-width: 900px) {
  font-size: 22px;
};

@media (min-width: 1200px) {
  font-size: 26px;
};
`;

export const AdditionalLi = styled.li`
text-align: center;
  width: 100%;
  height: 100%;
`;

export const AdditionalTitle = styled.h3`
  color: #FFFFFF;
  font-size: 22px;
  text-align: center;
  margin: 0.5rem 0;
`;
