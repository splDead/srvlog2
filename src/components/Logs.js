import React from 'react';
import Search from './Search';
import Table from './Table';
import Filters from './Filters';

const Logs = () =>
    <div>
        <Search />
        <div className='d-flex align-items-start mb-5'>
            <Table />
            <Filters />
        </div>
    </div>

export default Logs;