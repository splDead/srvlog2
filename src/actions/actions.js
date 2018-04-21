// @flow
import constants from '../constants/constants';
import axios from 'axios';
import { type MessageType, type StatisticsType, type LogsType, type LogsTableType} from '../types/types';

export const readMessage = (id: string) =>
    ({
        type : constants.READ_MESSAGE,
        id
    });

export const loadMessages = (messages: MessageType[]) =>
    ({
        type : constants.LOAD_MESSAGES,
        messages
    });

export const fetchMessages = () => (dispatch: any) => {
    return axios.get('http://p1703.mocklab.io/messages')
            .then(response => {
                dispatch(loadMessages(response.data.messages))
            })
            .catch(error => console.log(error));
}

export const loadStatistics = (statistics: StatisticsType[]) =>
    ({
        type : constants.LOAD_STATISTICS,
        statistics
    });

export const fetctStatistics = () => (dispatch: any) => {
    return axios.get('http://p1703.mocklab.io/dashboard')
            .then(response => {
                dispatch(loadStatistics(response.data.statistics))
            })
            .catch(error => console.log(error));
}

export const changePeriodLogs = (period: string) =>
    ({
        type : constants.CHANGE_PERIOD,
        period
    });

export const loadLogs = (logs: LogsType) =>
    ({
        type : constants.LOAD_LOGS,
        logs 
    });

export const fetchLogs = () => (dispatch: any) => {
    return axios.get('http://p1703.mocklab.io/logs')
            .then(response => {
                dispatch(loadLogs(response.data.logsTable))
            })
            .catch(error => console.log(error));
}

export const changeTableSize = (size: number) =>
    ({
        type : constants.TABLE_SIZE,
        size
    });

export const paginationFirst = (selectedTableSize: number) =>
    ({
        type : constants.PAGINATION_FIRST,
        selectedTableSize
    });

export const paginationNext = (selectedTableSize: number) =>
    ({
        type : constants.PAGINATION_NEXT,
        selectedTableSize
    });

export const paginationPrev = (selectedTableSize: number) =>
    ({
        type : constants.PAGINATION_PREV,
        selectedTableSize
    });

export const changeDateRange = (range: string) =>
    ({
        type : constants.CHANGE_DATE_RANGE,
        range
    });

export const changeExactlyDateRangeFrom = (date: string) =>
    ({
        type : constants.CHANGE_EXACTLY_DATE_RANGE_FROM,
        date
    });

export const changeExactlyDateRangeTo = (date: string) =>
    ({
        type : constants.CHANGE_EXACTLY_DATE_RANGE_TO,
        date
    });

export const changeExactlyTimeRangeFrom = (date: string) =>
    ({
        type : constants.CHANGE_EXACTLY_TIME_RANGE_FROM,
        date
    });

export const changeExactlyTimeRangeTo = (date: string) =>
    ({
        type : constants.CHANGE_EXACTLY_TIME_RANGE_TO,
        date
    });

export const changeSeverityFilters = (severity: string[]) =>
    ({
        type : constants.CHANGE_SEVERITY_FILTERS,
        severity
    });

export const changeFacilityFilters = (facility: string[]) =>
    ({
        type : constants.CHANGE_FACILITY_FILTERS,
        facility
    });

export const changeHostFilters = (host: string[]) =>
    ({
        type : constants.CHANGE_HOST_FILTERS,
        host
    });
