// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import constants from '../constants/constants';
import type { MessageType } from '../types/types';

const btnClose = {
    top : 0,
    right : 0,
    fontSize : '1.2rem',
    fontWeight : 700,
    opacity : 0.7,
    color : 'var(--gray)'
};

const Message = ({ message, severity, onClick }: MessageType & {onClick: Function}) =>
    <div className={constants.messageSeverity[severity]}>
        <h5>{message.title}</h5>
        <button 
            type='button' 
            className='btn btn-link position-absolute'
            style={btnClose}
            onClick={onClick}>Close</button>
        <p>{message.text}</p>
        <Link to='/hosts' className='btn btn-primary btn-sm'>Show unprocessed hosts</Link>
    </div>;

export default Message;
