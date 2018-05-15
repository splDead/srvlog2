// @flow

import constants from "../constants/constants";
import defaults from '../data/defaults';
import type { ActionType, OnlineLogsTableType } from '../types/types';

const initialState: OnlineLogsTableType = {
    latestLogs: defaults.onlineLogs.latestLogs,
    timeDurationUpdate: defaults.onlineLogs.timeDurationUpdate,
    host: defaults.onlineLogs.host
};

const onlineLogs = (state: OnlineLogsTableType = initialState, action: ActionType): OnlineLogsTableType  => {
    switch(action.type) {
        case constants.LOAD_ONLINE_LOGS:
            return {
                ...state,
                logs: action.logs,
                hostsOptions: action.hostsOptions
            };
        case constants.CHANGE_ONLINE_LOGS_FILTERS:
            return {
                ...state,
                latestLogs: action.latestLogs,
                host: action.host,
                logs: action.logs
            };
        case constants.CHANGE_DURATION_UPDATE:
            return {
                ...state,
                timeDurationUpdate: action.timeDurationUpdate
            };
        default:
            return state;
    }
};

export default onlineLogs;
