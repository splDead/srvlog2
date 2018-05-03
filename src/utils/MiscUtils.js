// @flow

import moment from 'moment';
import constants from '../constants/constants';

export const getDateRange = (period: string) => {
    let startDate: string, endDate: string;

    switch (period) {
        case constants.period.THIS_WEEK:
            startDate = moment().isoWeekday(1).format('YYYY-MM-DD');
            endDate = moment().format('YYYY-MM-DD');
            break;
        case constants.period.LAST_WEEK:
            startDate = moment().isoWeekday(1).subtract(7, 'days').format('YYYY-MM-DD');
            endDate = moment().isoWeekday(7).subtract(7, 'days').format('YYYY-MM-DD');
            break;
        case constants.period.THIS_MONTH:
            startDate = moment().date(1).format('YYYY-MM-DD');
            endDate = moment().format('YYYY-MM-DD');
            break;
        case constants.period.LAST_MONTH:
            startDate = moment().date(1).subtract(1, 'month').format('YYYY-MM-DD');
            endDate = moment().date(1).subtract(1, 'day').format('YYYY-MM-DD');
            break;
        default:
            startDate = moment().isoWeekday(1).format('YYYY-MM-DD');
            endDate = moment().format('YYYY-MM-DD');
    }

    return {startDate, endDate};
};
