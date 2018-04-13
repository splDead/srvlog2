import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { messages, statistics } from './reducers/reducers';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import data from './data/data';

const store = createStore(
	combineReducers({ messages, statistics }),
    data
);

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, 
        document.getElementById('root')
    );

registerServiceWorker();
