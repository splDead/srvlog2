import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { messages } from './reducers/reducers';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import data from './data/data';

const store = createStore(
	combineReducers({ messages }),
	data
);

const render = () =>
    ReactDOM.render(
        <App store={store} />, 
        document.getElementById('root')
    );

store.subscribe(render);
render();

registerServiceWorker();
