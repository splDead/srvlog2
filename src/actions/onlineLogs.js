// @flow

import constants from '../constants/constants';
import axios from 'axios';
import type {
    ActionType,
    Dispatch,
    LogsType
} from '../types/types';

export const fetchOnlineLogs = (host: string, latestLogs: number, source?: string) => (dispatch: Dispatch) => {
    return axios.post('https://demo0073537.mockable.io/online-logs', { host, latestLogs })
        .then(response => {
            if (source === 'HOST') {
                dispatch(changeLatestLogs(host, latestLogs, response.data.logs));
            } else {
                dispatch(loadOnlineLogs(response.data.logs, response.data.hostsOptions));
            }
        })
        .catch(error => console.log(error))
};

export const loadOnlineLogs = (logs: LogsType[], hostsOptions: string[]): ActionType => ({
    type: constants.LOAD_ONLINE_LOGS,
    logs,
    hostsOptions
});

export const changeLatestLogs = (host: string, latestLogs: number, logs: LogsType[]): ActionType => ({
    type: constants.CHANGE_ONLINE_LOGS_FILTERS,
    host,
    latestLogs,
    logs
});

export const changeDurationUpdate = (timeDurationUpdate: number): ActionType => ({
    type: constants.CHANGE_DURATION_UPDATE,
    timeDurationUpdate
});
