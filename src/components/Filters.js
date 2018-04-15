import React from 'react';
import constants from '../constants/constants';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './Filters.css';

const styleFilters = {
    overflowY : 'auto'
};

const Filters = ({ 
    filters, 
    onChangeDateRange, 
    onChangeExactlyDateRangeFrom,
    onChangeExactlyDateRangeTo,
    onChangeExactlyTimeRangeFrom,
    onChangeExactlyTimeRangeTo }) => {
    const { dateRange } = constants;

    return (
        <div className='col-3 border rounded bg-light ml-3 pt-2'>
            <div className='mb-2'>
                Date range:
                <select 
                    value={filters.dateRange} 
                    className='custom-select custom-select-sm'
                    onChange={e => onChangeDateRange(e.target.value)}>
                    <option value={dateRange.TODAY}>{dateRange.TODAY}</option>
                    <option value={dateRange.YESTERDAY}>{dateRange.YESTERDAY}</option>
                    <option value={dateRange.THIS_WEEK}>{dateRange.THIS_WEEK}</option>
                    <option value={dateRange.LAST_WEEK}>{dateRange.LAST_WEEK}</option>
                    <option value={dateRange.THIS_MONTH}>{dateRange.THIS_MONTH}</option>
                    <option value={dateRange.LAST_MONTH}>{dateRange.LAST_MONTH}</option>
                    <option value={dateRange.EXACTLY_DATE}>{dateRange.EXACTLY_DATE}</option>
                    <option value={dateRange.EXACTLY_TIME}>{dateRange.EXACTLY_TIME}</option>
                </select>
            </div>
            {filters.dateRange === dateRange.EXACTLY_DATE ?
                <div className='mb-2'>
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>From:</span>
                        <DatePicker 
                            selected={moment(filters.dateStart)} 
                            onChange={onChangeExactlyDateRangeFrom}
                            dateFormat='YYYY-MM-DD'
                            maxDate={moment()}
                            popperPlacement='bottom-end'
                            calendarClassName='custom-datepicker-position'
                            className='custom-react-input-datepicker'
                            selectsStart
                            startDate={moment(filters.dateStart)}
                            endDate={moment(filters.dateEnd)} />
                    </div>
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>To:</span>
                        <DatePicker 
                            selected={moment(filters.dateEnd)} 
                            onChange={onChangeExactlyDateRangeTo}
                            dateFormat='YYYY-MM-DD'
                            maxDate={moment()}
                            popperPlacement='bottom-end'
                            calendarClassName='custom-datepicker-position'
                            className='custom-react-input-datepicker' 
                            selectsEnd
                            startDate={moment(filters.dateStart)}
                            endDate={moment(filters.dateEnd)} />
                    </div>
                </div> :
                ''}
            {filters.dateRange === dateRange.EXACTLY_TIME ?
                <div className='mb-2'>
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>From:</span>
                        <DatePicker 
                            selected={moment(filters.dateStart)} 
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
                            startDate={moment(filters.dateStart)}
                            endDate={moment(filters.dateEnd)} />
                    </div>
                    <div className='d-flex align-items-center mb-2'>
                        <span className='pr-2 w-25'>To:</span>
                        <DatePicker 
                            selected={moment(filters.dateEnd)}
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
                            startDate={moment(filters.dateStart)}
                            endDate={moment(filters.dateEnd)} />
                    </div>
                </div> :
                ''}
            <div className='mb-2'>
                Severity:
                <select className='custom-select custom-select-sm p-2' size='8' multiple style={styleFilters}>
                    <option>EMERGENCY</option>
                    <option>ALERT</option>
                    <option>CRITICAL</option>
                    <option>ERROR</option>
                    <option>WARN</option>
                    <option>NOTICE</option>
                    <option>INFO</option>
                    <option>DEBUG</option>
                </select>
            </div>
            <div className='mb-2'>
                Facility:
                <select className='custom-select custom-select-sm p-2' size='8' multiple style={styleFilters}>
                    <option>kern</option>
                    <option>user</option>
                    <option>mail</option>
                    <option>daemon</option>
                    <option>auth</option>
                    <option>syslog</option>
                    <option>ipr</option>
                    <option>news</option>
                </select>
            </div>
            <div className='mb-2'>
                Host:
                <select className='custom-select custom-select-sm p-2' size='8' multiple style={styleFilters}>
                    <option>10.2.26.21</option>
                    <option>10.2.26.22</option>
                    <option>detc-1</option>
                    <option>detc-2</option>
                    <option>dout-1</option>
                    <option>dout-2</option>
                    <option>dpub-1</option>
                    <option>dpub-2</option>
                </select>
            </div>
        </div>
    )    
}

export default Filters;