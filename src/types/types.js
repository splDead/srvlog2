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

export type StatisticsType = {
    summary: Array<{
        caption: string,
        count: number
    }>,
    logs: Array<{
        date: string,
        count: number,
        severity: Array<{
            caption: string,
            count: number
        }>
    }>,
    filteredLogs: Array<{

    }>,
    selectedPeriod: string
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

export type LogsTableType = {
    logsTable: Array<LogsType>,
    selectedTableSize: number,
    indexShowRow: {
        start: number,
        end: number
    },
    filters: {
        dateRange: string,
        dateStart: string,
        dateEnd: string,
        severity: string[],
        facility: string[],
        host: string[]
    },
    severity: string[],
    facility: string[],
    host: string[]
};
