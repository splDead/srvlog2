import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as actions from './onlineLogs';
import constants from '../constants/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('online logs actions', () => {

    it('fetchOnlineLogs action', () => {
        const mock = new MockAdapter(axios);
        const store = mockStore();
        const expectedActions = [{
            type: constants.LOAD_ONLINE_LOGS,
            hostsOptions: ["detc-1", "detc-2"],
            logs: [{
                "date": "2018-04-01 16:10:01",
                "facility": "daemon",
                "severity": "INFO",
                "host": "idao-2",
                "id": "1",
                "program": "clamd",
                "message": "[1]: Starting User Slice of root."
            }]
        }];
        const host = 'ALL';
        const latestLogs = 25;

        mock.onPost('https://demo0073537.mockable.io/online-logs', { host, latestLogs }).reply(200, {
            hostsOptions: ["detc-1", "detc-2"],
            logs: [{
                "date": "2018-04-01 16:10:01",
                "facility": "daemon",
                "severity": "INFO",
                "host": "idao-2",
                "id": "1",
                "program": "clamd",
                "message": "[1]: Starting User Slice of root."
            }]
        });

        store.dispatch(actions.fetchOnlineLogs(host, latestLogs)).then(() =>
            expect(store.getActions()).toEqual(expectedActions)
        );
    });

    it('loadOnlineLogs action', () => {
        const logs = [{
            "date": "2018-04-01 16:10:01",
            "facility": "daemon",
            "severity": "INFO",
            "host": "idao-2",
            "id": "1",
            "program": "clamd",
            "message": "[1]: Starting User Slice of root."
        }];
        const hostsOptions = ["detc-1", "detc-2"];
        const expectedAction = {
            type: constants.LOAD_ONLINE_LOGS,
            logs,
            hostsOptions
        };
        expect(actions.loadOnlineLogs(logs, hostsOptions)).toEqual(expectedAction);
    });

    it('changeLatestLogs action', () => {
        const host = 'detc-2';
        const latestLogs = 50;
        const logs = [{
            "date": "2018-04-01 16:10:01",
            "facility": "daemon",
            "severity": "INFO",
            "host": "idao-2",
            "id": "1",
            "program": "clamd",
            "message": "[1]: Starting User Slice of root."
        }];
        const expectedAction = {
            type: constants.CHANGE_ONLINE_LOGS_FILTERS,
            host,
            latestLogs,
            logs
        };
        expect(actions.changeLatestLogs(host, latestLogs, logs)).toEqual(expectedAction);
    });

    it('changeDurationUpdate action', () => {
        const timeDurationUpdate = 5000;
        const expectedAction = {
            type: constants.CHANGE_DURATION_UPDATE,
            timeDurationUpdate
        };
        expect(actions.changeDurationUpdate(timeDurationUpdate)).toEqual(expectedAction);
    });
});
