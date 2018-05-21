// @flow

import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { detailedLogsType, detailedLogsTableHeaders, detailedLogsTypeData } from '../constants/constants';
import { fetchDetailedLogs, changeDetailedLogsTypeData, changeDetailedLogsDate } from '../actions/detailedLogs';
import type { Dispatch, DetailedLogsTableType } from '../types/types';


type Props = {
    table: DetailedLogsTableType,
    date: string,
    selectedType: string,
    onLoad: Function,
    onChangeType: Function,
    onChangeDate: Function
};

class DetailedLogs extends React.Component<Props> {

    createTable = (type, data) => {
        if (!data) {
            switch(type) {
                case detailedLogsTypeData.FIREWALL_ALERT_DATA:
                case detailedLogsTypeData.OSSEC_ALERT_DATA:
                    return <tr><td colSpan='2'>No found data</td></tr>;
                case detailedLogsTypeData.FIREWALL_DROP_DATA:
                    return <tr><td colSpan='6'>No found data</td></tr>;
            }
        }

        switch(type) {
            case detailedLogsTypeData.FIREWALL_ALERT_DATA:
                return data.map((row, i) =>
                    <tr key={i}>
                        <td>{row.class}</td>
                        <td>{row.count}</td>
                    </tr>
                );
            case detailedLogsTypeData.FIREWALL_DROP_DATA:
                return data.map((row, i) =>
                    <tr key={i}>
                        <td>{row.source.ip}</td>
                        <td>{row.source.port}</td>
                        <td>{row.destination.ip}</td>
                        <td>{row.destination.port}</td>
                        <td>{row.protocol}</td>
                        <td>{row.count}</td>
                    </tr>
                );
            case detailedLogsTypeData.OSSEC_ALERT_DATA:
                return data.map((row, i) =>
                    <tr key={i}>
                        <td>{row.type}</td>
                        <td>{row.count}</td>
                    </tr>
                );
        }
    };

    handleClickApply = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let typeData = this.props.selectedType;
        let date = this.props.date === '' ? moment().format('YYYY-MM-DD') : moment(this.props.date).format('YYYY-MM-DD');
        this.props.onLoad(typeData, date);
    };

    render() {

        const { selectedType, date, table, onChangeDate } = this.props;
        let selectedDate = date !== '' ? moment(date) : moment();
        const headers = detailedLogsTableHeaders[selectedType];
        const rows = this.createTable(selectedType, table[selectedType]);

        return (
            <div>
                <div className='d-flex align-items-center mb-3'>
                    <div className='btn-group btn-group-toggle mr-3'>
                        {detailedLogsType.map((elem, i) =>
                            <label key={i} className={`btn btn-primary ${selectedType === elem.type ? 'active' : ''}`}>
                                <input
                                    type='radio'
                                    value={elem.type}
                                    checked={selectedType === elem.type}
                                    onChange={e => this.props.onChangeType(e.currentTarget.value)}
                                />{elem.caption}
                            </label>
                        )}
                    </div>
                    <div className='d-flex align-items-center mr-3'>
                        <span className='mr-3'>Date:</span>
                        <DatePicker
                            selected={selectedDate}
                            onChange={onChangeDate}
                            dateFormat='YYYY-MM-DD'
                            maxDate={moment()}
                            popperPlacement='bottom-end'
                            calendarClassName='custom-datepicker-position'
                            className='custom-react-input-datepicker' />
                    </div>
                    <button type='button' className='btn btn-primary' onClick={this.handleClickApply.bind(this)}>Apply</button>
                </div>
                <table className='table table-bordered table-sm'>
                    <thead>
                        <tr className='bg-light'>
                            {headers.map((el, i) =>
                                <th key={i}>{el}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}

export default connect(
    (state): any => state.detailedLogs,
    (dispatch: Dispatch) => ({
        onLoad(typeData, date) {
            dispatch(fetchDetailedLogs(typeData, date));
        },
        onChangeType(typeData) {
            dispatch(changeDetailedLogsTypeData(typeData));
        },
        onChangeDate(date) {
            dispatch(changeDetailedLogsDate(date.format('YYYY-MM-DD')));
        }
    })
)(DetailedLogs);
