import styled from 'styled-components';


export const ProfTabs = styled.ul`
  margin: 0;
  padding: 0.4rem 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #424242;
`;

export const ProfTab = styled.li``;

export const ProfTabBtn = styled.button.attrs({ type: 'button' })<{active: number}>`
font-weight: 700;
  cursor: ${({ active }) => !active ? 'pointer' : ''};
  background-color: ${({ active }) => active ? '#000000' : '#FFFFFF'};
  color: ${({ active }) => !active ? '#000000' : '#FFFFFF'};

  :hover {
    color: ${({ active }) => !active ? 'orange' : '#FFFFFF'};
  }
`;


