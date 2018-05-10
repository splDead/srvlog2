// @flow

import * as React from 'react';

type Props = {
    selectedPeriod: string,
    period: {
        type: string,
        caption: string
    },
    onChangePeriod: Function
};

const PeriodRadioButton = ({selectedPeriod, period, onChangePeriod}: Props) =>
    <label className={`btn btn-secondary btn-sm ${selectedPeriod === period.type ? 'active' : ''}`}>
        <input
            type='radio'
            value={period.type}
            checked={selectedPeriod === period.type}
            onChange={e => onChangePeriod(e.target.value)}/>{period.caption}
    </label>

export default PeriodRadioButton;
