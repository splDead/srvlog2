// @flow

import type { ActionType, LogsTableType } from '../types/types';
import constants from '../constants/constants';
import defaults from '../data/defaults';

const initialState: LogsTableType = {
    logs: [],
    indexShowRow: {
        start: 1,
        end: 25
    },
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
                filters: action.filters,
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
            start = Math.max(paginationIndexStart - action.selectedTableSize, 1);
            end = Math.max(paginationIndexEnd - action.selectedTableSize, action.selectedTableSize);
            return {
                ...state,
                indexShowRow : {
                    start,
                    end
                }
            };
        case constants.PAGINATION_NEXT:
            start = Math.min(state.logs.length - action.selectedTableSize, state.indexShowRow.start + action.selectedTableSize);
            end = Math.min(state.logs.length, state.indexShowRow.end + action.selectedTableSize);
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
