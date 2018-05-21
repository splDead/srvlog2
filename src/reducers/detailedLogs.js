// @flow

import constants, { detailedLogsTypeData } from '../constants/constants';
import type { ActionType, DetailedLogsType } from '../types/types';

const initialState: DetailedLogsType = {
    selectedType: detailedLogsTypeData.FIREWALL_ALERT_DATA,
    date: '',
    table: {}
};

const detailedLogs = (state: DetailedLogsType = initialState, action: ActionType): DetailedLogsType => {
    switch(action.type) {
        case constants.LOAD_DETAILED_LOGS:
            return {
                ...state,
                table: {
                    ...state.table,
                    ...action.table, //TODO: delete after refactoring
                    [action.typeData]: action.table[action.typeData]
                },
                // TODO: refactoring mock type table data
                // selectedType: action.typeData
            };
        case constants.CHANGE_DETAILED_LOGS_TYPE_DATA:
            return {
                ...state,
                selectedType: action.typeData
            };
        case constants.CHANGE_DETAILED_LOGS_DATE:
            return {
                ...state,
                date: action.date
            };
        default:
            return state;
    }
};

export default detailedLogs;
