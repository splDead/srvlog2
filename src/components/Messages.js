import React from 'react';

const Messages = () =>
    <div>
        <p>Warning</p>
        <p>There are logs with unresolved hosts. Please add required hosts and press "Process unresolved logs"?</p>
        <button>Process unresolved logs</button>
        <button>Show unprocessed hosts</button>
    </div>

export default Messages;