import messages from './messages';
import { readMessage, loadMessages } from '../actions/messages';

const initialState = {
    messages: [
        {
            message: {
                title: 'Warnings!',
                text: 'There are logs with unresolved hosts. Please add required hosts and press "Process unresolved logs"?'
            },
            severity: 'WARN',
            id: '1'
        }
    ]
};

describe('messages Reducer', () => {

    it('READ_MESSAGE success', () => {
        const action = readMessage('1');
        const result = messages(initialState, action);
        expect(result)
            .toEqual({
                messages: []
            });
    });

    it('LOAD_MESSAGES success', () => {
        const action = loadMessages(initialState);
        const result = messages(initialState, action);
        expect(result)
            .toEqual({
                messages: {
                    messages: [
                        {
                            message: {
                                title: 'Warnings!',
                                text: 'There are logs with unresolved hosts. Please add required hosts and press "Process unresolved logs"?'
                            },
                            severity: 'WARN',
                            id: '1'
                        }
                    ]
                }
            })
    });
});
