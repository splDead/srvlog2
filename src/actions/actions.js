import constants from '../constants/constants';

export const readMessage = id =>
    ({
        type : constants.READ_MESSAGE,
        id
    });

export const changePeriodLogs = period =>
    ({
        type : constants.CHANGE_PERIOD,
        period
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
