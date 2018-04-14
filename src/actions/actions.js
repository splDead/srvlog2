import constants from '../constants/constants';

export const readMessage = id =>
    ({
        type : constants.READ_MESSAGE,
        id
    })

export const changePeriodLogs = period =>
    ({
        type : constants.CHANGE_PERIOD,
        period
    })