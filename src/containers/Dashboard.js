import { connect } from 'react-redux';
import Statistics from '../components/Statistics';
import { changePeriodLogs } from '../actions/actions';

export const Dashboard = connect(
    state =>
        ({
            statistics : state.statistics
        }),
    dispatch =>
        ({
            onChangePediod(period) {
                dispatch(changePeriodLogs(period))
            }
        })
)(Statistics);
