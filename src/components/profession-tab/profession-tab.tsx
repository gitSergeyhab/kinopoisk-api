import { ProfTab, ProfTabBtn, ProfTabs } from './profession-tab.style';

type ProfessionType = {profession: string, currentProf: string, onClickSetProf: () => void}
type ProfessionsType = {
  professions?: string[],
  currentProf?: string,
  setCurrentProf?: (value: React.SetStateAction<string>) => void
}


export function ProfessionTab({profession, currentProf, onClickSetProf} : ProfessionType) {
  const active = currentProf === profession ? 1 : 0;

  return (
    <ProfTab>
      <ProfTabBtn active={active} onClick={onClickSetProf}>
        {profession}
      </ProfTabBtn>
    </ProfTab>
  );
}

export function ProfessionTabs({professions, currentProf, setCurrentProf} : ProfessionsType) {
  if (!professions || !professions.length || !currentProf || !setCurrentProf ) {
    return null;
  }

  const professionList = professions.map((item) => (
    <ProfessionTab
      key={item}
      profession={item}
      currentProf={currentProf}
      onClickSetProf={() => setCurrentProf(item)}
    />),
  );

  return <ProfTabs>{professionList}</ProfTabs>;
}
