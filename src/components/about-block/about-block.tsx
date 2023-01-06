import { Grade } from '../common/common.style';
import { AboutTable, InfoText, TDL, TDR, TR } from './about-block.style';


export type AboutRow = {
  point: string;
  value: string | number | null | undefined;
  our?: boolean;
  simple?: boolean;
  secondValue?: number | string
}


function RowTable({about} : {about: AboutRow}) {

  const { point, value, our, simple, secondValue } = about;
  if (!value || !value) {
    return null;
  }

  const addInfo = secondValue ? ` (${secondValue})` : null;

  const info = simple ? value : <InfoText>{value}<Grade our={our} size={1.3}>grade</Grade> {addInfo} </InfoText>;
  return (
    <TR>
      <TDL>{point}</TDL>
      <TDR>{info}</TDR>

    </TR>
  );
}

export function AboutBlock({about} : {about: AboutRow[]}) {
  const rows = about.map((item) => <RowTable key={item.point} about={item}/>);
  return (
    <AboutTable>
      <tbody>
        {rows}
      </tbody>
    </AboutTable>
  );
}
