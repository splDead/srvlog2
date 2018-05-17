import constants from '../constants/constants';
import dashboard from './dashboard';
import { changePeriodLogs, loadStatistics } from '../actions/dashboard';

describe('dashboard Reducer', () => {

    it('CHANGE_PERIOD success', () => {
        const action = changePeriodLogs(constants.period.THIS_WEEK);
        const result = dashboard({}, action);
        expect(result)
            .toEqual({
                selectedPeriod: constants.period.THIS_WEEK,
                summary: []
            });
    });

    it('LOAD_STATISTICS success', () => {
        const action = loadStatistics({});
        const result = dashboard({}, action);
        expect(result)
            .toEqual({
                summary: []
            })
    });
});
