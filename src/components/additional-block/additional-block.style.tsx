import styled from 'styled-components';

export const AdditionalList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  background-color: #424242;
  gap: 1rem;

  @media (min-width: 400px) {
    grid-template-columns: 1fr 1fr;
  };

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  };
`;


export const AdditionalSection = styled.section`
  border: 1rem solid #212121;
  box-shadow: 1px 0px 4px 4px rgb(0, 0, 0, 0.3);
`;
