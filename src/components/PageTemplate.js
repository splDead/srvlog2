import React from 'react';
import MainMenu from './MainMenu';
import Messages from '../components/Messages';

export const PageTemplate = ({ children }) =>
    <React.Fragment>
        <MainMenu />
        <Messages />
        {children}
    </React.Fragment>
