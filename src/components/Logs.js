import React from 'react';
import PageTemplate from './PageTemplate';
import Search from './Search';
import Table from './Table';
import Filters from './Filters';

const Logs = () =>
    <PageTemplate>
        <Search />
        <Table />
        <Filters />
    </PageTemplate>

export default Logs;