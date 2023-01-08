import { Subtitle2 } from '../common/common.style';
import { AdditionalList, AdditionalSection } from './additional-block.style';

type AdditionalBlockProps = {
  name: string
  elements: JSX.Element[] | null,
  button: JSX.Element | null
}

export function AdditionalBlock({name, elements, button} : AdditionalBlockProps) {
  return (
    <AdditionalSection>
      <Subtitle2>{name}</Subtitle2>
      <AdditionalList>
        {elements}
      </AdditionalList>
      {button}
    </AdditionalSection>
  );
}
