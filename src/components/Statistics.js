import React from 'react';
import { LinearChart } from './LinearChart';
import constants from '../constants/constants';

const styleLogsBySeverity = {
    EMERGENCY : {
        color : '#bb1e21'
    },
    ALERT : {
        color : '#fa6943'
    },
    CRITICAL : {
        color : '#ff5458'
    },
    ERROR : {
        color : '#fea019'
    },
    WARN : {
        color : '#c09852'
    },
    NOTICE : {
        color : '#020100'
    },
    INFO : {
        color : '#c2ebf4'
    },
    DEBUG : {
        color : '#8bba79'
    }
};

const Statistics = ({ statistics, onChangePediod }) => {
    const { summary, filteredLogs, selectedPeriod } = statistics;
    const period = constants.period;

    const logsBySeverity = summary.map((elem, i) =>
        <li key={i} className='align-items-center d-flex justify-content-between list-group-item' style={styleLogsBySeverity[elem.caption]}>
            {elem.caption}
            <span className='badge badge-secondary'>{elem.count}</span>
        </li>
    );        
    
    return (
        <div className='border mb-5'>
            <div className='d-flex justify-content-between align-items-center bg-light col-12 p-3 border-bottom'>
                <div>Logs statistics</div>
                <form className='btn-group btn-group-toggle'>
                    <label className={`btn btn-secondary btn-sm ${selectedPeriod === period.THIS_WEEK ? 'active' : ''}`}>
                        <input type='radio' value={period.THIS_WEEK} checked={selectedPeriod === period.THIS_WEEK} onChange={e => onChangePediod(e.target.value)} />this week
                    </label>
                    <label className={`btn btn-secondary btn-sm ${selectedPeriod === period.LAST_WEEK ? 'active' : ''}`}>
                        <input type='radio' value={period.LAST_WEEK} checked={selectedPeriod === period.LAST_WEEK} onChange={e => onChangePediod(e.target.value)} />last week
                    </label>
                    <label className={`btn btn-secondary btn-sm ${selectedPeriod === period.THIS_MONTH ? 'active' : ''}`}>
                        <input type='radio' value={period.THIS_MONTH} checked={selectedPeriod === period.THIS_MONTH} onChange={e => onChangePediod(e.target.value)} />this month
                    </label>
                    <label className={`btn btn-secondary btn-sm ${selectedPeriod === period.LAST_MONTH ? 'active' : ''}`}>
                        <input type='radio' value={period.LAST_MONTH} checked={selectedPeriod === period.LAST_MONTH} onChange={e => onChangePediod(e.target.value)} />last month
                    </label>
                </form>
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
                    <LinearChart logs={filteredLogs} />
                </div>
            </div>
        </div>
    )
    
}

export default Statistics;
