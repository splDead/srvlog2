// @flow

import * as React from 'react';

type Props = {
    link: {
        caption: string,
        count: number
    }
};

const SeverityLink = ({ link }: Props) =>
    <li
        className={`align-items-center d-flex justify-content-between list-group-item severity-link__item severity-link__item-${link.caption}`}
        data-severity={link.caption}>
        {link.caption}
        <span className='badge badge-secondary'>{link.count}</span>
    </li>;

export default SeverityLink;
