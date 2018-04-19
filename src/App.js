import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Statistics from './components/Statistics';
import Logs from './components/Logs';
import OnlineLogs from './components/OnlineLogs';
import DetailedLogs from './components/DetailedLogs';
import Hosts from './components/Hosts';
import { PageTemplate } from './components/PageTemplate';

export const App = () => {
	return (
		<div className="container-fluid">
			<HashRouter>
				<PageTemplate>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/dashboard' component={Statistics} />
						<Route path='/logs' component={Logs} />
						<Route path='/online-logs' component={OnlineLogs} />
						<Route path='/detailed-logs' component={DetailedLogs} />
						<Route path='/hosts' component={Hosts} />
					</Switch>
				</PageTemplate>
			</HashRouter>
		</div>
	);
}
