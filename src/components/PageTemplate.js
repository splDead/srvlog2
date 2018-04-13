import React from 'react';
import MainMenu from './MainMenu';
import { MessageContainer } from '../containers/MessageContainer';

const PageTemplate = ({ children }) =>
    <React.Fragment>
        <MainMenu />
        <MessageContainer />
        {children}
    </React.Fragment>

export default PageTemplate;