import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderEl = styled.header`
  width: 100%;
  padding: 1rem 0.2rem;
  min-width: 320px;
  box-sizing: border-box;
  box-shadow: 0px 5px 8px 0px rgba(178, 181, 184, 0.4);
  margin-bottom: 1rem;


  & * {
    box-sizing: border-box;
    transition: 0.3s all;
  }

  @media (min-width: 480px) {
    padding: 1rem;
  };
`;

export const HeaderContainer = styled.div`
`;

export const LogoLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 700;


  &:hover {
    color: orange;
  }
`;

export const LogoSVGContainer = styled.div`
  width: 20px;
  height: 20px;
`;

export const HeaderNav = styled.nav`
`;

export const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;


  @media (min-width: 480px) {
    flex-direction: row;
  };
`;

export const NavLi = styled.li`
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const LogoNavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    flex-direction: row;
  };

  @media (min-width: 900px) {
    padding: 0 5rem;
  };
`;
