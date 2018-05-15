// @flow

import axios from 'axios';
import type { ActionType, Dispatch, MessageType } from '../types/types';
import constants from '../constants/constants';

export const readMessage = (id: string): ActionType => ({
    type : constants.READ_MESSAGE,
    id
});

export const loadMessages = (messages: MessageType[]): ActionType => ({
    type : constants.LOAD_MESSAGES,
    messages
});

export const fetchMessages = () => (dispatch: Dispatch) => {
    return axios.get('https://demo0073537.mockable.io/messages')
        .then(response => {
            dispatch(loadMessages(response.data.messages))
        })
        .catch(error => console.log(error));
};
