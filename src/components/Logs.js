import React from 'react';
import PageTemplate from './PageTemplate';
import Search from './Search';
import Table from './Table';
import Filters from './Filters';

const Logs = () =>
    <PageTemplate>
        <Search />
        <div className='d-flex align-items-start mb-5'>
            <Table />
            <Filters />
        </div>
    </PageTemplate>

export default Logs;