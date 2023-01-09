import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image, WideButton } from '../../common/common.style';


export const Popup = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 3;

  & * {
    transition: all 0.3s;
  }
`;

export const PopupBody = styled.div`
  min-height: 10%;
  display: flex;

  justify-content: center;
`;


export const PopupContent = styled.div`
  width: 100%;
  max-height: 100vh;
  padding: 1rem 0.2rem;
  position: relative;
  overflow-y: auto;
  background: black;
  font-size: 10px;


  @media (min-width: 400px) {
    width: 90%;
    font-size: 11px;
    padding: 0.4rem;
  };

  @media (min-width: 600px) {
    width: 80%;
    font-size: 12px;
    padding: 1rem;

  };

  @media (min-width: 900px) {
    width: 60%;
    font-size: 14px;
  };

  @media (min-width: 1200px) {
    font-size: 18px;
  };

  @media (min-width: 1600px) {
    font-size: 22px;
  };

`;


export const PopupTabs = styled.ul`
  margin: 0;
  padding: 0.4rem 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #424242;
`;

export const PopupTab = styled.li``;

export const TabBtn = styled.button.attrs({ type: 'button' })<{active: number}>`
font-weight: 700;
  cursor: ${({ active }) => !active ? 'pointer' : ''};
  background-color: ${({ active }) => active ? '#000000' : '#FFFFFF'};
  color: ${({ active }) => !active ? '#000000' : '#FFFFFF'};

  :hover {
    color: ${({ active }) => !active ? 'orange' : '#FFFFFF'};
  }
`;

export const PersonUl = styled.ul`
  width: 100%;
  margin: 0;
  list-style: none;
  padding: 0.2rem;
  border: #212121 0.2rem solid;



`;

export const PersonLi = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.4rem;

  color: #000000;
  background-color: #FFFFFF;
  border-bottom: #424242 1px solid;
  &:first-child {
    border-bottom: #424242 1px solid;
  }

  &:hover {
    background-color: #e2dede;
  }

  @media (min-width: 600px) {
    padding: 0.1rem 1rem;
  };
`;

export const PersonLink = styled(Link)`
  color: #000000;
  text-decoration: none;

  &:hover {
    box-shadow: 1px 0px 4px 2px rgb(0, 0, 0, 0.3);
    color: orange
  }

`;

export const PersonImg = styled(Image)`
  height: 50px;
  width: 35px;
  background-color: #FFFFFF;



  @media (min-width: 600px) {
    height: 80px;
    width: 60px;
  };

  @media (min-width: 900px) {
    height: 100px;
    width: 70px;
  };

  @media (min-width: 1200px) {
    height: 120px;
    width: 100px;
  };
`;

export const NamePerson = styled.p`
padding: 0 1rem;
text-align: center;
`;

export const CloseBtn = styled(WideButton)`
  width: 2rem;
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 2px solid #FFFFFF;
  border-radius: 50%;

  &:hover {
    color: red;
  }

`;
