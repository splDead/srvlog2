// @flow

import * as React from 'react';
import MainMenu from './MainMenu';
import Messages from '../components/Messages';

type Props = {
    children: React.Element<any>
}

export const PageTemplate = ({ children }: Props) =>
    <React.Fragment>
        <MainMenu />
        <Messages />
        {children}
    </React.Fragment>
