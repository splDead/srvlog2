// @flow

import * as React from 'react';
import Select from 'react-select';
import TableSizeRadioButtonGroup from './TableSizeRadioButtonGroup';
import Table from './Table';
import constants from "../constants/constants";
import type { LogsType } from "../types/types";

type Props = {
    host: string,
    logs: LogsType[],
    hostsOptions: string[],
    latestLogs: number,
    timeDurationUpdate: number,
    changeHosts: Function,
    changeLatestLogs: Function,
    changeDuration: Function
};

const durationSize = {
    SMALL : 2,
    MEDIUM : 5,
    LARGE : 10
};

const OnlineTable = (props: Props) => {
    const {
        host,
        logs,
        hostsOptions,
        latestLogs,
        timeDurationUpdate,
        changeHosts,
        changeLatestLogs,
        changeDuration } = props;
    const { tableSize } = constants;
    let log: LogsType[] = logs ? logs : [];
    let filteredLogs = [];
    let options = [{label: 'ALL', value: 'ALL'}];

    if (hostsOptions) {
        options = options.concat(hostsOptions.map(elem => ({label: elem, value: elem})));
    }

    if (logs) {
        if (host === 'ALL') {
            filteredLogs = log.slice(0, latestLogs);
        } else {
            filteredLogs = log.filter(log => log.host === host).slice(0, latestLogs);
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-start mb-3'>
                <div className='d-flex mr-3 align-items-center' style={{width: '300px'}}>
                    <div className='mr-2'>Hosts:</div>
                    <div className='w-100'>
                        <Select
                            closeOnSelect={true}
                            onChange={changeHosts}
                            options={options}
                            placeholder='Select hosts'
                            removeSelected={true}
                            clearable={false}
                            simpleValue
                            value={host}
                        />
                    </div>
                </div>
                <div className='d-flex align-items-center mr-2'>
                    <div className='mr-2'>Latest logs:</div>
                    <TableSizeRadioButtonGroup
                        selectedSize={latestLogs}
                        tableSize={tableSize}
                        onChangeTableSizeView={changeLatestLogs} />
                </div>
                <div className='d-flex align-items-center'>
                    <div className='mr-2'>Time duration update:</div>
                    <TableSizeRadioButtonGroup
                        selectedSize={timeDurationUpdate/1000}
                        tableSize={durationSize}
                        onChangeTableSizeView={changeDuration} />
                </div>
            </div>
            <Table logs={filteredLogs} />
        </div>
    )
};

export default OnlineTable;
