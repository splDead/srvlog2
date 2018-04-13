import { connect } from 'react-redux';
import Statistics from '../components/Statistics';

export const Dashboard = connect(
    state =>
        ({
            statistics : state.statistics
        })
)(Statistics);
