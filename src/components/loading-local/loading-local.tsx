import styled from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';

const LoaderSection = styled.section`
  width: 100vw;
  height: 100%;
  background-color: #000000;
  color: #FFFFFF;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  font-weight: 800;
  padding: 0;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function LoadingLocal() {
  return (
    <LoaderSection>
      <ScaleLoader color='white' loading height={80} width={10} radius={10} margin={10} />
      <h2>Грузим ...</h2>
    </LoaderSection>
  );
}
