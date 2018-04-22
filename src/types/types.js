// @flow

import type moment from 'moment';

export type StateType = {
    messages: MessageType[],
    statistics: StatisticsType,
    logsTable: LogsTableType
};

export type MessageType = {
    severity: string,
    message: {
        title: string,
        text: string
    },
    buttons: Array<{
        url: string,
        text: string,
        id: string
    }>,
    id: string
};

export type StatisticsLogType = {
    date: string,
    count: number,
    severity: Array<{
        caption: string,
        count: number
    }>
};

export type StatisticsType = {
    summary?: Array<{
        caption: string,
        count: number
    }>,
    logs?: Array<StatisticsLogType>,
    filteredLogs?: Array<StatisticsLogType>,
    selectedPeriod?: string
};

export type LogsType = {
    date: string,
    facility: string,
    severity: string,
    host: string,
    id: string,
    program: string,
    message: string
};

export type IndexPaginationType = {
    start?: number,
    end?: number
};

export type FiltersType = {
    dateRange?: string,
    dateStart?: string,
    dateEnd?: string,
    severity?: string[],
    facility?: string[],
    host?: string[]
}

export type LogsTableType = {
    logs?: Array<LogsType>,
    selectedTableSize?: number,
    indexShowRow?: IndexPaginationType,
    filters?: FiltersType,
    severity?: string[],
    facility?: string[],
    host?: string[]
};

export type ReadMessageActionType = {
    type: 'READ_MESSAGE',
    id: string
};

export type LoadMessagesActionType = {
    type: 'LOAD_MESSAGES',
    messages: MessageType[],
    id?: string
};

export type LoadStatisticsActionType = {
    type: 'LOAD_STATISTICS',
    statistics: StatisticsType,
    id?: string
};

export type ChangePeriodLogsActionType = {
    type: 'CHANGE_PERIOD',
    period: string,
    id?: string
};

export type LoadLogsActionType = {
    type: 'LOAD_LOGS',
    logs: LogsTableType,
    id?: string
};

export type ChangeTableSizeActionType = {
    type: 'TABLE_SIZE',
    size: number,
    id?: string
};

export type PaginationFirstActionType = {
    type: 'PAGINATION_FIRST',
    selectedTableSize: number,
    id?: string
};

export type PaginationNextActionType = {
    type: 'PAGINATION_NEXT',
    selectedTableSize: number,
    id?: string
};

export type PaginationPrevActionType = {
    type: 'PAGINATION_PREV',
    selectedTableSize: number,
    id?: string
};

export type ChangeDateRangeActionType = {
    type: 'CHANGE_DATE_RANGE',
    range: string,
    id?: string
};

export type ChangeExactlyDateRangeFromActionType = {
    type: 'CHANGE_EXACTLY_DATE_RANGE_FROM',
    date: moment,
    id?: string
};

export type ChangeExactlyDateRangeToActionType = {
    type: 'CHANGE_EXACTLY_DATE_RANGE_TO',
    date: moment,
    id?: string
};

export type ChangeExactlyTimeRangeFromActionType = {
    type: 'CHANGE_EXACTLY_TIME_RANGE_FROM',
    date: moment,
    id?: string
};

export type ChangeExactlyTimeRangeToActionType = {
    type: 'CHANGE_EXACTLY_TIME_RANGE_TO',
    date: moment,
    id?: string
};

export type ChangeSeverityFiltersActionType = {
    type: 'CHANGE_SEVERITY_FILTERS',
    severity: string[],
    id?: string
};

export type ChangeFacilityFiltersActionType = {
    type: 'CHANGE_FACILITY_FILTERS',
    facility: string[],
    id?: string
};

export type ChangeHostFiltersActionType = {
    type: 'CHANGE_HOST_FILTERS',
    host: string[],
    id?: string
};

export type ActionType = 
    | ReadMessageActionType
    | LoadMessagesActionType
    | LoadStatisticsActionType
    | ChangePeriodLogsActionType
    | LoadLogsActionType
    | ChangeTableSizeActionType
    | PaginationFirstActionType
    | PaginationNextActionType
    | PaginationPrevActionType
    | ChangeDateRangeActionType
    | ChangeExactlyDateRangeFromActionType
    | ChangeExactlyDateRangeToActionType
    | ChangeExactlyTimeRangeFromActionType
    | ChangeExactlyTimeRangeToActionType
    | ChangeSeverityFiltersActionType
    | ChangeFacilityFiltersActionType
    | ChangeHostFiltersActionType;

export type GetState = () => StateType;
export type PromiseAction = Promise<ActionType>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: ActionType | ThunkAction | PromiseAction | Array<ActionType>) => any;