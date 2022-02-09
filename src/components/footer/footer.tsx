
const USED_LIBRARIES = [
  {name: 'react', href: 'https://www.npmjs.com/package/react'},
  {name: '@reduxjs/toolkit', href: 'https://www.npmjs.com/package/@reduxjs/toolkit'},
  {name: 'axios', href: 'https://www.npmjs.com/package/axios'},
  {name: 'materialize-css', href: 'https://www.npmjs.com/package/materialize-css'},
  {name: 'nouislider-react', href: 'https://www.npmjs.com/package/nouislider-react'},
  {name: 'react-select', href: 'https://www.npmjs.com/package/react-select'},
];


function NPMLink ({library} : {library : {name: string, href: string}}) {
  return <li><a className="grey-text text-lighten-3" href={library.href} target={'_blank'} rel="noreferrer">{library.name}</a></li>;
}


export default function Footer() {

  const libraryList = USED_LIBRARIES.map((item) => <NPMLink key={item.name} library={item}/>);
  return (
    <footer className="page-footer grey darken-3">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">

            <h5 className="white-text">Использованные библиотеки</h5>
            <ul>

              {libraryList}

            </ul>

          </div>
          <div className="col l4 offset-l2 s12">

            <h5 className="white-text">Мой GitHub</h5>
            <p className="grey-text text-lighten-4"><a className="grey-text text-lighten-3" href='https://github.com/gitSergeyhab' target='_blank' rel="noreferrer">Мой GitHub</a></p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          ...
        </div>
      </div>
    </footer>
  );
}
