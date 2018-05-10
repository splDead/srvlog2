// @flow
const constants = {
    messageSeverity : {
        EMERGENCY : 'alert alert-danger pl-3',
        ALERT : 'alert alert-danger pl-3',
        CRITICAL : 'alert alert-danger pl-3',
        ERROR : 'alert alert-danger pl-3',
        WARN : 'alert alert-warning pl-3',
        NOTICE : 'alert alert-info pl-3',
        INFO : 'alert alert-info pl-3',
        DEBUG : 'alert alert-info pl-3'
    },
    READ_MESSAGE : 'READ_MESSAGE',
    CHANGE_PERIOD : 'CHANGE_PERIOD',
    TABLE_SIZE : 'TABLE_SIZE',
    PAGINATION_FIRST : 'PAGINATION_FIRST',
    PAGINATION_PREV : 'PAGINATION_PREV',
    PAGINATION_NEXT : 'PAGINATION_NEXT',
    CHANGE_DATE_RANGE : 'CHANGE_DATE_RANGE',
    CHANGE_EXACTLY_DATE_RANGE_FROM : 'CHANGE_EXACTLY_DATE_RANGE_FROM',
    CHANGE_EXACTLY_DATE_RANGE_TO : 'CHANGE_EXACTLY_DATE_RANGE_TO',
    CHANGE_EXACTLY_TIME_RANGE_FROM : 'CHANGE_EXACTLY_TIME_RANGE_FROM',
    CHANGE_EXACTLY_TIME_RANGE_TO : 'CHANGE_EXACTLY_TIME_RANGE_TO',
    CHANGE_SEVERITY_FILTERS : 'CHANGE_SEVERITY_FILTERS',
    CHANGE_FACILITY_FILTERS : 'CHANGE_FACILITY_FILTERS',
    CHANGE_HOST_FILTERS : 'CHANGE_HOST_FILTERS',
    period : {
        TODAY : 'TODAY',
        YESTERDAY : 'YESTERDAY',
        THIS_WEEK : 'THIS_WEEK',
        LAST_WEEK : 'LAST_WEEK',
        THIS_MONTH : 'THIS_MONTH',
        LAST_MONTH : 'LAST_MONTH',
        EXACTLY_DATE : 'EXACTLY_DATE',
        EXACTLY_TIME : 'EXACTLY_TIME'
    },
    tableSize : {
        SMALL : 25,
        MEDIUM : 50,
        LARGE : 100
    },
    LOAD_MESSAGES : 'LOAD_MESSAGES',
    LOAD_STATISTICS : 'LOAD_STATISTICS',
    LOAD_LOGS : 'LOAD_LOGS',
    SEVERITY_CLICK_FROM_DASHBOARD: 'SEVERITY_CLICK_FROM_DASHBOARD'
};

export const periodBtns = [
    {type: constants.period.THIS_WEEK, caption: 'this week'},
    {type: constants.period.LAST_WEEK, caption: 'last week'},
    {type: constants.period.THIS_MONTH, caption: 'this month'},
    {type: constants.period.LAST_MONTH, caption: 'last month'}
];

export default constants;
