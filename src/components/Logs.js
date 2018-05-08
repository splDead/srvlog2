// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Search from './Search';
import Table from './Table';
import Filters from './Filters';
import constants from '../constants/constants';
import { 
    changeTableSize,
    paginationFirst,
    paginationNext,
    paginationPrev,
    changeSeverityFilters,
    changeFacilityFilters,
    changeHostFilters, 
    fetchLogs } from '../actions/actions';
import { getDateRange } from '../utils/MiscUtils';
import type { LogsTableType, Dispatch, DateRangeType } from '../types/types';

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
        let period: string = this.props.logsTable.filters && this.props.logsTable.filters.dateRange ? this.props.logsTable.filters.dateRange : constants.period.THIS_MONTH;
        let dateRange: DateRangeType = getDateRange(period);
        this.props.onLoad(dateRange);
    }

    handleSearch = (input) => {        
        axios.get(`https://p1703.mocklab.io/search?q=${input.value}`)
            .then(response => alert(response.data));
    };
    
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
            onLoad(dateRange) {
                dispatch(fetchLogs(dateRange))
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
                dispatch(fetchLogs(getDateRange(range), range))
            },
            onChangeExactlyDateRangeFrom(date) {
                dispatch(fetchLogs({
                    startDate: date.format(this.dateFormat),
                    endDate: this.endDate.format(this.dateFormat)}, `EXACTLY_DATE_FROM/${date.format(this.dateFormat)}`))
            },
            onChangeExactlyDateRangeTo(date) {
                dispatch(fetchLogs({
                    startDate: this.startDate.format(this.dateFormat),
                    endDate: date.format(this.dateFormat)}, `EXACTLY_DATE_TO/${date.format(this.dateFormat)}`))
            },
            onChangeExactlyTimeRangeFrom(date) {
                dispatch(fetchLogs({
                    startDate: date.format(this.dateFormat),
                    endDate: this.endDate.format(this.dateFormat)}, `EXACTLY_TIME_FROM/${date.format(this.dateFormat)}`))
            },
            onChangeExactlyTimeRangeTo(date) {
                dispatch(fetchLogs({
                    startDate: this.startDate.format(this.dateFormat),
                    endDate: date.format(this.dateFormat)}, `EXACTLY_TIME_TO/${date.format(this.dateFormat)}`))
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
