import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Search from './Search';
import Table from './Table';
import Filters from './Filters';
import { 
    changeTableSize,
    paginationFirst,
    paginationNext,
    paginationPrev,
    changeDateRange,
    changeExactlyDateRangeFrom,
    changeExactlyDateRangeTo,
    changeExactlyTimeRangeFrom,
    changeExactlyTimeRangeTo,
    changeSeverityFilters,
    changeFacilityFilters,
    changeHostFilters, 
    loadLogs } from '../actions/actions';

class Logs extends React.Component {
    
    loadData() {
        let { onLoad } = this.props;

        axios.get('http://p1703.mocklab.io/logs')
            .then(response => {
                onLoad(response.data.logsTable)
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.loadData();
    }

    handleSearch = (input) => {
        
        axios.get(`http://p1703.mocklab.io/search?q=${input.value}`)
            .then(response => alert(response.data));
    }
    
    render() {
        return (
            <div>
            <Search onSearch={this.handleSearch} />
            <div className='d-flex align-items-start mb-5'>
                <Table {...this.props} />
                <Filters {...this.props} />
            </div>
        </div>
        )    
    }    
}

export default connect(
    state => state.logsTable,
    dispatch =>
        ({
            onLoad(logs) {
                dispatch(loadLogs(logs))
            },
            onChangeTableSizeView(tableSize) {
                dispatch(changeTableSize(tableSize))
            },
            onClickPaginationFirst(selectedTableSize) {
                dispatch(paginationFirst(selectedTableSize))
            },
            onClickPaginationNext(selectedTableSize) {
                dispatch(paginationNext(selectedTableSize))
            },
            onClickPaginationPrev(selectedTableSize) {
                dispatch(paginationPrev(selectedTableSize))
            },
            onChangeDateRange(range) {
                dispatch(changeDateRange(range))
            },
            onChangeExactlyDateRangeFrom(date) {
                dispatch(changeExactlyDateRangeFrom(date))
            },
            onChangeExactlyDateRangeTo(date) {
                dispatch(changeExactlyDateRangeTo(date))
            },
            onChangeExactlyTimeRangeFrom(date) {
                dispatch(changeExactlyTimeRangeFrom(date))
            },
            onChangeExactlyTimeRangeTo(date) {
                dispatch(changeExactlyTimeRangeTo(date))
            },
            onChangeSeverityFilters(severity) {
                dispatch(changeSeverityFilters(severity))
            },
            onChangeFacilityFilters(facility) {
                dispatch(changeFacilityFilters(facility))
            },
            onChangeHostFilters(host) {
                dispatch(changeHostFilters(host))
            }
        })
)(Logs);
