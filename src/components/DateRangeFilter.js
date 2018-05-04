// @flow

import * as React from 'react';
import constants from '../constants/constants';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import type { LogsTableType } from '../types/types';

import 'react-datepicker/dist/react-datepicker.css';
import './Filters.css';

const styleFilters = {
    overflowY : 'auto'
};

const { dateRange } = constants;

const options = [
    {label: dateRange.TODAY, value: dateRange.TODAY},
    {label: dateRange.YESTERDAY, value: dateRange.YESTERDAY},
    {label: dateRange.THIS_WEEK, value: dateRange.THIS_WEEK},
    {label: dateRange.LAST_WEEK, value: dateRange.LAST_WEEK},
    {label: dateRange.THIS_MONTH, value: dateRange.THIS_MONTH},
    {label: dateRange.LAST_MONTH, value: dateRange.LAST_MONTH},
    {label: dateRange.EXACTLY_DATE, value: dateRange.EXACTLY_DATE},
    {label: dateRange.EXACTLY_TIME, value: dateRange.EXACTLY_TIME}
];

type Props = {
    logsTable: LogsTableType,
    onChangeDateRange: Function,
    onChangeExactlyDateRangeFrom: Function,
    onChangeExactlyDateRangeTo: Function,
    onChangeExactlyTimeRangeFrom: Function,
    onChangeExactlyTimeRangeTo: Function
};

const DateRangeFilter = (props: Props) => {
    const { filters } = props.logsTable;
    const { onChangeDateRange, 
        onChangeExactlyDateRangeFrom,
        onChangeExactlyDateRangeTo,
        onChangeExactlyTimeRangeFrom,
        onChangeExactlyTimeRangeTo } = props;
    const dateStart = filters && filters.dateStart !== '' ? moment(filters.dateStart) : moment();
    const dateEnd = filters && filters.dateEnd !== '' ? moment(filters.dateEnd) : moment();

    return (
        <React.Fragment>
            Date range:
            <Select closeOnSelect={true}
                    onChange={onChangeDateRange}
                    options={options}
                    placeholder='Select severity'
                    removeSelected={true}
                    simpleValue
                    value={filters && filters.dateRange}
                />
            {filters && filters.dateRange === dateRange.EXACTLY_DATE ?
                <div className='mt-3'>
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>From:</span>
                        <DatePicker 
                            selected={dateStart} 
                            onChange={onChangeExactlyDateRangeFrom}
                            dateFormat='YYYY-MM-DD'
                            maxDate={moment()}
                            popperPlacement='bottom-end'
                            calendarClassName='custom-datepicker-position'
                            className='custom-react-input-datepicker'
                            selectsStart
                            startDate={dateStart}
                            endDate={dateEnd} />
                    </div>
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>To:</span>
                        <DatePicker 
                            selected={dateEnd} 
                            onChange={onChangeExactlyDateRangeTo}
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
            {filters && filters.dateRange === dateRange.EXACTLY_TIME ?
                <div className='mt-3'>
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>From:</span>
                        <DatePicker 
                            selected={dateStart} 
                            onChange={onChangeExactlyTimeRangeFrom}
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
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>To:</span>
                        <DatePicker 
                            selected={dateEnd}
                            onChange={onChangeExactlyTimeRangeTo}
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
        </React.Fragment>
    )
};

export default DateRangeFilter;