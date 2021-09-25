/**
 * Gets message sending status. Can return 3 values:
 * - `"sending"`: the message is outgoing and is being sent.
 * - `"sent"`: the message is outgoing and was sent.
 * - `"seen"`: the message is outgoing and was seen by the other party.
 * - `"unread"`: the message is incoming and was not seen by this party.
 * - `"read"`: the message is incoming and was seen by this party.
 * @param {import("tdweb").TdObject} chat The chat in which the message was sent.
 * @param {import("tdweb").TdObject} message The message to check.
 */
export function getMessageStatus(chat, message) {
    if(!chat || !message) return undefined;
    if(message.is_outgoing) {
        if(message.sending_state) {
            return 'sending';
        }
        if(chat.last_read_outbox_message_id >= message.id) {
            return 'seen';
        }
        return 'sent';
    }
    if(chat.last_read_inbox_message_id >= message.id) {
        return 'read';
    }
    return 'unread';
}