// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Search from './Search';
import LogsTable from './LogsTable';
import Filters from './Filters';
import constants from '../constants/constants';
import { 
    changeTableSize,
    paginationFirst,
    paginationNext,
    paginationPrev,
    fetchLogs } from '../actions/logs';
import { getDateRange } from '../utils/MiscUtils';
import type { Dispatch, LogsType, FiltersType, IndexPaginationType} from '../types/types';

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
    onClickPaginationPrev: Function
};

class Logs extends React.Component<Props> {

    componentDidMount() {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                ...getDateRange(constants.period.TODAY)
            }
        });
    }

    handleSearch = (input: HTMLInputElement) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters
            },
            query: input.value
        });
    };

    handleChangeDateRange = (range: string) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                dateRange: range,
                ...getDateRange(range)
            }
        });
    };

    handleChangeSeverity = (severity: string) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                severity: severity !== '' ? severity.split(',') : []
            }
        });
    };

    handleChangeFacility = (facility: string) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                facility: facility !== '' ? facility.split(',') : []
            }
        });
    };

    handleChangeHosts = (host: string) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                host: host !== '' ? host.split(',') : []
            }
        });
    };

    handleChangeExactlyDateRangeFrom = (date: moment) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                ...getDateRange(
                    constants.period.EXACTLY_DATE,
                    {
                        dateStart: date.format('YYYY-MM-DD'),
                        dateEnd: this.props.filters ? this.props.filters.dateEnd : ''
                    }
                )
            }
        });
    };

    handleChangeExactlyDateRangeTo = (date: moment) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                ...getDateRange(
                    constants.period.EXACTLY_DATE,
                    {
                        dateStart: this.props.filters ? this.props.filters.dateStart : '',
                        dateEnd: date.format('YYYY-MM-DD')
                    }
                )
            }
        });
    };

    handleChangeExactlyTimeRangeFrom = (date: moment) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                ...getDateRange(
                    constants.period.EXACTLY_DATE,
                    {
                        dateStart: date.format('YYYY-MM-DD HH:mm'),
                        dateEnd: this.props.filters ? this.props.filters.dateEnd : ''
                    }
                )
            }
        });
    };

    handleChangeExactlyTimeRangeTo = (date: moment) => {
        this.props.onLoad({
            filters: {
                ...this.props.filters,
                ...getDateRange(
                    constants.period.EXACTLY_DATE,
                    {
                        dateStart: this.props.filters ? this.props.filters.dateStart : '',
                        dateEnd: date.format('YYYY-MM-DD HH:mm')
                    }
                )
            }
        });
    };
    
    render() {
        return (
            <div className='mb-5'>
                <Search onSearch={this.handleSearch} />
                <Filters
                    {...this.props}
                    changeDateRange={this.handleChangeDateRange.bind(this)}
                    changeSeverity={this.handleChangeSeverity.bind(this)}
                    changeFacility={this.handleChangeFacility.bind(this)}
                    changeHost={this.handleChangeHosts.bind(this)}
                    changeExactlyDateRangeFrom={this.handleChangeExactlyDateRangeFrom.bind(this)}
                    changeExactlyDateRangeTo={this.handleChangeExactlyDateRangeTo.bind(this)}
                    changeExactlyTimeRangeFrom={this.handleChangeExactlyTimeRangeFrom.bind(this)}
                    changeExactlyTimeRangeTo={this.handleChangeExactlyTimeRangeTo.bind(this)} />
                <LogsTable {...this.props} />
            </div>
        )    
    }    
}

export default connect(
    (state): any => state.logsTable,
    (dispatch: Dispatch) =>
        ({
            onLoad(params) {
                dispatch(fetchLogs(params))
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
            }
        })
)(Logs);
