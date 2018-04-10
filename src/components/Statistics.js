import React from 'react';

const Statistics = () => 
    <div className='border'>
        <div className='d-flex justify-content-between align-items-center bg-light col-12 p-3 border-bottom'>
            <div>Logs statistics</div>
            <div className='btn-group btn-group-toggle'>
                <label className='btn btn-secondary btn-sm active'>
                    <input type='radio' name='range' />this week
                </label>
                <label className='btn btn-secondary btn-sm'>
                    <input type='radio' name='range' />last week
                </label>
                <label className='btn btn-secondary btn-sm'>
                    <input type='radio' name='range' />this month
                </label>
                <label className='btn btn-secondary btn-sm'>
                    <input type='radio' name='range' />last month
                </label>
            </div>
        </div>
        <div className='d-flex m-2'>
            <div className='col-4 border p-0 mr-2'>
                <div className='p-2 bg-light'>Number of logs by severity</div>
                <ul className='list-group list-group-flush'>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>EMERGENCY<span className='badge badge-secondary'>0</span></li>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>ALERT<span className='badge badge-secondary'>3767</span></li>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>CRITICAL<span className='badge badge-secondary'>28</span></li>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>ERROR<span className='badge badge-secondary'>60431</span></li>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>WARN<span className='badge badge-secondary'>104743</span></li>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>NOTICE<span className='badge badge-secondary'>99447</span></li>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>INFO<span className='badge badge-secondary'>820709</span></li>
                    <li className='align-items-center d-flex justify-content-between list-group-item'>DEBUG<span className='badge badge-secondary'>0</span></li>
                </ul>
            </div>
            <div className='col-8 border'>
                <div>Number of logs by date</div>
                <div>something chart</div>
            </div>
        </div>
    </div>

export default Statistics;