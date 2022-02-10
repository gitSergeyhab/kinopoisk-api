import './loading-local.css';

export default function LoadingLocal() {
  return (
    <div className="react-loader-local">
      <h2 className="header center-align">База данных слишком большая ...</h2>
      <h2 className="header center-align">Кинопоиск АПИ устал...</h2>
      <h2 className="header center-align">Но он старается..</h2>


      <div className="react-loader">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
