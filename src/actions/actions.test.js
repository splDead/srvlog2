import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import moment from 'moment';
import * as actions from './actions';
import constants from '../constants/constants';
import { getDateRange } from '../utils/MiscUtils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {

    it('fetchMessages action', () => {

        const mock = new MockAdapter(axios);
        const store = mockStore();
        const messages = [];
        const expectedActions = [{
            type: constants.LOAD_MESSAGES,
            messages
        }];

        mock.onGet('https://demo0073537.mockable.io/messages').reply(200, {
            messages: []
        });

        store.dispatch(actions.fetchMessages()).then(() =>
            expect(store.getActions()).toEqual(expectedActions)
        );
    });

    it('fetctStatistics action', () => {
        const mock = new MockAdapter(axios);
        const store = mockStore();
        const expectedActions = [{
            type: constants.LOAD_STATISTICS,
            statistics: {
                logs: [],
                summary: []
            }
        }];
        const dateRange = getDateRange(constants.period.THIS_WEEK);

        mock.onPost('https://demo0073537.mockable.io/dashboard', dateRange).reply(200, {
            statistics: {
                logs: [],
                summary: []
            }
        });

        store.dispatch(actions.fetctStatistics(dateRange)).then(() =>
            expect(store.getActions()).toEqual(expectedActions)
        );
    });

    it('fetchLogs action', () => {
        const mock = new MockAdapter(axios);
        const store = mockStore();
        const expectedActions = [{
            type: constants.LOAD_LOGS,
            logs: {
                facility: [],
                filters: {},
                host: [],
                indexShowRow: {},
                logs: [],
                severity: []
            }
        }];
        const dateRange = getDateRange(constants.period.TODAY);

        mock.onPost('https://demo0073537.mockable.io/logs', dateRange).reply(200, {
            logsTable: {
                facility: [],
                filters: {},
                host: [],
                indexShowRow: {},
                logs: [],
                severity: []
            }
        });

        store.dispatch(actions.fetchLogs(dateRange)).then(() =>
            expect(store.getActions()).toEqual(expectedActions)
        );
    })
});

describe('actions', () => {

    it('readMessage action', () => {
        const id = '1';
        const expectedAction = {
            type: constants.READ_MESSAGE,
            id
        };
        expect(actions.readMessage(id)).toEqual(expectedAction);
    });

    it('loadMessages action', () => {
        const messages = [];
        const expectedAction = {
            type: constants.LOAD_MESSAGES,
            messages
        };
        expect(actions.loadMessages(messages)).toEqual(expectedAction);
    });

    it('loadStatistics action', () => {
        const statistics = {};
        const expectedAction = {
            type: constants.LOAD_STATISTICS,
            statistics
        };
        expect(actions.loadStatistics(statistics)).toEqual(expectedAction);
    });

    it('changePeriodLogs action', () => {
        const period = constants.period.THIS_WEEK;
        const expectedAction = {
            type: constants.CHANGE_PERIOD,
            period
        };
        expect(actions.changePeriodLogs(period)).toEqual(expectedAction);
    });

    it('loadLogs action', () => {
        const logs = [];
        const expectedAction = {
            type: constants.LOAD_LOGS,
            logs
        };
        expect(actions.loadLogs(logs)).toEqual(expectedAction);
    });

    it('changeTableSize action', () => {
        const size = 25;
        const expectedAction = {
            type : constants.TABLE_SIZE,
            size
        };
        expect(actions.changeTableSize(size)).toEqual(expectedAction);
    });

    it('paginationFirst action', () => {
        const selectedTableSize = 25;
        const expectedAction = {
            type : constants.PAGINATION_FIRST,
            selectedTableSize
        };
        expect(actions.paginationFirst(selectedTableSize)).toEqual(expectedAction);
    });

    it('paginationNext action', () => {
        const selectedTableSize = 25;
        const expectedAction = {
            type : constants.PAGINATION_NEXT,
            selectedTableSize
        };
        expect(actions.paginationNext(selectedTableSize)).toEqual(expectedAction);
    });

    it('paginationPrev action', () => {
        const selectedTableSize = 25;
        const expectedAction = {
            type : constants.PAGINATION_PREV,
            selectedTableSize
        };
        expect(actions.paginationPrev(selectedTableSize)).toEqual(expectedAction);
    });

    it('changeDateRange action', () => {
        const range = constants.period.THIS_WEEK;
        const logs = [];
        const expectedAction = {
            type : constants.CHANGE_DATE_RANGE,
            range,
            logs
        };
        expect(actions.changeDateRange(range, logs)).toEqual(expectedAction);
    });

    it('changeExactlyDateRangeFrom action', () => {
        const date = moment();
        const logs = [];
        const expectedAction = {
            type : constants.CHANGE_EXACTLY_DATE_RANGE_FROM,
            date,
            logs
        };
        expect(actions.changeExactlyDateRangeFrom(date, logs)).toEqual(expectedAction);
    });

    it('changeExactlyDateRangeTo action', () => {
        const date = moment();
        const logs = [];
        const expectedAction = {
            type : constants.CHANGE_EXACTLY_DATE_RANGE_TO,
            date,
            logs
        };
        expect(actions.changeExactlyDateRangeTo(date, logs)).toEqual(expectedAction);
    });

    it('changeExactlyTimeRangeFrom action', () => {
        const date = moment();
        const logs = [];
        const expectedAction = {
            type : constants.CHANGE_EXACTLY_TIME_RANGE_FROM,
            date,
            logs
        };
        expect(actions.changeExactlyTimeRangeFrom(date, logs)).toEqual(expectedAction);
    });

    it('changeExactlyTimeRangeTo action', () => {
        const date = moment();
        const logs = [];
        const expectedAction = {
            type : constants.CHANGE_EXACTLY_TIME_RANGE_TO,
            date,
            logs
        };
        expect(actions.changeExactlyTimeRangeTo(date, logs)).toEqual(expectedAction);
    });

    it('changeSeverityFilters action', () => {
        const severity = ['ALERT'];
        const expectedAction = {
            type : constants.CHANGE_SEVERITY_FILTERS,
            severity
        };
        expect(actions.changeSeverityFilters(severity)).toEqual(expectedAction);
    });

    it('changeFacilityFilters action', () => {
        const facility = ['user'];
        const expectedAction = {
            type : constants.CHANGE_FACILITY_FILTERS,
            facility
        };
        expect(actions.changeFacilityFilters(facility)).toEqual(expectedAction);
    });

    it('changeHostFilters action', () => {
        const host = ['ALERT'];
        const expectedAction = {
            type : constants.CHANGE_HOST_FILTERS,
            host
        };
        expect(actions.changeHostFilters(host)).toEqual(expectedAction);
    });

    it('clickSeverityFromDashboard action', () => {
        const severity = ['INFO'];
        const selectedPeriod = constants.period.LAST_MONTH;
        const expectedAction = {
            type: constants.SEVERITY_CLICK_FROM_DASHBOARD,
            severity,
            selectedPeriod
        };
        expect(actions.clickSeverityFromDashboard(severity, selectedPeriod)).toEqual(expectedAction);
    });
});
