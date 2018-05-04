// @flow

import * as React from 'react';
import Select from 'react-select';
import DateRangeFilter from './DateRangeFilter';
import type { LogsTableType } from '../types/types';

import 'react-select/dist/react-select.css';

type Props = {
    logsTable: LogsTableType,
    onChangeDateRange: Function,
    onChangeExactlyDateRangeFrom: Function,
    onChangeExactlyDateRangeTo: Function,
    onChangeExactlyTimeRangeFrom: Function,
    onChangeExactlyTimeRangeTo: Function,
    onChangeSeverityFilters: Function,
    onChangeFacilityFilters: Function,
    onChangeHostFilters: Function
};

const Filters = (props: Props) => {
    const { filters, severity, facility, host } = props.logsTable;
    const { onChangeSeverityFilters, onChangeFacilityFilters, onChangeHostFilters } = props;
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
                            onChange={onChangeSeverityFilters}
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
                            onChange={onChangeFacilityFilters}
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
                            onChange={onChangeHostFilters}
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
}

export default Filters;