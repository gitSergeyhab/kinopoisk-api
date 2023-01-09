import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image } from '../common/common.style';


export const SearchForm = styled.form`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

export const SearchInput = styled.input.attrs({ placeholder: 'минимум 4 символа, дебонс 1с - есть лимит на кол-во запросов', id: 'search', type:'text'})`
  width: 100%;
  padding: 0.2rem 1rem;
`;

export const ResultUl = styled.ul`
  position: absolute;
  width: 100%;
  margin: 0;
  list-style: none;
  padding: 0;
  z-index: 3;
`;

export const ResultLi = styled.li`
  width: 100%;
`;

export const ResultHeader = styled.h4`
  font-size: inherit;
  color: #FFFFFF;
  background-color: #212121;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem 0.4rem;
  margin: 0;
  height: 100%;
  border-bottom: #424242 1px solid;
`;

export const ResultLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: grid;
  grid-template-columns: 12% 73% 15%;
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
    box-shadow: 1px 0px 4px 2px rgb(0, 0, 0, 0.3);
    color: orange
  }
`;

export const ResultImg = styled(Image)`
  height: 30px;
  width: 22px;
  background-color: #FFFFFF;


  @media (min-width: 600px) {
    height: 45px;
    width: 30px;
  };

  @media (min-width: 900px) {
    height: 60px;
    width: 45px;
  };

  @media (min-width: 1200px) {
    height: 70px;
    width: 50px;
  };
`;

export const FormWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BadNewsMessage = styled.div`
  text-align: center;
  color: #FFFFFF;
  width: 100%;
  font-size: 12px;
  padding-top: 2px;
`;
