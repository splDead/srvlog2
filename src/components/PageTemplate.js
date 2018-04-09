import React from 'react';
import MainMenu from './MainMenu';
import Messages from './Messages';

const PageTemplate = ({ children }) =>
    <React.Fragment>
        <MainMenu />
        <Messages />
        {children}
    </React.Fragment>

export default PageTemplate;