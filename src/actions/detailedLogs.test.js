import * as actions from './detailedLogs';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import moment from 'moment';
import constants from '../constants/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('detailedLogs actions', () => {

    it('fetchDetailedLogs action', () => {
        const mock = new MockAdapter(axios);
        const store = mockStore();
        const date = moment().format('YYYY-MM-DD');
        const typeData = 'FIREWALL_ALERT_DATA';
        const expectedActions = [{
            type: constants.LOAD_DETAILED_LOGS,
            table: {},
            typeData
        }];


        mock.onPost('https://demo0073537.mockable.io/detailed-logs', { date, typeData }).reply(200, {
            table: {},
            typeData: 'FIREWALL_ALERT_DATA'
        });

        store.dispatch(actions.fetchDetailedLogs(typeData, date)).then(() =>
            expect(store.getActions()).toEqual(expectedActions)
        );
    });

    it('loadDetailedLogs action', () => {
        const table = {};
        const typeData = 'FIREWALL_DROP_DATA';
        const expectedAction = {
            type: constants.LOAD_DETAILED_LOGS,
            table,
            typeData
        };
        expect(actions.loadDetailedLogs(table, typeData)).toEqual(expectedAction);
    });

    it('changeDetailedLogsTypeData action', () => {
        const typeData = 'OSSEC_ALERT_DATA';
        const expectedAction = {
            type: constants.CHANGE_DETAILED_LOGS_TYPE_DATA,
            typeData
        };
        expect(actions.changeDetailedLogsTypeData(typeData)).toEqual(expectedAction);
    });

    it('changeDetailedLogsDate action', () => {
        const date = moment().format('YYYY-MM-DD');
        const expectedAction = {
            type: 'CHANGE_DETAILED_LOGS_DATE',
            date
        };
        expect(actions.changeDetailedLogsDate(date)).toEqual(expectedAction);
    })
});
