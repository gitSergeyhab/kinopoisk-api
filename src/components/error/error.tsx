import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorSection = styled.section`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000000;
  border: orange 3px solid;
  color: #FFFFFF;
  box-sizing: border-box;
  margin: auto;
  box-shadow: 2px 2px 4px 0px #fcfafa7f;
`;

const MainLink = styled(Link)`
  text-decoration: none;
  color: #FFFFFF;
  &:hover {
    color: orange;

  }
`;

export function Error() {
  return (
    <ErrorSection>
      <h1> Что-то пошло не так ... </h1>
      <h2><MainLink to={'/'}> На главную</MainLink></h2>
    </ErrorSection>

  );
}
