// @flow

import constants from '../constants/constants';
import moment from 'moment';
import { getDateRange } from '../utils/MiscUtils';
import type { StateType, ActionType } from '../types/types';
import defaults from '../data/defaults';

const initialState: StateType = {
    messages: [],
    statistics: {},
    logsTable: {},
    ...defaults
};

export const messages = (state: StateType = initialState, action: ActionType): StateType => {
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

const filterLogs = (state, period = constants.period.THIS_MONTH) => {
    let { startDate, endDate } = getDateRange(period);
    let filteredLogs = state.statistics.logs && state.statistics.logs.filter(log => 
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
}

export const statistics = (state: StateType = initialState, action: ActionType): StateType => {
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
                    selectedPeriod : state.statistics.selectedPeriod,
                    ...filterLogs(action, state.statistics.selectedPeriod)
                }
            }
        default:
            return state;
    }
}

export const logsTable = (state: StateType = initialState, action: ActionType): StateType => {
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
            let paginationIndexStart = state.logsTable.indexShowRow && state.logsTable.indexShowRow.start ? state.logsTable.indexShowRow.start : 1;
            let paginationIndexEnd = state.logsTable.indexShowRow && state.logsTable.indexShowRow.end ? state.logsTable.indexShowRow.end : 25;
            start = paginationIndexStart - action.selectedTableSize < 1 ? 
                        1 : 
                        paginationIndexStart - action.selectedTableSize;
            end = paginationIndexEnd - action.selectedTableSize < action.selectedTableSize ? 
                        action.selectedTableSize : 
                        paginationIndexEnd - action.selectedTableSize;
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
            start = state.logsTable.indexShowRow && state.logsTable.indexShowRow.start && state.logsTable.logs && state.logsTable.logs.length && state.logsTable.indexShowRow.start + action.selectedTableSize > state.logsTable.logs.length - action.selectedTableSize ?
                        state.logsTable.logs.length - action.selectedTableSize :
                        state.logsTable.indexShowRow && state.logsTable.indexShowRow.start + action.selectedTableSize;
            end = state.logsTable.indexShowRow && state.logsTable.indexShowRow.end && state.logsTable.logs && state.logsTable.logs.length && state.logsTable.indexShowRow.end + action.selectedTableSize > state.logsTable.logs.length ?
                    state.logsTable.logs.length :
                    state.logsTable.indexShowRow && state.logsTable.indexShowRow.end + action.selectedTableSize;
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
