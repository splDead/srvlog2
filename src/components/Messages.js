import React from 'react';
import Message from './Message';

const Messages = ({ messages, onClose }) => {
    const items = messages.map(message => 
        <Message 
            key={message.id} 
            {...message} 
            onClick={id => onClose(message.id)} />
    );
    
    return (
        items.length > 0 ?
            items :
            ''
    )
}    

export default Messages;
