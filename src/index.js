// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { App } from './App';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const middleware = [ thunk ];

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

const root = document.getElementById('root');
if (root == null) {
    throw new Error('No Root Element');
}

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, 
        root
    );

registerServiceWorker();
