import constants from '../constants/constants';

export const readMessage = id =>
    ({
        type : constants.READ_MESSAGE,
        id
    });

export const loadMessages = messages =>
    ({
        type : constants.LOAD_MESSAGES,
        messages
    });

export const loadStatistics = statistics =>
    ({
        type : constants.LOAD_STATISTICS,
        statistics
    })

export const changePeriodLogs = period =>
    ({
        type : constants.CHANGE_PERIOD,
        period
    });

export const loadLogs = logs =>
    ({
        type : constants.LOAD_LOGS,
        logs 
    });

export const changeTableSize = size =>
    ({
        type : constants.TABLE_SIZE,
        size
    });

export const paginationFirst = selectedTableSize =>
    ({
        type : constants.PAGINATION_FIRST,
        selectedTableSize
    });

export const paginationNext = selectedTableSize =>
    ({
        type : constants.PAGINATION_NEXT,
        selectedTableSize
    });

export const paginationPrev = selectedTableSize =>
    ({
        type : constants.PAGINATION_PREV,
        selectedTableSize
    });

export const changeDateRange = range =>
    ({
        type : constants.CHANGE_DATE_RANGE,
        range
    });

export const changeExactlyDateRangeFrom = date =>
    ({
        type : constants.CHANGE_EXACTLY_DATE_RANGE_FROM,
        date
    });

export const changeExactlyDateRangeTo = date =>
    ({
        type : constants.CHANGE_EXACTLY_DATE_RANGE_TO,
        date
    });

export const changeExactlyTimeRangeFrom = date =>
    ({
        type : constants.CHANGE_EXACTLY_TIME_RANGE_FROM,
        date
    });

export const changeExactlyTimeRangeTo = date =>
    ({
        type : constants.CHANGE_EXACTLY_TIME_RANGE_TO,
        date
    });

export const changeSeverityFilters = severity =>
    ({
        type : constants.CHANGE_SEVERITY_FILTERS,
        severity
    });

export const changeFacilityFilters = facility =>
    ({
        type : constants.CHANGE_FACILITY_FILTERS,
        facility
    });

export const changeHostFilters = host =>
    ({
        type : constants.CHANGE_HOST_FILTERS,
        host
    });
