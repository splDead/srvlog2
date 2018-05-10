// @flow

import * as React from 'react';
import constants from '../constants/constants';
import moment from 'moment';
import type { LogsType, IndexPaginationType, FiltersType } from '../types/types';

import './Table.css';

type Props = {
    logs?: Array<LogsType>,
    selectedTableSize?: number,
    indexShowRow?: IndexPaginationType,
    filters?: FiltersType,
    severity?: string[],
    facility?: string[],
    host?: string[],
    onChangeTableSizeView: Function,
    onClickPaginationFirst: Function,
    onClickPaginationNext: Function,
    onClickPaginationPrev: Function
};

const Table = ({ logs, selectedTableSize, indexShowRow, filters, onChangeTableSizeView, onClickPaginationFirst, onClickPaginationNext, onClickPaginationPrev }: Props) => {
    const { tableSize, period } = constants;
    let log: LogsType[] = logs ? logs : [];
    let selectedSize: number = selectedTableSize ? selectedTableSize : tableSize.SMALL;
    let indexShow: IndexPaginationType = indexShowRow ? indexShowRow : {};
    let filter: FiltersType = filters ? filters : {};
    let start: string, end: string, filteredLogs;

    if (filter) {
        switch (filter.dateRange) {
            case period.TODAY:
                start = end = moment().format('YYYY-MM-DD');
                break;
            case period.YESTERDAY:
                start = end = moment().subtract(1, 'day').format('YYYY-MM-DD');
                break;
            case period.THIS_WEEK:
                start = moment().isoWeekday(1).format('YYYY-MM-DD');
                end = moment().format('YYYY-MM-DD');
                break;
            case period.LAST_WEEK:
                start = moment().isoWeekday(1).subtract(7, 'days').format('YYYY-MM-DD');
                end = moment().isoWeekday(7).subtract(7, 'days').format('YYYY-MM-DD');
                break;
            case period.THIS_MONTH:
                start = moment().date(1).format('YYYY-MM-DD');
                end = moment().format('YYYY-MM-DD');
                break;
            case period.LAST_MONTH:
                start = moment().date(1).subtract(1, 'month').format('YYYY-MM-DD');
                end = moment().date(1).subtract(1, 'day').format('YYYY-MM-DD');
                break;
            case period.EXACTLY_DATE:
                start = filter.dateStart !== '' ? moment(filter.dateStart).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
                end = filter.dateEnd !== '' ? moment(filter.dateEnd).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
                break;
            case period.EXACTLY_TIME:
                start = filter.dateStart !== '' ? moment(filter.dateStart, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
                end = filter.dateEnd !== '' ? moment(filter.dateEnd, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
                break;
            default:
                start = end = moment().format('YYYY-MM-DD');
        }
    }
    
    if (logs) {
        filteredLogs = log.filter(log => {
            let date = false, severity = true, facility = true, host = true;
            let logDate = filter.dateRange === constants.period.EXACTLY_TIME ?
                            moment(log.date, 'YYYY-MM-DD HH:mm') : 
                            moment(log.date, 'YYYY-MM-DD');

            if (filter.dateRange) {
                if (logDate.isSameOrAfter(start) && logDate.isSameOrBefore(end)) {
                    date = true;
                }
            }

            if (filter.severity && filter.severity.length > 0) {
                severity = filter.severity.includes(log.severity);
            }

            if (filter.facility && filter.facility.length > 0) {
                facility = filter.facility.includes(log.facility);
            }

            if (filter.host && filter.host.length > 0) {
                host = filter.host.includes(log.host);
            }

            return date && severity && facility && host;
        });
    }    

    let paginationStart: number = indexShow.start ? indexShow.start : 1;
    let paginationEnd: number = indexShow.end ? indexShow.end : 25;
    let filteredLenghth: number = filteredLogs && filteredLogs.length > 0 ? filteredLogs.length : 0;

    return (        
        <div className='w-100'>
            <div className='d-flex justify-content-between mb-3'>
                <div className='btn-group-toggle'>
                    <label className={`btn btn-primary btn-sm mr-2 ${selectedSize === tableSize.SMALL ? ' active' : ''}`}>
                        <input 
                            type='radio' 
                            value={tableSize.SMALL} 
                            checked={selectedSize === tableSize.SMALL}
                            onChange={e => onChangeTableSizeView(Number(e.target.value))} 
                            />{tableSize.SMALL}
                    </label>
                    <label className={`btn btn-primary btn-sm mr-2 ${selectedSize === tableSize.MEDIUM ? 'active' : ''}`}>
                        <input 
                            type='radio' 
                            value={tableSize.MEDIUM} 
                            checked={selectedSize === tableSize.MEDIUM}
                            onChange={e => onChangeTableSizeView(Number(e.target.value))}
                            />{tableSize.MEDIUM}
                    </label>
                    <label className={`btn btn-primary btn-sm mr-2 ${selectedSize === tableSize.LARGE ? 'active' : ''}`}>
                        <input 
                            type='radio' 
                            value={tableSize.LARGE} 
                            checked={selectedSize === tableSize.LARGE}
                            onChange={e => onChangeTableSizeView(Number(e.target.value))}
                            />{tableSize.LARGE}
                    </label>
                </div>
                <div>
                    <div className='d-flex align-items-center'>
                        {filteredLenghth > 0 ?
                            <div className='mr-3'>                            
                                <span className='badge badge-pill badge-secondary'>{paginationStart}</span>
                                <span> - </span>
                                <span className='badge badge-pill badge-secondary'>{paginationEnd > filteredLenghth ? filteredLenghth : paginationEnd}</span>
                            </div> : <div className='mr-3'><span className='badge badge-pill badge-secondary'>0</span></div>
                        }
                        <button 
                            type='button' 
                            className='btn btn-outline-secondary mr-2 btn-sm'
                            disabled={indexShow.start === 1}
                            onClick={() => onClickPaginationFirst(selectedTableSize)}>First</button>
                        <button 
                            type='button' 
                            className='btn btn-outline-secondary mr-2 btn-sm'
                            disabled={indexShow.start === 1}
                            onClick={() => onClickPaginationPrev(selectedTableSize)}>Previous</button>
                        <button 
                            type='button' 
                            className='btn btn-outline-secondary btn-sm'
                            disabled={paginationEnd >= filteredLenghth}
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
                    {filteredLogs ? filteredLogs.slice(paginationStart - 1, paginationEnd).map(elem =>
                        <tr key={elem.id} className={`${elem.severity}-LEVEL`}>
                            <td>{elem.date}</td>
                            <td>{elem.facility}</td>
                            <td>{elem.severity}</td>
                            <td>{elem.host}</td>
                            <td>{elem.program}</td>
                            <td>{elem.message}</td>
                        </tr>
                    ) :
                    <tr>
                        <td colSpan='6'>
                            No found data
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Table;    