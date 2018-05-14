// @flow

import React from 'react';

type Props = {
    selectedSize: number,
    tableSize : {
        SMALL: number,
        MEDIUM: number,
        LARGE: number
    },
    onChangeTableSizeView: Function
};

const TableSizeRadioButtonGroup = ({selectedSize, tableSize, onChangeTableSizeView}: Props) =>
    <div className='btn-group-toggle'>
        <label className={`btn btn-primary btn-sm mr-2 ${selectedSize === tableSize.SMALL ? ' active' : ''}`}>
            <input
                type='radio'
                value={tableSize.SMALL}
                checked={selectedSize === tableSize.SMALL}
                onChange={e => onChangeTableSizeView(Number(e.target.value))}
            />{tableSize.SMALL}
        </label>
        <label className={`btn btn-primary btn-sm mr-2 ${selectedSize === tableSize.MEDIUM ? 'active' : ''}`}>
            <input
                type='radio'
                value={tableSize.MEDIUM}
                checked={selectedSize === tableSize.MEDIUM}
                onChange={e => onChangeTableSizeView(Number(e.target.value))}
            />{tableSize.MEDIUM}
        </label>
        <label className={`btn btn-primary btn-sm mr-2 ${selectedSize === tableSize.LARGE ? 'active' : ''}`}>
            <input
                type='radio'
                value={tableSize.LARGE}
                checked={selectedSize === tableSize.LARGE}
                onChange={e => onChangeTableSizeView(Number(e.target.value))}
            />{tableSize.LARGE}
        </label>
    </div>;

export default TableSizeRadioButtonGroup;
