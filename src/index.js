import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { App } from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { messages, statistics, logsTable } from './reducers/reducers';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    combineReducers({ messages, statistics, logsTable }),
    applyMiddleware(thunk)
);

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, 
        document.getElementById('root')
    );

registerServiceWorker();
