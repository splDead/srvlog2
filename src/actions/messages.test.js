import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as actions from './messages';
import constants from '../constants/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('messages actions', () => {

    it('fetchMessages action', () => {

        const mock = new MockAdapter(axios);
        const store = mockStore();
        const messages = [];
        const expectedActions = [{
            type: constants.LOAD_MESSAGES,
            messages
        }];

        mock.onGet('https://demo0073537.mockable.io/messages').reply(200, {
            messages: []
        });

        store.dispatch(actions.fetchMessages()).then(() =>
            expect(store.getActions()).toEqual(expectedActions)
        );
    });

    it('readMessage action', () => {
        const id = '1';
        const expectedAction = {
            type: constants.READ_MESSAGE,
            id
        };
        expect(actions.readMessage(id)).toEqual(expectedAction);
    });

    it('loadMessages action', () => {
        const messages = [];
        const expectedAction = {
            type: constants.LOAD_MESSAGES,
            messages
        };
        expect(actions.loadMessages(messages)).toEqual(expectedAction);
    });
});
