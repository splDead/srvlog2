// @flow

import type { ActionType, LogsTableType } from '../types/types';
import constants from '../constants/constants';
import defaults from '../data/defaults';

const initialState: LogsTableType = {
    logs: [],
    indexShowRow: defaults.logsTable.indexShowRow,
    selectedTableSize: defaults.logsTable.selectedTableSize,
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
                filters: action.filters
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
