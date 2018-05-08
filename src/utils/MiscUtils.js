// @flow

import moment from 'moment';
import constants from '../constants/constants';

export const getDateRange = (period: string, exactlyDate?: {dateStart: string, dateEnd: string}) => {
    let startDate: string, endDate: string;

    switch (period) {
        case constants.period.TODAY:
            startDate = endDate = moment().format('YYYY-MM-DD');
            break;
        case constants.period.YESTERDAY:
            startDate = endDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
            break;
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
        case constants.period.EXACTLY_DATE:
            startDate = exactlyDate && exactlyDate.dateStart ? moment(exactlyDate.dateStart).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
            endDate = exactlyDate && exactlyDate.dateEnd ? moment(exactlyDate.dateEnd).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
            break;
        case constants.period.EXACTLY_TIME:
            startDate = exactlyDate && exactlyDate.dateStart ? moment(exactlyDate.dateStart, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
            endDate = exactlyDate && exactlyDate.dateEnd ? moment(exactlyDate.dateEnd, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
            break;
        default:
            startDate = moment().isoWeekday(1).format('YYYY-MM-DD');
            endDate = moment().format('YYYY-MM-DD');
    }

    return {startDate, endDate};
};
