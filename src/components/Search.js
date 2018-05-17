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
        if (_inputValue && _inputValue.value !== '') {
            onSearch(_inputValue);
        }
    };

    const clearSearchInput = (e: SyntheticEvent<>) => {
        e.preventDefault();
        if (_inputValue) {
            _inputValue.value = '';
        }
    };

    const handleClickSearchHint = (e: SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        if (_inputValue) {
            _inputValue.value = e.currentTarget.getAttribute('data-pattern') || '';
            _inputValue.focus();
        }
    };

    return (
        <React.Fragment>
            <form className='input-group custom-form-container d-flex align-items-center' onSubmit={search}>
                <input type='text' className='form-control' ref={input => _inputValue = input} />
                <span className='clear-search' onClick={clearSearchInput}>×</span>
                <div className='input-group-append'>
                    <button className='btn btn-primary special-z-index'>Search</button>
                </div>
            </form>
            <div className='mb-3'>
                Patterns: <i className='pattern-hint' onClick={handleClickSearchHint} data-pattern='@program='>@program=value</i>
            </div>
        </React.Fragment>
    )    
};

export default Search;
