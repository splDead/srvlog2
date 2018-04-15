import React from 'react';
import Search from './Search';
import Table from './Table';
import Filters from './Filters';

const Logs = ({ 
    logsTable, 
    onChangeTableSizeView, 
    onClickPaginationFirst, 
    onClickPaginationNext,
    onClickPaginationPrev,
    onChangeDateRange,
    onChangeExactlyDateRangeFrom,
    onChangeExactlyDateRangeTo,
    onChangeExactlyTimeRangeFrom,
    onChangeExactlyTimeRangeTo }) => {
    return (
        <div>
        <Search />
        <div className='d-flex align-items-start mb-5'>
            <Table 
                {...logsTable}
                onChangeTableSizeView={onChangeTableSizeView}
                onClickPaginationFirst={onClickPaginationFirst}
                onClickPaginationNext={onClickPaginationNext}
                onClickPaginationPrev={onClickPaginationPrev} />
            <Filters 
                filters={logsTable.filters} 
                onChangeDateRange={onChangeDateRange}
                onChangeExactlyDateRangeFrom={onChangeExactlyDateRangeFrom}
                onChangeExactlyDateRangeTo={onChangeExactlyDateRangeTo}
                onChangeExactlyTimeRangeFrom={onChangeExactlyTimeRangeFrom}
                onChangeExactlyTimeRangeTo={onChangeExactlyTimeRangeTo} />
        </div>
    </div>
    )    
}

export default Logs;