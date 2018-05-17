// @flow

import axios from 'axios';
import type { ActionType, Dispatch, StatisticsType, DateRangeType } from '../types/types';
import constants from '../constants/constants';

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
