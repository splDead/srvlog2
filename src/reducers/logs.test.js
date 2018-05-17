import constants from '../constants/constants';
import {
    loadLogs,
    changeTableSize,
    paginationFirst,
    paginationNext,
    paginationPrev,
    clickSeverityFromDashboard } from '../actions/logs';
import logsTable from './logs';

describe('logs Reducer', () => {

    it('LOAD_LOGS success', () => {
        const action = loadLogs({}, {});
        const result = logsTable({}, action);
        expect(result)
            .toEqual({filters: {}});
    });

    it('TABLE_SIZE success', () => {
        const action = changeTableSize(100);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                indexShowRow: {
                    start: 1,
                    end: 100
                },
                selectedTableSize: 100
            });
    });

    it('PAGINATION_FIRST success', () => {
        const action = paginationFirst(50);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                indexShowRow: {
                    start: 1,
                    end: 50
                }
            });
    });

    it('PAGINATION_PREV success', () => {
        const action = paginationPrev(50);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                indexShowRow: {
                    start: 1,
                    end: 50
                }
            });
    });

    it('PAGINATION_NEXT success', () => {
        const action = paginationNext(100);
        const result = logsTable({logs: [], indexShowRow: {start: 1, end: 100}}, action);
        expect(result)
            .toEqual({
                logs: [],
                indexShowRow: {
                    end: 200,
                    start: 101
                }
            });
    });

    it('SEVERITY_CLICK_FROM_DASHBOARD success', () => {
        const action = clickSeverityFromDashboard(['EMERGENCY'], constants.period.THIS_MONTH);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    dateRange: 'THIS_MONTH',
                    severity: ['EMERGENCY']
                }
            });
    });
});
