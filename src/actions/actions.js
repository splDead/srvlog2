// @flow

import constants from '../constants/constants';
import axios from 'axios';
import type { MessageType, StatisticsType, LogsTableType, ActionType, Dispatch, DateRangeType } from '../types/types';
import type moment from 'moment';

export const readMessage = (id: string): ActionType => ({
        type : constants.READ_MESSAGE,
        id
    });

export const loadMessages = (messages: MessageType[]): ActionType => ({
        type : constants.LOAD_MESSAGES,
        messages
    });

export const fetchMessages = () => (dispatch: Dispatch) => {
    return axios.get('https://demo0073537.mockable.io/messages')
            .then(response => {
                dispatch(loadMessages(response.data.messages))
            })
            .catch(error => console.log(error));
};

export const loadStatistics = (statistics: StatisticsType): ActionType => ({
        type : constants.LOAD_STATISTICS,
        statistics
    });

export const fetctStatistics = (dateRange: DateRangeType, period?: string) => (dispatch: Dispatch) => {
    return axios.post('https://demo0073537.mockable.io/dashboard', dateRange)
            .then(response => {
                if (period) {
                    dispatch(changePeriodLogs(period));
                } else {
                    dispatch(loadStatistics(response.data.statistics))
                }
            })
            .catch(error => console.log(error));
};

export const changePeriodLogs = (period: string): ActionType => ({
        type : constants.CHANGE_PERIOD,
        period
    });

export const loadLogs = (logs: LogsTableType): ActionType => ({
        type : constants.LOAD_LOGS,
        logs 
    });

export const fetchLogs = () => (dispatch: Dispatch) => {
    return axios.get('https://demo0073537.mockable.io/logs')
            .then(response => {
                dispatch(loadLogs(response.data.logsTable))
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

export const changeDateRange = (range: string): ActionType => ({
        type : constants.CHANGE_DATE_RANGE,
        range
    });

export const changeExactlyDateRangeFrom = (date: moment): ActionType => ({
        type : constants.CHANGE_EXACTLY_DATE_RANGE_FROM,
        date
    });

export const changeExactlyDateRangeTo = (date: moment): ActionType => ({
        type : constants.CHANGE_EXACTLY_DATE_RANGE_TO,
        date
    });

export const changeExactlyTimeRangeFrom = (date: moment): ActionType => ({
        type : constants.CHANGE_EXACTLY_TIME_RANGE_FROM,
        date
    });

export const changeExactlyTimeRangeTo = (date: moment): ActionType => ({
        type : constants.CHANGE_EXACTLY_TIME_RANGE_TO,
        date
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
