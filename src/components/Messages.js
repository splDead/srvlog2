// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { readMessage, fetchMessages } from '../actions/actions';
import type { StateType, MessageType, Dispatch } from '../types/types';

type Props = {
    messages: MessageType[],
    onClose: Function,
    onLoad: Function
};

export class Messages extends React.Component<Props, StateType> {
    
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const { messages } = this.props;

        return (
            messages && messages.length > 0 ?
                messages.map(message => 
                    <Message 
                        key={message.id} 
                        {...message} 
                        onClick={() => this.props.onClose(message.id)} />
                ) :
                ''
        )
    }    
}

export default connect(
    (state): any => state.messages,
    (dispatch: Dispatch) =>
        ({
            onClose(id: string) {
                dispatch(readMessage(id))
            },
            onLoad() {
                dispatch(fetchMessages())
            }
        })
)(Messages);
