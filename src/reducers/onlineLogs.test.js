import onlineLogs from './onlineLogs';
import { loadOnlineLogs, changeLatestLogs, changeDurationUpdate } from '../actions/onlineLogs';

describe('onlineLogs Reducer', () => {

    it('LOAD_ONLINE_LOGS success', () => {
        const logs = [{
            "date": "2018-04-02 16:10:01",
            "facility": "auth",
            "severity": "CRITICAL",
            "host": "detc-2",
            "id": "4",
            "program": "clamd",
            "message": "[1]: Starting User Slice of root."
        }];
        const hostsOptions = ["dpub-1", "dpub-2"];
        const action = loadOnlineLogs(logs, hostsOptions);
        const result = onlineLogs({}, action);
        expect(result)
            .toEqual({
                logs,
                hostsOptions
            });
    });

    it('CHANGE_ONLINE_LOGS_FILTERS success', () => {
        const host = 'ALL';
        const latestLogs = 50;
        const logs = [{
            "date": "2018-04-02 16:10:01",
            "facility": "auth",
            "severity": "CRITICAL",
            "host": "detc-2",
            "id": "4",
            "program": "clamd",
            "message": "[1]: Starting User Slice of root."
        }];
        const action = changeLatestLogs(host, latestLogs, logs);
        const result = onlineLogs({}, action);
        expect(result)
            .toEqual({
                host,
                latestLogs,
                logs
            });
    });

    it('CHANGE_DURATION_UPDATE success', () => {
        const timeDurationUpdate = 5000;
        const action = changeDurationUpdate(timeDurationUpdate);
        const result = onlineLogs({}, action);
        expect(result)
            .toEqual({
                timeDurationUpdate
            });
    });
});
