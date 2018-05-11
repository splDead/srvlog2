import constants from '../constants/constants';
import statistics from './statistics';
import { changePeriodLogs, loadStatistics } from '../actions/actions';

describe('statistics Reducer', () => {

    it('CHANGE_PERIOD success', () => {
        const action = changePeriodLogs(constants.period.THIS_WEEK);
        const result = statistics({}, action);
        expect(result)
            .toEqual({
                selectedPeriod: constants.period.THIS_WEEK,
                summary: []
            });
    });

    it('LOAD_STATISTICS success', () => {
        const action = loadStatistics({});
        const result = statistics({}, action);
        expect(result)
            .toEqual({
                summary: []
            })
    });
});
