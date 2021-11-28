import TdApi from '../../TdWeb/td_api';

export interface ProcessedSingleMessage extends TdApi.td_message, ProcessedMessage {
}

export interface MessageAlbum extends ProcessedMessage {
    processedType: 'messageAlbum';
    type: 'messageDocument' | 'messagePhoto' | 'messageVideo' | 'messageAudio';
    messages: TdApi.td_message[];
}

export interface FileAlbum extends MessageAlbum {
    type: 'messageDocument' | 'messageAudio',
}

export interface MediaAlbum extends MessageAlbum {
    type: 'messagePhoto' | 'messageVideo',
}

export interface ProcessedMessage {
    /** Indicates whether the sender name should *not* be shown on the top of the message */
    hide_sender_name: boolean;
    /** Indicates whether the message tail (and sender photo if applicable) should *not* be shown */
    hide_tail: boolean;
    processedType?: string;
}

export default function processMessageHistory(messages: {[id: number|string]: TdApi.td_message}): ProcessedMessage[] {
    const array: TdApi.td_message[]= [];
    for(const id of Object.keys(messages).sort((a, b) => Number(a) - Number(b))) {
        array.push(messages[id]);
    }

    function reducer(prev: ProcessedMessage[] | null, current: TdApi.td_message): ProcessedMessage[] {
        if(!prev) {
            return [{
                ...current,
                hide_sender_name: false,
                hide_tail: false,
            }];
        } else {
            const prevEl= prev[prev.length-1];
            let message: TdApi.td_message;
            if(prevEl.processedType== 'messageAlbum') {
                message= (prevEl as MessageAlbum).messages[0];
            } else {
                message= prevEl as ProcessedSingleMessage;
            }

            if( message.sender['@type']=='messageSenderUser' &&
                current.sender['@type']=='messageSenderUser' &&
                message.sender.user_id == current.sender.user_id &&
                ((current.date - message.date) < (60 * 15))) {

                return [
                    ...prev.slice(0, -1),
                    {
                        ...prevEl,
                        hide_tail: true
                    }as ProcessedSingleMessage,
                    {
                        ...current,
                        hide_sender_name: true
                    } as ProcessedSingleMessage
                ];
            }

            return [
                ...prev,
                {
                    ...current,
                    hide_sender_name: false,
                    hide_tail: false,
                }
            ];
        }
    }
    return array.reduce<ProcessedMessage[]>(reducer, null as any) as any; //TODO: Find an appropriate solution
}