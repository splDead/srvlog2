import React from 'react';
import MainMenu from './MainMenu';
import Messages from './Messages';

const PageTemplate = ({ store, children }) =>
    <React.Fragment>
        <MainMenu />
        <Messages store={store} />
        {children}
    </React.Fragment>

export default PageTemplate;