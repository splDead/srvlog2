// @flow

import React from 'react';
import axios from 'axios';

class Hosts extends React.Component<{}> {

    _inputValue: ?HTMLTextAreaElement;

    handleSubmit = (e: SyntheticEvent<>) => {
        e.preventDefault();
        let value = this._inputValue && this._inputValue.value;
        if (this._inputValue) {
            this._inputValue.value = '';
        }
        axios.post('https://demo0073537.mockable.io/hosts', {hosts: value})
            .catch(error => console.log(error));
    };

    componentDidMount() {
        axios.get('https://demo0073537.mockable.io/hosts')
            .then(response => {
                if (this._inputValue) {
                    this._inputValue.value = response.data.hosts;
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label className='mb-2'>Hosts:</label>
                <div className='mb-2'>
                    <textarea
                        rows='4'
                        ref={input => this._inputValue = input}
                        placeholder='Use format host1,ip1;host2,ip2 or host1;host2 ...'
                        style={{width: '30%'}}>
                    </textarea>
                </div>
                <button type='submit' className='btn btn-primary btn-sm'>Add hosts</button>
            </form>
        )
    }
}

export default Hosts;
