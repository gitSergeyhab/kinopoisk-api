export default function Search() {
  return (
    <form style={{fontSize: '0.4rem', lineHeight: '0.3rem', padding: '0.4rem'}} >
      <div className="row black">
        <div className="input-field col s12">
          <input placeholder="Поиск по названию" id="search" type="text" className="validate orange-text"/>
          {/* <label htmlFor="search"></label> */}
        </div>
      </div>
    </form>
  );
}
