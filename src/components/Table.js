// @flow

import React from 'react';
import type { LogsType } from "../types/types";

import './Table.css';

type Props = {
    logs: Array<LogsType>
};

const Table = ({ logs }: Props) =>
    <table className='table table-bordered table-sm'>
        <thead>
        <tr className='bg-light'>
            <th scope='col' style={{width: '14%'}}>Date</th>
            <th scope='col' style={{width: '9%'}}>Facility</th>
            <th scope='col' style={{width: '9%'}}>Severity</th>
            <th scope='col' style={{width: '9%'}}>Host</th>
            <th scope='col' style={{width: '9%'}}>Program</th>
            <th scope='col' style={{width: '50%'}}>Message</th>
        </tr>
        </thead>
        <tbody>
        {logs ? logs.map(elem =>
                <tr key={elem.id} className={`${elem.severity}-LEVEL`}>
                    <td>{elem.date}</td>
                    <td>{elem.facility}</td>
                    <td>{elem.severity}</td>
                    <td>{elem.host}</td>
                    <td>{elem.program}</td>
                    <td>{elem.message}</td>
                </tr>
            ) :
            <tr>
                <td colSpan='6'>
                    No found data
                </td>
            </tr>
        }
        </tbody>
    </table>;

export default Table;
