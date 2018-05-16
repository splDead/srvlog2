// @flow

import axios from 'axios';
import moment from 'moment';
import type { ActionType, Dispatch, LogsTableType, FiltersType } from "../types/types";
import constants from "../constants/constants";

export const loadLogs = (logs: LogsTableType, filters: FiltersType): ActionType => ({
    type : constants.LOAD_LOGS,
    logs,
    filters
});

export const fetchLogs = (params: {filters: FiltersType}) => (dispatch: Dispatch) => {
    return axios.post('https://demo0073537.mockable.io/logs', params)
        .then(response => {
            dispatch(loadLogs(response.data, params.filters))
        })
        .catch(error => console.log(error));
};

export const changeTableSize = (size: number): ActionType => ({
    type : constants.TABLE_SIZE,
    size
});

export const paginationFirst = (selectedTableSize: number): ActionType => ({
    type : constants.PAGINATION_FIRST,
    selectedTableSize
});

export const paginationNext = (selectedTableSize: number): ActionType => ({
    type : constants.PAGINATION_NEXT,
    selectedTableSize
});

export const paginationPrev = (selectedTableSize: number): ActionType => ({
    type : constants.PAGINATION_PREV,
    selectedTableSize
});

export const changeDateRange = (range: string, logs: LogsTableType): ActionType => ({
    type : constants.CHANGE_DATE_RANGE,
    range,
    logs
});

export const changeExactlyDateRangeFrom = (date: moment, logs: LogsTableType): ActionType => ({
    type : constants.CHANGE_EXACTLY_DATE_RANGE_FROM,
    date,
    logs
});

export const changeExactlyDateRangeTo = (date: moment, logs: LogsTableType): ActionType => ({
    type : constants.CHANGE_EXACTLY_DATE_RANGE_TO,
    date,
    logs
});

export const changeExactlyTimeRangeFrom = (date: moment, logs: LogsTableType): ActionType => ({
    type : constants.CHANGE_EXACTLY_TIME_RANGE_FROM,
    date,
    logs
});

export const changeExactlyTimeRangeTo = (date: moment, logs: LogsTableType): ActionType => ({
    type : constants.CHANGE_EXACTLY_TIME_RANGE_TO,
    date,
    logs
});

export const changeSeverityFilters = (severity: string[]): ActionType => ({
    type : constants.CHANGE_SEVERITY_FILTERS,
    severity
});

export const changeFacilityFilters = (facility: string[]): ActionType => ({
    type : constants.CHANGE_FACILITY_FILTERS,
    facility
});

export const changeHostFilters = (host: string[]): ActionType => ({
    type : constants.CHANGE_HOST_FILTERS,
    host
});

export const clickSeverityFromDashboard = (severity: string[], selectedPeriod: string): ActionType => ({
    type: constants.SEVERITY_CLICK_FROM_DASHBOARD,
    severity,
    selectedPeriod
});
