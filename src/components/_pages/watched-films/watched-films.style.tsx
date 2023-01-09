import styled from 'styled-components';

export const DnDSection = styled.section`
  background-color: #000000;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;

  align-items: center;
  text-align: center;
  padding: 0.2rem;

  @media (min-width: 600px) {
    padding: 1rem;
  };

  transition: all 0.3s;
  & * {
    transition: all 0.3s;
  }
`;

export const DragCardList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 1rem;
  background-color: #424242;
  padding: 0.3rem;

  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (min-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0.5rem;

  };

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem;
  };

  @media (min-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
  };

  @media (min-width: 900px) {
    grid-template-columns: repeat(6, 1fr);
  };
  @media (min-width: 1200px) {
    grid-template-columns: repeat(7, 1fr);
  };

`;

export const DragCardLi = styled.li`

background-color: #000000;
  &:hover {
    border: #FFFFFF 1px solid;
  }

  &:active {
    border: #0ac037 1px solid;
  }
`;
