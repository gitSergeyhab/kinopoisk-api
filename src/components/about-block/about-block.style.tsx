import styled from 'styled-components';

export const AboutTable = styled.table`
  border-spacing: 1; 
  border-collapse: collapse; 
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
`;

export const TR = styled.tr`
  height: 32px; 
  border-bottom: 1px solid #424242;

    font-size: 16px;
    @media (min-width: 600px) {
    font-size: 14px;
    };

    @media (min-width: 900px) {
    font-size: 20px;
    };

    @media (min-width: 1400px) {
    font-size: 24px;
    };
`;

export const TDL = styled.td`
padding-left: 10px;
`;

export const TDR = styled.td`
text-align: end;
`;

export const InfoText = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
`;
