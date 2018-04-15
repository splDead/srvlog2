import { connect } from 'react-redux';
import Logs from '../components/Logs';
import { 
    changeTableSize, 
    paginationFirst, 
    paginationNext, 
    paginationPrev,
    changeDateRange,
    changeExactlyDateRangeFrom,
    changeExactlyDateRangeTo,
    changeExactlyTimeRangeFrom,
    changeExactlyTimeRangeTo } from '../actions/actions';

export const LogsContainer = connect(
    state =>
        ({
            logsTable : state.logsTable
        }),
    dispatch => 
        ({
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
            }
        })
)(Logs);
