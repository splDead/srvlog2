import React from 'react';

const Search = () =>
    <div className='input-group mb-3'>
        <input type='text' className='form-control' />
        <div className='input-group-append'>
            <button className='btn btn-primary'>Search</button>
        </div>
    </div>

export default Search;