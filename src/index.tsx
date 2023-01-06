import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { setLocalDB } from './store/action';
import { getFilmsDataFromStorage } from './utils/storage-utils';

import 'normalize.css';

// загрузить БД из локал-стораж в редюсер  (при обнослении данных: в редюсере - компонент перерендеривается, в ЛС - нет)
const storageDb = getFilmsDataFromStorage();
store.dispatch(setLocalDB(storageDb));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root'));
