import constants from '../constants/constants';
import moment from 'moment';

const initialState = {
    messages : [],
    statistics : {},
    logsTable : {}
}

export const messages = (state = initialState, action) => {
    switch (action.type) {
        case constants.READ_MESSAGE:
            return {
                ...state,
                messages : state.messages.filter(m => m.id !== action.id)
            }
        case constants.LOAD_MESSAGES:
            return {
                ...state,
                messages : action.messages
            }
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

    let filteredLogs = state.statistics.logs.filter(log => 
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

export const statistics = (state = initialState, action) => {
    switch (action.type) {
        case constants.CHANGE_PERIOD:
            return {
                ...state,
                statistics : {
                    logs : state.statistics.logs,
                    selectedPeriod : action.period,
                    ...filterLogs(state, action.period)
                }
            }
        case constants.LOAD_STATISTICS:
            return {
                ...state,
                statistics : {
                    logs : action.statistics.logs,
                    selectedPeriod : action.statistics.selectedPeriod,
                    ...filterLogs(action, action.statistics.selectedPeriod)
                }
            }
        default:
            return state;
    }
}

export const logsTable = (state = initialState, action) => {
    let start, end;
    
    switch (action.type) {
        case constants.LOAD_LOGS:
            return {
                ...state,
                logsTable : action.logs
            }
        case constants.TABLE_SIZE:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    selectedTableSize : action.size,
                    indexShowRow : {
                        start : 1,
                        end : action.size
                    }
                }                
            }
        case constants.PAGINATION_FIRST:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    indexShowRow : {
                        start : 1,
                        end : action.selectedTableSize
                    }
                }                
            }
        case constants.PAGINATION_PREV:
            start = state.logsTable.indexShowRow.start - action.selectedTableSize < 1 ? 
                        1 : 
                        state.logsTable.indexShowRow.start - action.selectedTableSize;
            end = state.logsTable.indexShowRow.end - action.selectedTableSize < action.selectedTableSize ? 
                        action.selectedTableSize : 
                        state.logsTable.indexShowRow.end - action.selectedTableSize;
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    indexShowRow : {
                        start,
                        end
                    }
                }                
            }
        case constants.PAGINATION_NEXT:
            start = state.logsTable.indexShowRow.start + action.selectedTableSize > state.logsTable.logs.length - action.selectedTableSize ? 
                    state.logsTable.logs.length - action.selectedTableSize : 
                    state.logsTable.indexShowRow.start + action.selectedTableSize;
            end = state.logsTable.indexShowRow.end + action.selectedTableSize > state.logsTable.logs.length ? 
                    state.logsTable.logs.length : 
                    state.logsTable.indexShowRow.end + action.selectedTableSize;
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    indexShowRow : {
                        start,
                        end
                    }
                }                
            }
        case constants.CHANGE_DATE_RANGE:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        dateRange : action.range
                    }
                }                
            }
        case constants.CHANGE_EXACTLY_DATE_RANGE_FROM:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        dateStart : action.date.format('YYYY-MM-DD')
                    }
                }                
            }
        case constants.CHANGE_EXACTLY_DATE_RANGE_TO:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        dateEnd : action.date.format('YYYY-MM-DD')
                    }
                }                
            }
        case constants.CHANGE_EXACTLY_TIME_RANGE_FROM:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        dateStart : action.date.format('YYYY-MM-DD HH:mm')
                    }
                }                
            }
        case constants.CHANGE_EXACTLY_TIME_RANGE_TO:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        dateEnd : action.date.format('YYYY-MM-DD HH:mm')
                    }
                }                
            }
        case constants.CHANGE_SEVERITY_FILTERS:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        severity : action.severity
                    }
                }                
            }
        case constants.CHANGE_FACILITY_FILTERS:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        facility : action.facility
                    }
                }                
            }
        case constants.CHANGE_HOST_FILTERS:
            return {
                ...state,
                logsTable : {
                    ...state.logsTable,
                    filters : {
                        ...state.logsTable.filters,
                        host : action.host
                    }
                }                
            }
        default:
            return state;
    }
}
