// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () =>
    <nav className='navbar navbar-dark bg-dark navbar-expand rounded-bottom justify-content-between mb-3'>
        <ul className='navbar-nav'>
            <li className='nav-item'>
                <NavLink className='navbar-brand' to='/'>SRVLOG</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/logs'>Logs</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/online-logs'>Online Logs</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/detailed-logs'>Detailed logs</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/hosts'>Add hosts</NavLink>
            </li>
        </ul>
        <button className='btn btn-light'>Logout</button>
    </nav>

export default MainMenu;
