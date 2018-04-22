import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { messages, statistics, logsTable } from './reducers/reducers';

const store = createStore(
    combineReducers({ messages, statistics, logsTable }),
    applyMiddleware(thunk)
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, 
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
