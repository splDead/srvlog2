// @flow

import * as React from 'react';
import Select from 'react-select';
import DateRangeFilter from './DateRangeFilter';
import type {FiltersType, IndexPaginationType, LogsType} from '../types/types';

import 'react-select/dist/react-select.css';

type Props = {
    logs?: Array<LogsType>,
    selectedTableSize?: number,
    indexShowRow?: IndexPaginationType,
    filters?: FiltersType,
    severity?: string[],
    facility?: string[],
    host?: string[],
    changeDateRange: Function,
    changeSeverity: Function,
    changeFacility: Function,
    changeHost: Function,
    changeExactlyDateRangeFrom: Function,
    changeExactlyDateRangeTo: Function,
    changeExactlyTimeRangeFrom: Function,
    changeExactlyTimeRangeTo: Function
};

const Filters = (props: Props) => {
    const { filters, severity, facility, host } = props;
    const { changeSeverity, changeFacility, changeHost } = props;
    const severityOptions = severity && severity.map(el => ({value: el, label: el}));
    const facilityOptions = facility && facility.map(el => ({value: el, label: el}));
    const hostOptions = host && host.map(el => ({value: el, label: el}));

    return (
        <div className='border rounded bg-light mb-3 pt-2 pb-4'>
            <DateRangeFilter {...props} />
            <div className='d-flex'>
                <div className='col-4'>
                    Severity:
                    <Select closeOnSelect={true}
                            multi
                            onChange={changeSeverity}
                            options={severityOptions}
                            placeholder='Select severity'
                            removeSelected={true}
                            simpleValue
                            value={filters && filters.severity}
                        />
                </div>
                <div className='col-4'>
                    Facility:
                    <Select closeOnSelect={true}
                            multi
                            onChange={changeFacility}
                            options={facilityOptions}
                            placeholder='Select facility'
                            removeSelected={true}
                            simpleValue
                            value={filters && filters.facility}
                        />
                </div>
                <div className='col-4'>
                    Host:
                    <Select closeOnSelect={true}
                            multi
                            onChange={changeHost}
                            options={hostOptions}
                            placeholder='Select host'
                            removeSelected={true}
                            simpleValue
                            value={filters && filters.host}
                        />
                </div>
            </div>
        </div>
    )    
};

export default Filters;
