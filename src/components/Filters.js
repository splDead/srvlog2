import React from 'react';

const styleFilters = {
    'overflow-y' : 'auto'
};

const Filters = () =>
    <div className='col-3 border rounded bg-light ml-3 pt-2'>
        <div className='mb-2'>
            Date range:
            <select className='custom-select custom-select-sm'>
                <option>TODAY</option>
                <option>WEEK</option>
                <option>MONTH</option>
                <option>YEAR</option>
            </select>
        </div>
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

export default Filters;