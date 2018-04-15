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
    period : {
        THIS_WEEK : 'THIS_WEEK',
        LAST_WEEK : 'LAST_WEEK',
        THIS_MONTH : 'THIS_MONTH',
        LAST_MONTH : 'LAST_MONTH'
    },
    tableSize : {
        SMALL : 25,
        MEDIUM : 50,
        LARGE : 100
    },
    dateRange : {
        TODAY : 'TODAY',
        YESTERDAY : 'YESTERDAY',
        THIS_WEEK : 'THIS_WEEK',
        LAST_WEEK : 'LAST_WEEK',
        THIS_MONTH : 'THIS_MONTH',
        LAST_MONTH : 'LAST_MONTH',
        EXACTLY_DATE : 'EXACTLY_DATE',
        EXACTLY_TIME : 'EXACTLY_TIME'
    }
}

export default constants;