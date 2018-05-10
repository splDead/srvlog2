// @flow

import moment from 'moment';
import type { ActionType, StatisticsType } from "../types/types";
import {getDateRange} from "../utils/MiscUtils";
import constants from "../constants/constants";
import defaults from '../data/defaults';

const initialState: StatisticsType = {
    selectedPeriod: defaults.statistics.selectedPeriod
};

const filterLogs = (state, period = constants.period.THIS_MONTH) => {
    let { startDate, endDate } = getDateRange(period);
    let filteredLogs = state.logs && state.logs.filter(log =>
        moment(log.date).isSameOrAfter(startDate) && moment(log.date).isSameOrBefore(endDate)
    );

    let summary = [];
    filteredLogs && filteredLogs.forEach(log => {
        log.severity.forEach(s => {
            let index = summary.findIndex(el => el.caption === s.caption);
            if (index !== -1) {
                summary[index].count += s.count;
            } else {
                summary.push(Object.assign({}, s));
            }
        });
    });

    return {filteredLogs, summary};
};

const statistics = (state: StatisticsType = initialState, action: ActionType): StatisticsType => {
    switch (action.type) {
        case constants.CHANGE_PERIOD:
            return {
                ...state,
                logs : state.logs,
                selectedPeriod : action.period,
                ...filterLogs(state, action.period)
            };
        case constants.LOAD_STATISTICS:
            return {
                ...state,
                logs : action.statistics.logs,
                selectedPeriod : state.selectedPeriod,
                ...filterLogs(action.statistics, state.selectedPeriod)
            };
        default:
            return state;
    }
};

export default statistics;
