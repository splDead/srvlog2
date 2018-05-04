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
        axios.get(`https://p1703.mocklab.io/search?q=${input.value}`)
            .then(response => alert(response.data));
    }
    
    render() {
        return (
            <div className='mb-5'>
                <Search onSearch={this.handleSearch} />
                <Filters {...this.props} />
                <Table {...this.props} />
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
