// @flow

import * as React from 'react';
import constants from '../constants/constants';
import moment from 'moment';
import TableSizeRadioButtonGroup from './TableSizeRadioButtonGroup';
import Table from './Table';
import type { LogsType, IndexPaginationType, FiltersType } from '../types/types';

type Props = {
    logs: Array<LogsType>,
    selectedTableSize?: number,
    indexShowRow: IndexPaginationType,
    filters: FiltersType,
    severity?: string[],
    facility?: string[],
    host?: string[],
    onChangeTableSizeView: Function,
    onClickPaginationFirst: Function,
    onClickPaginationNext: Function,
    onClickPaginationPrev: Function
};

const LogsTable = ({ logs, selectedTableSize, indexShowRow, filters, onChangeTableSizeView, onClickPaginationFirst, onClickPaginationNext, onClickPaginationPrev }: Props) => {
    const { tableSize, period } = constants;
    let log: LogsType[] = logs ? logs : [];
    let selectedSize: number = selectedTableSize ? selectedTableSize : tableSize.SMALL;
    let indexShow: IndexPaginationType = indexShowRow ? indexShowRow : {};
    let start: string, end: string, filteredLogs = [];
    let paginationStart: number = indexShow.start ? indexShow.start : 1;
    let paginationEnd: number = indexShow.end ? indexShow.end : 25;

    if (filters) {
        switch (filters.dateRange) {
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
                start = filters.dateStart !== '' ? moment(filters.dateStart).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
                end = filters.dateEnd !== '' ? moment(filters.dateEnd).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
                break;
            case period.EXACTLY_TIME:
                start = filters.dateStart !== '' ? moment(filters.dateStart, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
                end = filters.dateEnd !== '' ? moment(filters.dateEnd, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') : moment().format('YYYY-MM-DD');
                break;
            default:
                start = end = moment().format('YYYY-MM-DD');
        }
    }

    if (logs) {
        filteredLogs = log.filter(log => {
            let date = false, severity = true, facility = true, host = true;
            let logDate = filters.dateRange === constants.period.EXACTLY_TIME ?
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
    }    

    let filteredLength: number = filteredLogs && filteredLogs.length > 0 ? filteredLogs.length : 0;

    return (        
        <div className='w-100'>
            <div className='d-flex justify-content-between mb-3'>
                <TableSizeRadioButtonGroup
                    selectedSize={selectedSize}
                    tableSize={tableSize}
                    onChangeTableSizeView={onChangeTableSizeView} />
                <div>
                    <div className='d-flex align-items-center'>
                        {filteredLength > 0 ?
                            <div className='mr-3'>                            
                                <span className='badge badge-pill badge-secondary'>{paginationStart}</span>
                                <span> - </span>
                                <span className='badge badge-pill badge-secondary'>{paginationEnd > filteredLength ? filteredLength : paginationEnd}</span>
                            </div> : ''
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
                            disabled={paginationEnd >= filteredLength}
                            onClick={() => onClickPaginationNext(selectedTableSize)}>Next</button>
                    </div>
                </div>
            </div>
            <Table logs={filteredLogs.slice(paginationStart - 1, paginationEnd)} />
        </div>
    )
};

export default LogsTable;
