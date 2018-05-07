// @flow

import * as React from 'react';

import './Search.css';

type Props = {
    onSearch: Function
};

const Search = ({ onSearch }: Props) => {
    let _inputValue: ?HTMLInputElement;

    const search = (e: SyntheticInputEvent<HTMLInputElement>) => {
        e.preventDefault();
        onSearch(_inputValue);
        if (_inputValue) {
            _inputValue.value = '';
        }
    }

    return (
        <form className='input-group mb-3' onSubmit={search}>
            <input type='text' className='form-control' ref={input => _inputValue = input} />
            <div className='input-group-append'>
                <button className='btn btn-primary special-z-index'>Search</button>
            </div>
        </form>
    )    
}

export default Search;
