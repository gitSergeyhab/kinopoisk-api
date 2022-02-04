import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createAPI } from './services/api';

import 'materialize-css';
import { Provider } from 'react-redux';
import { store } from './store/store';

// const api = createAPI();

// api.get('/character?name=/ga/i').then((res) => console.log(res)).catch((e) => console.log('error!!!', e));
// api.get(`${URL_BY_ID}&token=${PUBLIC_TOKEN}`).then((res) => console.log(res)).catch((e) => console.log('error!!!', e));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root'));
