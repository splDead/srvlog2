import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Message from './Message';
import { loadMessages, readMessage } from '../actions/actions';

class Messages extends React.Component {
    loadData() {
        let { onLoad } = this.props;

        axios.get('http://p1703.mocklab.io/messages')
            .then(response => {
                onLoad(response.data.messages)
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.loadData();
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
            onLoad(messages) {
                dispatch(loadMessages(messages))
            }
        })
)(Messages);
