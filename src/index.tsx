import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { setLocalDB } from './store/action';
import { getFilmsDataFromStorage } from './utils/storage-utils';
import { ToastContainer } from 'react-toastify';

import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

const storageDb = getFilmsDataFromStorage();
store.dispatch(setLocalDB(storageDb));


ReactDOM.render(
  <React.StrictMode>

    <ToastContainer/>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root'));
