// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { readMessage, fetchMessages } from '../actions/actions';
import type { MessageType } from '../types/types';

type Props = {
    messages: MessageType[],
    onload: void
};

type State = {
    onLoad: any
};

export class Messages extends React.Component<Props, State> {
    
    componentDidMount() {
        this.props.onLoad();
    }

    render() {        
        const messages: MessageType[] = this.props.messages;

        return (
            messages.length > 0 ?
                messages.map((message: MessageType) => 
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
    (state: {}) => state.messages,
    (dispatch: Function) =>
        ({
            onClose: (id: string): void => {
                dispatch(readMessage(id))
            },
            onLoad: (): void => {
                dispatch(fetchMessages())
            }
        })
)(Messages);
