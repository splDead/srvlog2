import React from 'react';
import Message from './Message';
import { readMessage } from '../actions/actions';

const Messages = ({ store }) => {
    const { messages } = store.getState();
    
    const items = messages.map(message => 
        <Message 
            key={message.id} 
            {...message} 
            onClick={id => store.dispatch(readMessage(message.id))} />
    );
    
    return (
        items.length > 0 ?
            items :
            ''
    )
}    

export default Messages;