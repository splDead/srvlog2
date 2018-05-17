import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as actions from './logs';
import constants from '../constants/constants';
import { getDateRange } from "../utils/MiscUtils";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('logs actions', () => {

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
            facility: [],
            filters: {},
            host: [],
            indexShowRow: {},
            logs: [],
            severity: []
        });

        store.dispatch(actions.fetchLogs(dateRange)).then(() =>
            expect(store.getActions()).toEqual(expectedActions)
        );
    });

    it('loadLogs action', () => {
        const logs = {};
        const filters = {};
        const expectedAction = {
            type: constants.LOAD_LOGS,
            logs,
            filters
        };
        expect(actions.loadLogs(logs, filters)).toEqual(expectedAction);
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
