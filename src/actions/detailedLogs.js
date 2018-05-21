// @flow

import constants from '../constants/constants';
import axios from 'axios';
import type { ActionType, Dispatch, DetailedLogsTableType } from "../types/types";

export const fetchDetailedLogs = (typeData: string, date: string) => (dispatch: Dispatch) => {
    return axios.post('https://demo0073537.mockable.io/detailed-logs', { typeData, date })
            .then(response => {
                dispatch(loadDetailedLogs(response.data.table, response.data.typeData));
            })
            .catch(error => console.log(error));
};

export const loadDetailedLogs = (table: DetailedLogsTableType, typeData: string): ActionType => ({
    type: constants.LOAD_DETAILED_LOGS,
    table,
    typeData
});

export const changeDetailedLogsTypeData = (typeData: string): ActionType => ({
    type: constants.CHANGE_DETAILED_LOGS_TYPE_DATA,
    typeData
});

export const changeDetailedLogsDate = (date: string): ActionType => ({
    type: 'CHANGE_DETAILED_LOGS_DATE',
    date
});
