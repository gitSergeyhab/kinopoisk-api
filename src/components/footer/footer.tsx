import styled from 'styled-components';

const USED_LIBRARIES = [
  {name: 'react', href: 'https://www.npmjs.com/package/react'},
  {name: '@reduxjs/toolkit', href: 'https://www.npmjs.com/package/@reduxjs/toolkit'},
  {name: 'styled-components', href: 'https://www.npmjs.com/package/styled-components'},
  {name: 'nouislider-react', href: 'https://www.npmjs.com/package/nouislider-react'},
  {name: 'react-select', href: 'https://www.npmjs.com/package/react-select'},
];


const FooterEl = styled.footer`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  box-shadow: 0px -5px 8px 0px rgba(178, 181, 184, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
  height: 140px;

  @media (min-width: 600px) {
    padding: 2rem;
  };

  @media (min-width: 900px) {
    padding: 2rem 4rem;
  };

  @media (min-width: 1200px) {
    padding: 2rem 8rem;
  };

  & * {
    box-sizing: border-box;
    transition: 0.3s all;
  }
`;

const Part = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResourceList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SideLink = styled.a`
  color: #FFFFFF;
  text-decoration: none;

  &:hover {
    color: orange;
  }

`;

function NPMLink ({library} : {library : {name: string, href: string}}) {
  return <li><SideLink href={library.href} target={'_blank'} rel="noreferrer">{library.name}</SideLink></li>;
}


export default function Footer() {

  const libraryList = USED_LIBRARIES.map((item) => <NPMLink key={item.name} library={item}/>);

  return (
    <FooterEl>

      <Part>

        <ResourceList>
          {libraryList}
        </ResourceList>

      </Part>
      <Part>
        <p className="grey-text text-lighten-4"><SideLink href='https://github.com/gitSergeyhab' target='_blank' rel="noreferrer">Мой GitHub</SideLink></p>
      </Part>

    </FooterEl>
  );
}
