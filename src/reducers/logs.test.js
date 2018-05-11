import constants from '../constants/constants';
import moment from 'moment';
import {
    loadLogs,
    changeTableSize,
    paginationFirst,
    paginationNext,
    paginationPrev,
    changeDateRange,
    changeExactlyDateRangeFrom,
    changeExactlyDateRangeTo,
    changeExactlyTimeRangeFrom,
    changeExactlyTimeRangeTo,
    changeSeverityFilters,
    changeFacilityFilters,
    changeHostFilters,
    clickSeverityFromDashboard } from '../actions/actions';
import logsTable from './logs';

describe('logs Reducer', () => {

    it('LOAD_LOGS success', () => {
        const action = loadLogs([]);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({});
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
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                indexShowRow: {}
            });
    });

    it('CHANGE_DATE_RANGE success', () => {
        const action = changeDateRange(constants.period.THIS_MONTH, []);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    dateRange: 'THIS_MONTH'
                }
            });
    });

    it('CHANGE_EXACTLY_DATE_RANGE_FROM success', () => {
        const date = moment();
        const action = changeExactlyDateRangeFrom(date, []);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    dateStart: date.format('YYYY-MM-DD')
                }
            });
    });

    it('CHANGE_EXACTLY_DATE_RANGE_TO success', () => {
        const date = moment();
        const action = changeExactlyDateRangeTo(date, []);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    dateEnd: date.format('YYYY-MM-DD')
                }
            });
    });

    it('CHANGE_EXACTLY_TIME_RANGE_FROM success', () => {
        const date = moment();
        const action = changeExactlyTimeRangeFrom(date, []);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    dateStart: date.format('YYYY-MM-DD HH:mm')
                }
            });
    });

    it('CHANGE_EXACTLY_TIME_RANGE_TO success', () => {
        const date = moment();
        const action = changeExactlyTimeRangeTo(date, []);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    dateEnd: date.format('YYYY-MM-DD HH:mm')
                }
            });
    });

    it('CHANGE_SEVERITY_FILTERS success', () => {
        const action = changeSeverityFilters(['EMERGENCY']);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    severity: ['EMERGENCY']
                }
            });
    });

    it('CHANGE_FACILITY_FILTERS success', () => {
        const action = changeFacilityFilters(['kern']);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    facility: ['kern']
                }
            });
    });

    it('CHANGE_HOST_FILTERS success', () => {
        const action = changeHostFilters(['detc-1']);
        const result = logsTable({}, action);
        expect(result)
            .toEqual({
                filters: {
                    host: ['detc-1']
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
