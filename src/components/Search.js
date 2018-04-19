import React from 'react';

const Search = ({ onSearch = f => f }) => {
    let _inputValue = '';

    const search = e => {
        e.preventDefault();
        onSearch(_inputValue);
        _inputValue.value = '';
    }

    return (
        <form className='input-group mb-3' onSubmit={search}>
            <input type='text' className='form-control' ref={input => _inputValue = input} />
            <div className='input-group-append'>
                <button className='btn btn-primary'>Search</button>
            </div>
        </form>
    )    
}

export default Search;