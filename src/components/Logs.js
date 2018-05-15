// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Search from './Search';
import LogsTable from './LogsTable';
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
import type { Dispatch, DateRangeType, LogsType, FiltersType, IndexPaginationType} from '../types/types';

type Props = {
    logs?: Array<LogsType>,
    selectedTableSize?: number,
    indexShowRow?: IndexPaginationType,
    filters?: FiltersType,
    severity?: string[],
    facility?: string[],
    host?: string[],
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
        let period: string = this.props.filters && this.props.filters.dateRange ? this.props.filters.dateRange : constants.period.THIS_MONTH;
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
                <LogsTable {...this.props} />
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
