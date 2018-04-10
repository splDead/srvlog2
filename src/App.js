import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Logs from './components/Logs';
import OnlineLogs from './components/OnlineLogs';
import DetailedLogs from './components/DetailedLogs';
import Hosts from './components/Hosts';

class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				<HashRouter>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/dashboard' component={Dashboard} />
							<Route path='/logs' component={Logs} />
							<Route path='/online-logs' component={OnlineLogs} />
							<Route path='/detailed-logs' component={DetailedLogs} />
							<Route path='/hosts' component={Hosts} />
						</Switch>
				</HashRouter>
			</div>
		);
	}
}

export default App;
