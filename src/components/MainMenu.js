import React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () =>
    <nav>
        <NavLink to='/'>SRVLOG</NavLink>
        <NavLink to='/dashboard'>Dashboard</NavLink>
        <NavLink to='/logs'>Logs</NavLink>
        <NavLink to='/online-logs'>Online Logs</NavLink>
        <NavLink to='/detailed-logs'>Detailed logs</NavLink>
        <NavLink to='/hosts'>Add hosts</NavLink>
    </nav>

export default MainMenu;