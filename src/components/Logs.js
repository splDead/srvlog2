// @flow

import * as React from 'react';
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
    fetchLogs } from '../actions/actions';
import type { LogsTableType, Dispatch } from '../types/types';

type Props = {
    logsTable: LogsTableType,
    onLoad: Function,
    onChangeTableSizeView: Function,
    onClickPaginationFirst: Function,
    onClickPaginationNext: Function,
    onClickPaginationPrev: Function,
    onChangeDateRange: Function,
    onChangeExactlyDateRangeFrom: Function,
    onChangeExactlyDateRangeTo: Function,
    onChangeExactlyTimeRangeFrom: Function,
    onChangeExactlyTimeRangeTo: Function,
    onChangeSeverityFilters: Function,
    onChangeFacilityFilters: Function,
    onChangeHostFilters: Function
};

class Logs extends React.Component<Props> {

    componentDidMount() {
        this.props.onLoad();
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
    (state): any => state.logsTable,
    (dispatch: Dispatch) =>
        ({
            onLoad() {
                dispatch(fetchLogs())
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
