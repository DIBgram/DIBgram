import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Gets a textual representation of the message without a thumbnail.
 * Usage examples: 
 * - Last message in chat list
 * - Pinned message
 * - Replies
 * - Search results
 * @returns A span element containing a textual representation of the message. Contains span.part-1 and span.part-2
 */

const MessageSummaryWithoutIcon= connect(state=> ({users: state}))(
    function MessageSummaryWithoutIcon({message, className, users, chat}) {
        if(!message) return null;
        switch(message.content['@type']) {
        case 'messageAnimation':
            return <MayHaveCaption type="GIF" caption={message.content.caption?.text} className={className} message={message} chat={chat}/>;
        case 'messageAudio':
            var title= message.content.audio.title || message.content.audio.file_name;
            if(message.content.audio.performer)
                title= message.content.audio.performer+ ' ­­– ' + title;
            return <MayHaveCaption type={title} caption={message.content.caption?.text} className={className} message={message} chat={chat}/>;
        case 'messageBasicGroupChatCreate':
            var creator= users[message.content.member_user_ids[0]];
            return (
                <span className={className}>
                    <span className="part-1">{creator.first_name} {creator.last_name} created the group «{message.content.title}</span>
                </span>
            );
        case 'messageCall':
            var text='';
            if(message.is_outgoing) {
                switch(message.content.discard_reason?.['@type']) {
                case 'callDiscardReasonMissed':
                    text= 'Cancelled call';
                    break;
                default:
                    text= 'Outgoing call';
                }
            } else {
                switch(message.content.discard_reason?.['@type']) {
                case 'callDiscardReasonDeclined':
                    text= 'Declined call';
                    break;
                case 'callDiscardReasonMissed':
                    text= 'Missed call';
                    break;
                default: 
                    text= 'Incoming call';
                }
            } 
            return (
                <span className={className}>
                    <MessageSummarySender message={message} chat={chat}/>
                    <span className="part-1">{text}</span>
                </span>
            );
        case 'messageChatAddMembers':
            var members= message.content.member_user_ids.map(id=> users[id].first_name+' '+ users[id].last_name);
            if(members.length>1){
                members= members.slice(0, members.length - 1) .join(', ') + ' and ' + members[members.length - 1];
            } else {
                members= members[0];
            }
            var sender;
            if(message.sender['@type']=='messageSenderUser') {
                sender= users[message.sender.user_id].first_name +' '+ users[message.sender.user_id].last_name;
            } else if(message.sender['@type']=='messageSenderChat') {
                sender= chat.title;
            }
            return (
                <span className={className}>
                    {sender} added {members}
                </span>
            );
        default:
            return null;
        }
    });
export default MessageSummaryWithoutIcon;
MessageSummaryWithoutIcon.propTypes= {
    message: PropTypes.object,
    className: PropTypes.string
};

// If caption has a value, add a comma to type and return type
function MayHaveCaption({type, caption, className, message, chat}) {
    if(caption) type+=',';
    return (
        <span className={className}>
            <MessageSummarySender message={message} chat={chat}/>
            <span className="part-1">{type}</span> <span className="part-2">{caption}</span>
        </span>
    );
}
MayHaveCaption.propTypes= {
    type: PropTypes.string.isRequired,
    caption: PropTypes.string,
    className: PropTypes.string,
    message: PropTypes.object,
    chat: PropTypes.object
};

export const MessageSummarySender= connect(state=> ({users: state}))(
    function MessageSummarySender ({message, chat, users}) {
        if(!message) return null;
        var part1;
        if(chat && (!message.is_channel_post)) {
            if(message.is_outgoing) {
                part1= 'You: ';
            } else if(['chatTypeBasicGroup', 'chatTypeSupergroup'].includes(chat.type['@type'])) {
                if(message.sender['@type']=='messageSenderUser') {
                    part1= users[message.sender.user_id].first_name + ': ';
                }
            }
            if(message.sender['@type']=='messageSenderChat') {
                part1= chat.title+': ';
            }
        }
        return part1? <span className="sender">{part1}</span> : null;
    });
MessageSummarySender.propTypes= {
    message: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired
};
