import * as actions from './statistics';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getDateRange } from '../utils/MiscUtils';
import constants from '../constants/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('statistics actions', () => {

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
});
