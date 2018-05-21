// @flow

import { combineReducers } from 'redux';
import messages from './messages';
import dashboard from './dashboard';
import logsTable from './logs';
import onlineLogs from './onlineLogs';
import detailedLogs from './detailedLogs';

export default combineReducers({
    messages,
    statistics: dashboard,
    logsTable,
    onlineLogs,
    detailedLogs
});
