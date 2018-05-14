import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DateRangeFilter from './DateRangeFilter';
import moment from 'moment';
import constants from '../constants/constants';

configure({ adapter: new Adapter() });

const props = {
    filters: {
        dateEnd: '',
        dateRange: constants.period.TODAY,
        dateStart: '',
        facility: [],
        host: [],
        severity: []
    }
};

describe('<DateRangeFilter />', () => {

    const wrapper = shallow(<DateRangeFilter {...props} />);

    it('render <DateRangeFilter />', () => expect(wrapper.find('form').length).toEqual(1));

    it('render exactly date range', () => {
        const props = {
            filters: {
                dateEnd: moment(),
                dateStart: moment().subtract(3, 'days'),
                dateRange: constants.period.EXACTLY_DATE,
                facility: [],
                host: [],
                severity: []
            }
        };
        const wrapper = mount(<DateRangeFilter {...props} />);

        expect(wrapper.props().filters.dateRange).toEqual(constants.period.EXACTLY_DATE);
        expect(wrapper.find('.custom-input-container').exists()).toEqual(true);
    })
});
