import { connect } from 'react-redux';
import Messages from '../components/Messages';
import { readMessage } from '../actions/actions';

export const MessageContainer = connect(
    state =>
        ({
            messages : state.messages
        }),
    dispatch =>
        ({
            onClose(id) {
                dispatch(readMessage(id))
            }
        })
)(Messages);
