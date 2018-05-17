// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinearChart } from './LinearChart';
import PeriodRadioButton from './PeriodRadioButton';
import SeverityLink from './SeverityLink';
import constants, { periodBtns } from '../constants/constants';
import { fetctStatistics } from '../actions/dashboard';
import { clickSeverityFromDashboard } from '../actions/logs';
import { getDateRange } from '../utils/MiscUtils';
import type { StateType, Dispatch, DateRangeType, StatisticsLogType } from '../types/types';

import './Dashboard.css';

type Props = {
    selectedPeriod: string,
    summary: Array<{
        caption: string,
        count: number
    }>,
    logs: Array<StatisticsLogType>,
    filteredLogs?: Array<StatisticsLogType>,
    onLoad: Function,
    onChangePeriod: Function,
    onClickSeverity: Function
};

class Dashboard extends React.Component<Props, StateType> {

    severityClickHandler = (e) => {
        let severity = [e.target.getAttribute('data-severity')];
        let selectedPeriod = this.props.selectedPeriod;
        this.props.onClickSeverity(severity, selectedPeriod);
    };
    
    componentDidMount() {
        let period: string = this.props.selectedPeriod || constants.period.THIS_MONTH;
        let dateRange: DateRangeType = getDateRange(period);
        this.props.onLoad(dateRange);
    }
    
    render() {
        const { summary = [], filteredLogs = [], selectedPeriod = '' } = this.props;
        const { onChangePeriod } = this.props;

        return (
            <div className='border mb-5'>
                <div className='d-flex justify-content-between align-items-center bg-light col-12 p-3 border-bottom'>
                    <div>Logs statistics</div>
                    <form className='btn-group btn-group-toggle'>
                        {periodBtns.map((period, i) =>
                            <PeriodRadioButton
                                key={i}
                                selectedPeriod={selectedPeriod}
                                period={period}
                                onChangePeriod={onChangePeriod} />
                        )}
                    </form>
                </div>
                <div className='d-flex m-2 align-items-start'>
                    <div className='col-5 col-lg-4 col-xl-2 border p-0 mr-2'>
                        <div className='p-2 bg-light'>Number of logs by severity</div>
                        <ul className='list-group list-group-flush'>
                            {summary ? summary.map((elem, i) =>
                                <Link to='/logs' onClick={this.severityClickHandler.bind(this)} key={i} className='severity-link'>
                                    <SeverityLink link={elem} />
                                </Link>
                            ) : ''}
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
}

export default connect(
    (state): any => state.statistics,
    (dispatch: Dispatch) =>
        ({
            onChangePeriod(period: string) {
                dispatch(fetctStatistics(getDateRange(period), period))
            },
            onLoad(dateRange: DateRangeType) {
                dispatch(fetctStatistics(dateRange))
            },
            onClickSeverity(severity, selectedPeriod) {
                dispatch(clickSeverityFromDashboard(severity, selectedPeriod))
            }
        })
)(Dashboard);
