// @flow

import { combineReducers } from 'redux';
import messages from './messages';
import statistics from './statistics';
import logsTable from './logs';
import onlineLogs from './onlineLogs';

export default combineReducers({
    messages,
    statistics,
    logsTable,
    onlineLogs
});
