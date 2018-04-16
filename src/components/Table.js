import React from 'react';
import constants from '../constants/constants';
import moment from 'moment';

const Table = ({ 
        logs, 
        selectedTableSize, 
        indexShowRow,
        filters,
        onChangeTableSizeView, 
        onClickPaginationFirst,
        onClickPaginationNext,
        onClickPaginationPrev }) => {
    const { tableSize, dateRange } = constants;
debugger
    let start, end;
    switch (filters.dateRange) {
        case dateRange.TODAY:
            start = end = moment().format('YYYY-MM-DD');
            break;
        case dateRange.YESTERDAY:
            start = end = moment().subtract(1, 'day').format('YYYY-MM-DD');
            break;
        case dateRange.THIS_WEEK:
            start = moment().isoWeekday(1).format('YYYY-MM-DD');
            end = moment().format('YYYY-MM-DD');
            break;
        case dateRange.LAST_WEEK:
            start = moment().isoWeekday(1).subtract(7, 'days').format('YYYY-MM-DD');
            end = moment().isoWeekday(7).subtract(7, 'days').format('YYYY-MM-DD');
            break;
        case dateRange.THIS_MONTH:
            start = moment().date(1).format('YYYY-MM-DD');
            end = moment().format('YYYY-MM-DD');
            break;
        case dateRange.LAST_MONTH:
            start = moment().date(1).subtract(1, 'month').format('YYYY-MM-DD');
            end = moment().date(1).subtract(1, 'day').format('YYYY-MM-DD');
            break;
        case dateRange.EXACTLY_DATE:
            start = filters.dateStart !== '' ? moment(filters.dateStart).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
            end = filters.dateEnd !== '' ? moment(filters.dateEnd).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
            break;
        case dateRange.EXACTLY_TIME:
            start = filters.dateStart !== '' ? moment(filters.dateStart, 'YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
            end = filters.dateEnd !== '' ? moment(filters.dateEnd, 'YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
            break;
        default:
            start = end = moment().format('YYYY-MM-DD');
    }
    
    const filteredLogs = logs.filter(log => {
        let date = false, severity = true, facility = true, host = true;
        let logDate = filters.dateRange === constants.dateRange.EXACTLY_TIME ? 
                        moment(log.date, 'YYYY-MM-DD HH:mm') : 
                        moment(log.date, 'YYYY-MM-DD');

        if (filters.dateRange) {
            if (logDate.isSameOrAfter(start) && logDate.isSameOrBefore(end)) {
                date = true;
            }
        }

        if (filters.severity.length > 0) {
            severity = filters.severity.includes(log.severity);
        }

        if (filters.facility.length > 0) {
            facility = filters.facility.includes(log.facility);
        }

        if (filters.host.length > 0) {
            host = filters.host.includes(log.host);
        }

        return date && severity && facility && host;
    });

    return (
        <div className='w-100'>
            <div className='d-flex justify-content-between mb-3'>
                <div className='btn-group-toggle'>
                    <label className={`btn btn-primary btn-sm mr-2 ${selectedTableSize === tableSize.SMALL ? 'acive' : ''}`}>
                        <input 
                            type='radio' 
                            value={tableSize.SMALL} 
                            checked={selectedTableSize === tableSize.SMALL} 
                            onChange={e => onChangeTableSizeView(Number(e.target.value))} 
                            />{tableSize.SMALL}
                    </label>
                    <label className={`btn btn-primary btn-sm mr-2 ${selectedTableSize === tableSize.MEDIUM ? 'acive' : ''}`}>
                        <input 
                            type='radio' 
                            value={tableSize.MEDIUM} 
                            checked={selectedTableSize === tableSize.MEDIUM} 
                            onChange={e => onChangeTableSizeView(Number(e.target.value))}
                            />{tableSize.MEDIUM}
                    </label>
                    <label className={`btn btn-primary btn-sm mr-2 ${selectedTableSize === tableSize.LARGE ? 'acive' : ''}`}>
                        <input 
                            type='radio' 
                            value={tableSize.LARGE} 
                            checked={selectedTableSize === tableSize.LARGE}
                            onChange={e => onChangeTableSizeView(Number(e.target.value))}
                            />{tableSize.LARGE}
                    </label>
                </div>
                <div>
                    <div className='d-flex align-items-center'>
                        <div className='mr-3'>
                            <span className='badge badge-pill badge-secondary'>{indexShowRow.start}</span>
                            <span> - </span>
                            <span className='badge badge-pill badge-secondary'>{indexShowRow.end}</span>
                        </div>
                        <button 
                            type='button' 
                            className='btn btn-outline-secondary mr-2 btn-sm'
                            disabled={indexShowRow.start === 1}
                            onClick={() => onClickPaginationFirst(selectedTableSize)}>First</button>
                        <button 
                            type='button' 
                            className='btn btn-outline-secondary mr-2 btn-sm'
                            disabled={indexShowRow.start === 1}
                            onClick={() => onClickPaginationPrev(selectedTableSize)}>Previous</button>
                        <button 
                            type='button' 
                            className='btn btn-outline-secondary mr-2 btn-sm'
                            disabled={indexShowRow.end === filteredLogs.length}
                            onClick={() => onClickPaginationNext(selectedTableSize)}>Next</button>
                    </div>
                </div>
            </div>
            <table className='table table-bordered table-sm'>
                <thead>
                    <tr className='bg-light'>
                        <th scope='col'>Date</th>
                        <th scope='col'>Facility</th>
                        <th scope='col'>Severity</th>
                        <th scope='col'>Host</th>
                        <th scope='col'>Program</th>
                        <th scope='col'>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.slice(indexShowRow.start - 1, indexShowRow.end).map(elem =>
                        <tr key={elem.id}>
                            <td>{elem.date}</td>
                            <td>{elem.facility}</td>
                            <td>{elem.severity}</td>
                            <td>{elem.host}</td>
                            <td>{elem.program}</td>
                            <td>{elem.message}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table;    