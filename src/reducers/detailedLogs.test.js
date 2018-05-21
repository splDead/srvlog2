import detailedLogs from './detailedLogs';
import { loadDetailedLogs, changeDetailedLogsTypeData, changeDetailedLogsDate } from '../actions/detailedLogs';
import moment from 'moment';

describe('detailedLogs Reducer', () => {

    it('LOAD_DETAILED_LOGS success', () => {
        const table = {};
        const typeData = 'FIREWALL_ALERT_DATA';
        const action = loadDetailedLogs(table, typeData);
        const result = detailedLogs({}, action);
        expect(result)
            .toEqual({
                table: {}
            });
    });

    it('CHANGE_DETAILED_LOGS_TYPE_DATA success', () => {
        const typeData = 'OSSEC_ALERT_DATA';
        const action = changeDetailedLogsTypeData(typeData);
        const result = detailedLogs({}, action);
        expect(result)
            .toEqual({
                selectedType: 'OSSEC_ALERT_DATA'
            });
    });

    it('CHANGE_DETAILED_LOGS_DATE success', () => {
        const date = moment().format('YYYY-MM-DD');
        const action = changeDetailedLogsDate(date);
        const result = detailedLogs({}, action);
        expect(result)
            .toEqual({
                date
            })
    })
});
