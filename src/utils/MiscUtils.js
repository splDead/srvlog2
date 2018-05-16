// @flow

import moment from 'moment';
import constants from '../constants/constants';

export const getDateRange = (period: string, exactlyDate?: {dateStart: string, dateEnd: string}) => {
    let dateStart: string, dateEnd: string;

    switch (period) {
        case constants.period.TODAY:
            dateStart = dateEnd = moment().format('YYYY-MM-DD');
            break;
        case constants.period.YESTERDAY:
            dateStart = dateEnd = moment().subtract(1, 'day').format('YYYY-MM-DD');
            break;
        case constants.period.THIS_WEEK:
            dateStart = moment().isoWeekday(1).format('YYYY-MM-DD');
            dateEnd = moment().format('YYYY-MM-DD');
            break;
        case constants.period.LAST_WEEK:
            dateStart = moment().isoWeekday(1).subtract(7, 'days').format('YYYY-MM-DD');
            dateEnd = moment().isoWeekday(7).subtract(7, 'days').format('YYYY-MM-DD');
            break;
        case constants.period.THIS_MONTH:
            dateStart = moment().date(1).format('YYYY-MM-DD');
            dateEnd = moment().format('YYYY-MM-DD');
            break;
        case constants.period.LAST_MONTH:
            dateStart = moment().date(1).subtract(1, 'month').format('YYYY-MM-DD');
            dateEnd = moment().date(1).subtract(1, 'day').format('YYYY-MM-DD');
            break;
        case constants.period.EXACTLY_DATE:
            dateStart = exactlyDate && exactlyDate.dateStart ? moment(exactlyDate.dateStart).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
            dateEnd = exactlyDate && exactlyDate.dateEnd ? moment(exactlyDate.dateEnd).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
            break;
        case constants.period.EXACTLY_TIME:
            dateStart = exactlyDate && exactlyDate.dateStart ? moment(exactlyDate.dateStart, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
            dateEnd = exactlyDate && exactlyDate.dateEnd ? moment(exactlyDate.dateEnd, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
            break;
        default:
            dateStart = moment().isoWeekday(1).format('YYYY-MM-DD');
            dateEnd = moment().format('YYYY-MM-DD');
    }

    return {dateStart, dateEnd};
};
