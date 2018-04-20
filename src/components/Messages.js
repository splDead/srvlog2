import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { readMessage, fetchMessages } from '../actions/actions';

export class Messages extends React.Component {
    
    componentDidMount() {
        this.props.onLoad();
    }
    
    render() {
        const { messages = [] } = this.props;

        return (
            messages.length > 0 ?
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
    state => state.messages,
    dispatch =>
        ({
            onClose(id) {
                dispatch(readMessage(id))
            },
            onLoad() {
                dispatch(fetchMessages())
            }
        })
)(Messages);
