import './loading.css';

export default function Loading() {
  return (
    <div className="row black">
      <div className="col s1"></div>
      <div className="col s10 brown darken-3 white-text text-lighten-4">
        <h2 className="header center-align">Загружаем ...</h2>
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
    </div>
  );
}
