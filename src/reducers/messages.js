// @flow

import type { ActionType, MessageType } from "../types/types";
import constants from "../constants/constants";

const messages = (state: {messages: MessageType[]} = {messages: []}, action: ActionType) => {
    switch (action.type) {
        case constants.READ_MESSAGE:
            return {
                messages: state.messages.filter(m => m.id !== action.id)
            };
        case constants.LOAD_MESSAGES:
            return {
                messages: action.messages
            };
        default:
            return state;
    }
};

export default messages;
