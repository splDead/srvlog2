import React from 'react';

const Statistics = ({ statistics }) => {
    const { summary, logs } = statistics;

    const logsBySeverity = summary.map((elem, i) =>
        <li key={i} className='align-items-center d-flex justify-content-between list-group-item'>
            {elem.caption}
            <span className='badge badge-secondary'>{elem.count}</span>
        </li>
    );
    
    return (
        <div className='border mb-5'>
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
            <div className='d-flex m-2 align-items-start'>
                <div className='col-4 border p-0 mr-2'>
                    <div className='p-2 bg-light'>Number of logs by severity</div>
                    <ul className='list-group list-group-flush'>
                        {logsBySeverity}
                    </ul>
                </div>
                <div className='border w-100'>
                    <div className='p-2 bg-light'>Number of logs by date</div>
                    <div className='border-top'>something chart</div>
                </div>
            </div>
        </div>
    )
    
}

export default Statistics;
