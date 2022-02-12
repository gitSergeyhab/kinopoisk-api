import './loading-local.css';

export default function LoadingLocal() {
  return (
    <div className="react-loader-local">
      <p className="header center-align">
      База данных слишком большая ... <br/>
      Кинопоиск АПИ устал...<br/>
      Но он старается...
      </p>


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
