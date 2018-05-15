// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { fetchOnlineLogs, changeDurationUpdate } from '../actions/onlineLogs';
import OnlineTable from './OnlineTable';
import type { Dispatch, LogsType } from "../types/types";

type Props = {
    logs: LogsType[],
    hostsOptions: string[],
    host: string,
    latestLogs: number,
    timeDurationUpdate: number,
    onLoad: Function,
    onChangeDurationUpdate: Function,
    onChangeFilters: Function
};

class OnlineLogs extends React.Component<Props> {

    timerID;

    refresh = (host, latestLogs, timeDurationUpdate) => {
        clearInterval(this.timerID);
        this.timerID = setInterval(() => this.props.onLoad(host, latestLogs), timeDurationUpdate * 1000);
    };

    componentDidMount() {
        let host = this.props.host;
        let latestLogs = this.props.latestLogs;
        this.props.onLoad(host, latestLogs);
        this.timerID = setInterval(() => this.props.onLoad(host, latestLogs), this.props.timeDurationUpdate);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleChangeHosts = (host) => {
        let latestLogs = this.props.latestLogs;
        let timeDurationUpdate = this.props.timeDurationUpdate;
        this.props.onChangeFilters(host, latestLogs);
        this.refresh(host, latestLogs, timeDurationUpdate);
    };

    handleChangeLatestLogs = (latestLogs) => {
        let host = this.props.host;
        let timeDurationUpdate = this.props.timeDurationUpdate;
        this.props.onChangeFilters(host, latestLogs);
        this.refresh(host, latestLogs, timeDurationUpdate);
    };

    handleChangeDuration = (timeDurationUpdate) => {
        let host = this.props.host;
        let latestLogs = this.props.latestLogs;
        this.refresh(host, latestLogs, timeDurationUpdate);
        this.props.onChangeDurationUpdate(timeDurationUpdate);
    };

    render() {
        return (
            <OnlineTable
                {...this.props}
                changeHosts={this.handleChangeHosts.bind(this)}
                changeLatestLogs={this.handleChangeLatestLogs.bind(this)}
                changeDuration={this.handleChangeDuration.bind(this)} />
        )
    }
}

export default connect(
    (state): any => state.onlineLogs,
    (dispatch: Dispatch) => ({
        onLoad(host, latestLogs) {
            dispatch(fetchOnlineLogs(host, latestLogs));
        },
        onChangeFilters(host, latestLogs) {
            dispatch(fetchOnlineLogs(host, latestLogs, 'HOST'));
        },
        onChangeDurationUpdate(timeDurationUpdate) {
            dispatch(changeDurationUpdate(timeDurationUpdate * 1000));
        }
    })
)(OnlineLogs);
