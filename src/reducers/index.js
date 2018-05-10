// @flow

import { combineReducers } from 'redux';
import messages from './messages';
import statistics from './statistics';
import logsTable from './logs';

export default combineReducers({
    messages,
    statistics,
    logsTable
});
