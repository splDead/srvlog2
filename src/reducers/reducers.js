import constants from '../constants/constants';
import moment from 'moment';

export const messages = (state = {}, action) => {
    switch (action.type) {
        case constants.READ_MESSAGE:
            return state.filter(m => m.id !== action.id);
        default:
            return state;
    }
};

const filterLogs = (state = {}, period = constants.period.THIS_WEEK) => {
    let startDate, endDate;

    switch (period) {
        case constants.period.THIS_WEEK:
            startDate = moment().isoWeekday(1).format('YYYY-MM-DD');
            endDate = moment().format('YYYY-MM-DD');
            break;
        case constants.period.LAST_WEEK:
            startDate = moment().isoWeekday(1).subtract(7, 'days').format('YYYY-MM-DD');
            endDate = moment().isoWeekday(7).subtract(7, 'days').format('YYYY-MM-DD');
            break;
        case constants.period.THIS_MONTH:
            startDate = moment().date(1).format('YYYY-MM-DD');
            endDate = moment().format('YYYY-MM-DD');
            break;
        case constants.period.LAST_MONTH:
            startDate = moment().date(1).subtract(1, 'month').format('YYYY-MM-DD');
            endDate = moment().date(1).subtract(1, 'day').format('YYYY-MM-DD');
            break;
        default:
            return state.logs;
    }

    let filteredLogs = state.logs.filter(log => 
        moment(log.date).isSameOrAfter(startDate) && moment(log.date).isSameOrBefore(endDate)
    );

    let summary = [];
    filteredLogs.forEach(log => {
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
}

export const statistics = (state = {}, action) => {
    switch (action.type) {
        case constants.CHANGE_PERIOD:
            return Object.assign({}, state, filterLogs(state, action.period), {
                selectedPeriod : action.period
            });
        default:
            return state;
    }
}

export const logsTable = (state = {}, action) => {
    let start, end;
    
    switch (action.type) {
        case constants.TABLE_SIZE:
            return {
                ...state,
                selectedTableSize : action.size,
                indexShowRow : {
                    start : 1,
                    end : action.size
                }
            }
        case constants.PAGINATION_FIRST:
            return {
                ...state,
                indexShowRow : {
                    start : 1,
                    end : action.selectedTableSize
                }
            }
        case constants.PAGINATION_PREV:
            start = state.indexShowRow.start - action.selectedTableSize < 1 ? 
                        1 : 
                        state.indexShowRow.start - action.selectedTableSize;
            end = state.indexShowRow.end - action.selectedTableSize < action.selectedTableSize ? 
                        action.selectedTableSize : 
                        state.indexShowRow.end - action.selectedTableSize;
            return {
                ...state,
                indexShowRow : {
                    start,
                    end
                }
            }
        case constants.PAGINATION_NEXT:
            start = state.indexShowRow.start + action.selectedTableSize > state.logs.length - action.selectedTableSize ? 
                    state.logs.length - action.selectedTableSize : 
                    state.indexShowRow.start + action.selectedTableSize;
            end = state.indexShowRow.end + action.selectedTableSize > state.logs.length ? 
                    state.logs.length : 
                    state.indexShowRow.end + action.selectedTableSize;
            return {
                ...state,
                indexShowRow : {
                    start,
                    end
                }
            }
        case constants.CHANGE_DATE_RANGE:
            return {
                ...state,
                filters : {
                    dateRange : action.range,
                    dateStart : state.filters.dateStart,
                    dateEnd : state.filters.dateEnd,
                    severity : state.filters.severity,
                    facility : state.filters.facility,
                    host : state.filters.host
                }
            }
        case constants.CHANGE_EXACTLY_DATE_RANGE_FROM:
            return {
                ...state,
                filters : {
                    dateRange : state.filters.dateRange,
                    dateStart : action.date.format('YYYY-MM-DD'),
                    dateEnd : state.filters.dateEnd,
                    severity : state.filters.severity,
                    facility : state.filters.facility,
                    host : state.filters.host
                }
            }
        case constants.CHANGE_EXACTLY_DATE_RANGE_TO:
            return {
                ...state,
                filters : {
                    dateRange : state.filters.dateRange,
                    dateStart : state.filters.dateStart,
                    dateEnd : action.date.format('YYYY-MM-DD'),
                    severity : state.filters.severity,
                    facility : state.filters.facility,
                    host : state.filters.host
                }
            }
        case constants.CHANGE_EXACTLY_TIME_RANGE_FROM:
            return {
                ...state,
                filters : {
                    dateRange : state.filters.dateRange,
                    dateStart : action.date.format('YYYY-MM-DD HH:mm'),
                    dateEnd : state.filters.dateEnd,
                    severity : state.filters.severity,
                    facility : state.filters.facility,
                    host : state.filters.host
                }
            }
        case constants.CHANGE_EXACTLY_TIME_RANGE_TO:
            return {
                ...state,
                filters : {
                    dateRange : state.filters.dateRange,
                    dateStart : state.filters.dateStart,
                    dateEnd : action.date.format('YYYY-MM-DD HH:mm'),
                    severity : state.filters.severity,
                    facility : state.filters.facility,
                    host : state.filters.host
                }
            }
        default:
            return state;
    }
}
