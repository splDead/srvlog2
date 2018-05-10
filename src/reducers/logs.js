// @flow

import type { ActionType, LogsTableType } from "../types/types";
import constants from "../constants/constants";
import defaults from '../data/defaults';

const initialState: LogsTableType = {
    filters: defaults.logsTable.filters,
    severity: defaults.logsTable.severity
};

const logsTable = (state: LogsTableType = initialState, action: ActionType): LogsTableType => {
    let start, end;

    switch (action.type) {
        case constants.LOAD_LOGS:
            return {
                ...state,
                ...action.logs,
                filters: state.filters,
                severity: state.severity
            };
        case constants.TABLE_SIZE:
            return {
                ...state,
                selectedTableSize : action.size,
                indexShowRow : {
                    start : 1,
                    end : action.size
                }
            };
        case constants.PAGINATION_FIRST:
            return {
                ...state,
                indexShowRow : {
                    start : 1,
                    end : action.selectedTableSize
                }
            };
        case constants.PAGINATION_PREV:
            let paginationIndexStart = state.indexShowRow && state.indexShowRow.start ? state.indexShowRow.start : 1;
            let paginationIndexEnd = state.indexShowRow && state.indexShowRow.end ? state.indexShowRow.end : 25;
            start = paginationIndexStart - action.selectedTableSize < 1 ?
                1 :
                paginationIndexStart - action.selectedTableSize;
            end = paginationIndexEnd - action.selectedTableSize < action.selectedTableSize ?
                action.selectedTableSize :
                paginationIndexEnd - action.selectedTableSize;
            return {
                ...state,
                indexShowRow : {
                    start,
                    end
                }
            };
        case constants.PAGINATION_NEXT:
            start = state.indexShowRow && state.indexShowRow.start && state.logs && state.logs.length && state.indexShowRow.start + action.selectedTableSize > state.logs.length - action.selectedTableSize ?
                state.logs.length - action.selectedTableSize :
                state.indexShowRow && state.indexShowRow.start + action.selectedTableSize;
            end = state.indexShowRow && state.indexShowRow.end && state.logs && state.logs.length && state.indexShowRow.end + action.selectedTableSize > state.logs.length ?
                state.logs.length :
                state.indexShowRow && state.indexShowRow.end + action.selectedTableSize;
            return {
                ...state,
                indexShowRow : {
                    start,
                    end
                }
            };
        case constants.CHANGE_DATE_RANGE:
            return {
                ...state,
                ...action.logs,
                filters : {
                    ...state.filters,
                    dateRange : action.range
                }
            };
        case constants.CHANGE_EXACTLY_DATE_RANGE_FROM:
            return {
                ...state,
                ...action.logs,
                filters : {
                    ...state.filters,
                    dateStart : action.date.format('YYYY-MM-DD')
                }
            };
        case constants.CHANGE_EXACTLY_DATE_RANGE_TO:
            return {
                ...state,
                ...action.logs,
                filters : {
                    ...state.filters,
                    dateEnd : action.date.format('YYYY-MM-DD')
                }
            };
        case constants.CHANGE_EXACTLY_TIME_RANGE_FROM:
            return {
                ...state,
                ...action.logs,
                filters : {
                    ...state.filters,
                    dateStart : action.date.format('YYYY-MM-DD HH:mm')
                }
            };
        case constants.CHANGE_EXACTLY_TIME_RANGE_TO:
            return {
                ...state,
                ...action.logs,
                filters : {
                    ...state.filters,
                    dateEnd : action.date.format('YYYY-MM-DD HH:mm')
                }
            };
        case constants.CHANGE_SEVERITY_FILTERS:
            return {
                ...state,
                filters : {
                    ...state.filters,
                    severity : action.severity
                }
            };
        case constants.CHANGE_FACILITY_FILTERS:
            return {
                ...state,
                filters : {
                    ...state.filters,
                    facility : action.facility
                }
            };
        case constants.CHANGE_HOST_FILTERS:
            return {
                ...state,
                filters : {
                    ...state.filters,
                    host : action.host
                }
            };
        case constants.SEVERITY_CLICK_FROM_DASHBOARD:
            return {
                ...state,
                filters : {
                    ...state.filters,
                    dateRange : action.selectedPeriod,
                    severity: action.severity
                }
            };
        default:
            return state;
    }
};

export default logsTable;
