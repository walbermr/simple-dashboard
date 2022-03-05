import React from 'react';

import logo from '../logo.svg';

import { send } from '../utils/database';

export default (props: any) => {
    const [message, setMessage] = props.messageState
    const responsesState = props.responsesState

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={message}
                    placeholder={"sql request"}
                    onChange={({ target: { value } }) => setMessage(value)}
                />
                <button type="button" onClick={() => send(message, responsesState)}>
                    Send
                </button>
            </div>
            <div>
                {JSON.stringify(responsesState[0], null, 2)}
            </div>
        </header>
    )
}