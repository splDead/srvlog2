// @flow

import * as React from 'react';
import constants from '../constants/constants';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import type { FiltersType } from '../types/types';

import 'react-datepicker/dist/react-datepicker.css';
import './DateRangeFilter.css';

const { period } = constants;

const options = [
    {label: period.TODAY, value: period.TODAY},
    {label: period.YESTERDAY, value: period.YESTERDAY},
    {label: period.THIS_WEEK, value: period.THIS_WEEK},
    {label: period.LAST_WEEK, value: period.LAST_WEEK},
    {label: period.THIS_MONTH, value: period.THIS_MONTH},
    {label: period.LAST_MONTH, value: period.LAST_MONTH},
    {label: period.EXACTLY_DATE, value: period.EXACTLY_DATE},
    {label: period.EXACTLY_TIME, value: period.EXACTLY_TIME}
];

type Props = {
    filters?: FiltersType,
    changeDateRange: Function,
    changeExactlyDateRangeFrom: Function,
    changeExactlyDateRangeTo: Function,
    changeExactlyTimeRangeFrom: Function,
    changeExactlyTimeRangeTo: Function
};

const DateRangeFilter = (props: Props) => {
    const { filters } = props;
    const { changeDateRange,
        changeExactlyDateRangeFrom,
        changeExactlyDateRangeTo,
        changeExactlyTimeRangeFrom,
        changeExactlyTimeRangeTo } = props;
    const dateStart = filters && filters.dateStart !== '' ? moment(filters.dateStart) : moment();
    const dateEnd = filters && filters.dateEnd !== '' ? moment(filters.dateEnd) : moment();

    return (
        <form className='d-flex mb-3 align-items-end'>
            <div className='col-4'>
                Date range:
                <Select closeOnSelect={true}
                        onChange={changeDateRange}
                        options={options}
                        placeholder='Select severity'
                        removeSelected={true}
                        clearable={false}
                        simpleValue
                        value={filters && filters.dateRange}
                    />
            </div>
            <div className='col-8'>
            {filters && filters.dateRange === period.EXACTLY_DATE ?
                <div className='d-flex'>
                    <div className='w-50'>
                        From:
                        <DatePicker 
                            selected={dateStart} 
                            onChange={changeExactlyDateRangeFrom}
                            dateFormat='YYYY-MM-DD'
                            maxDate={moment()}
                            popperPlacement='bottom-end'
                            calendarClassName='custom-datepicker-position'
                            className='custom-react-input-datepicker'
                            selectsStart
                            startDate={dateStart}
                            endDate={dateEnd} />
                    </div>
                    <div className='col-6 custom-input-container'>
                        To:
                        <DatePicker 
                            selected={dateEnd} 
                            onChange={changeExactlyDateRangeTo}
                            dateFormat='YYYY-MM-DD'
                            maxDate={moment()}
                            popperPlacement='bottom-end'
                            calendarClassName='custom-datepicker-position'
                            className='custom-react-input-datepicker' 
                            selectsEnd
                            startDate={dateStart}
                            endDate={dateEnd} />
                    </div>
                </div> :
                ''}
            {filters && filters.dateRange === period.EXACTLY_TIME ?
                <div className='d-flex'>
                    <div className='w-50'>
                        From:
                        <DatePicker 
                            selected={dateStart} 
                            onChange={changeExactlyTimeRangeFrom}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            calendarClassName='custom-datepicker-position-with-time'
                            className='custom-react-input-datepicker'
                            popperPlacement='bottom-end'
                            dateFormat='YYYY-MM-DD HH:mm'
                            maxDate={moment()}
                            selectsStart
                            startDate={dateStart}
                            endDate={dateEnd} />
                    </div>
                    <div className='col-6 custom-input-container'>
                        To:
                        <DatePicker 
                            selected={dateEnd}
                            onChange={changeExactlyTimeRangeTo}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            calendarClassName='custom-datepicker-position-with-time'
                            className='custom-react-input-datepicker'
                            popperPlacement='bottom-end'
                            dateFormat='YYYY-MM-DD HH:mm'
                            maxDate={moment()}
                            selectsEnd
                            startDate={dateStart}
                            endDate={dateEnd} />
                    </div>
                </div> :
                ''}
            </div>
        </form>
    )
};

export default DateRangeFilter;