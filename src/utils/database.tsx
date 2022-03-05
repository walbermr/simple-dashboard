import { Dispatch, SetStateAction } from 'react';
import { sendAsync } from '../message-control/renderer';

function send(sql: string, responsesProp: any) {
    const [responses, setResponses] = responsesProp
    sendAsync(sql).then((result: any[]) => {
        console.log({ result })
        setResponses(result)
    });
}

export { send }