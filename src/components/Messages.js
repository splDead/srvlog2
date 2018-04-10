import React from 'react';

const btnClose = {
    top : 0,
    right : 0,
    fontSize : '1.2rem',
    fontWeight : 700,
    opacity : 0.7,
    color : 'var(--gray)'
}

const Messages = () =>
    <div className='alert alert-warning pl-3'>
        <h5>Warning</h5>
        <button type='button' 
            className='btn btn-link position-absolute'
            style={btnClose}>Close</button>
        <p>There are logs with unresolved hosts. Please add required hosts and press "Process unresolved logs"?</p>
        <button type='button' className='btn btn-primary btn-sm mr-2'>Process unresolved logs</button>
        <button type='button' className='btn btn-primary btn-sm mr-2'>Show unprocessed hosts</button>
    </div>

export default Messages;