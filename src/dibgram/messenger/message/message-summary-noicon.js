import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TdLib from '../../TdWeb/tdlib';
import currencyAmountToString from '../payments/currency-tostring';

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
            return (
                <span className={className}>
                    <span className="part-1"><SenderFullName chat={chat} message={message} users={users}/> created the group «{message.content.title}»</span>
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
            var members= message.content.member_user_ids.map(id=> 
                users[id].last_name ? (users[id].first_name+' '+ users[id].last_name) : users[id].first_name);
            if(members.length>1){
                members= members.slice(0, members.length - 1) .join(', ') + ' and ' + members[members.length - 1];
            } else {
                members= members[0];
            }
            if(message.content.member_user_ids[0] == message.sender?.user_id) {
                return (
                    <span className={className}>
                        <span className="part-1"><SenderFullName message={message} chat={chat} users={users}/> joined the group</span>
                    </span>
                );
            }
            return (
                <span className={className}>
                    <span className="part-1"><SenderFullName message={message} chat={chat} users={users}/> added {members}</span>
                </span>
            );

        case 'messageChatChangePhoto':
            return (
                <span className={className}>
                    <span className="part-1">Photo</span>
                </span>
            );

        case 'messageChatChangeTitle': // I can't believe copilot can fill these lines without having access to API docs
            if(message.is_channel_post) {
                return (
                    <span className={className}>
                        <span className="part-1">Channel name was changed to «{message.content.title}»</span>
                    </span>
                );
            } else {
                return (
                    <span className={className}>
                        <span className="part-1"><SenderFullName message={message} chat={chat} users={users}/>
                        &nbsp;changed group name to «{message.content.title}»</span>
                    </span>
                );
            }

        case 'messageChatDeleteMember':
            var deletedMember= users[message.content.user_id];
            return (
                <span className={className}>
                    <span className="part-1"><SenderFullName message={message} chat={chat} users={users}/>
                    &nbsp;removed {deletedMember.first_name+' '+ deletedMember.last_name}</span>
                </span>
            );

        case 'messageChatDeletePhoto':
            if(message.is_channel_post) {
                return (
                    <span className={className}>
                        <span className="part-1">Channel photo removed</span>
                    </span>
                );
            } else {
                return (
                    <span className={className}>
                        <span className="part-1"><SenderFullName message={message} chat={chat} users={users}/>
                        &nbsp;removed group photo</span>
                    </span>
                );
            }

        case 'messageChatJoinByLink':
            return (
                <span className={className}>
                    <span className="part-1"><SenderFullName message={message} chat={chat} users={users}/>
                    &nbsp;joined the group via invite link</span>
                </span>
            );

        case 'messageChatSetTtl':
            // seconds to day, week and month
            var timeConversionTable= {86400: 'day', 604800: 'week', 2678400: 'month'};
            return (
                <span className={className}>
                    <span className="part-1"><SenderFullName message={message} chat={chat} users={users} includeYou={true}/> set messages to auto-delete in 1 {timeConversionTable[message.content.ttl]}</span>
                </span>
            );

        case 'messageChatUpgradeFrom':
        case 'messageChatUpgradeTo':
            return (
                <span className={className}>
                    <span className="part-1">Group was upgraded to a super-group</span>
                </span>
            );

        case 'messageContact':
            return (
                <span className={className}>
                    <MessageSummarySender message={message} chat={chat}/>
                    <span className="part-1">Contact</span>
                </span>
            );

        case 'messageContactRegistered':
            return (
                <span className={className}>
                    <span className="part-1"><SenderFullName message={message} chat={chat} users={users}/>
                    &nbsp;joined Telegram</span>
                </span>
            );

        case 'messageCustomServiceAction':
            return (
                <span className={className}>
                    <span className="part-1">{message.content.text}</span>
                </span>
            );

        case 'messageDice':
            return (
                <span className={className}>
                    <MessageSummarySender message={message} chat={chat}/>
                    <span className="part-1">{message.content.emoji}</span>
                </span>
            );

        case 'messageDocument':
            return <MayHaveCaption type={message.content.document.file_name} caption={message.content.caption?.text} className={className} message={message} chat={chat}/>;
        
        // case 'messageExpiredPhoto':
        // case 'messageExpiredVideo':
        case 'messageGame':
            return (
                <span className={className}>
                    <MessageSummarySender message={message} chat={chat}/>
                    <span className="part-1">🎮 {message.content.game.title}</span>
                </span>
            );

        case 'messageGameScore':
            var noGameTitleFallback= (
                <span className={className}><span className="part-1">
                    <SenderFullName message={message} chat={chat} users={users} includeYou={true}/> scored {message.content.score}
                </span></span>
            );

            // Get game message
            var GameScoreWithTitle= React.lazy(()=>new Promise(resolve=> {
                TdLib.sendQuery({
                    '@type': 'getMessage',
                    chat_id: chat.id,
                    message_id: message.content.game_message_id
                }).then(
                    result=> { 
                        //eslint-disable-next-line react/display-name
                        resolve({ default: ()=> (
                            <span className={className}><span className="part-1">
                                <SenderFullName message={message} chat={chat} users={users} includeYou={true}/> scored {message.content.score} in {result.content.game.title}
                            </span></span>
                        )});
                    },
                    ()=> { 
                        //eslint-disable-next-line react/display-name
                        resolve({ default: ()=> noGameTitleFallback});
                    }
                );
            }));

            return (
                <React.Suspense fallback={noGameTitleFallback}>
                    <GameScoreWithTitle/>
                </React.Suspense>
            );

        case 'messageInvoice':
            return (
                <span className={className}>
                    <MessageSummarySender message={message} chat={chat}/>
                    <span className="part-1">{message.content.title}</span>
                </span>
            );

        case 'messageLocation':
            return (
                <span className={className}>
                    <MessageSummarySender message={message} chat={chat}/>
                    <span className="part-1">{message.content.title}</span>
                </span>
            );

        case 'messagePassportDataSent':
            var passportDataTypeToString= {
                'passportElementTypeAddress': 'address',
                'passportElementTypeBankStatement': 'bank statement',
                'passportElementTypeDriverLicense': 'driver license',
                'passportElementTypeEmailAddress': 'email address',
                'passportElementTypeIdentityCard': 'identity card',
                'passportElementTypeInternalPassport': 'internal passport',
                'passportElementTypePassport': 'passport',
                'passportElementTypePassportRegistration': 'passport registration',
                'passportElementTypePersonalDetails': 'personal details',
                'passportElementTypePhoneNumber': 'phone number',
                'passportElementTypeRentalAgreement': 'rental agreement',
                'passportElementTypeTemporaryRegistration': 'temporary registration',
                'passportElementTypeUtilityBill': 'utility bill',
            };
            var passportDataTypes= message.content.types.map(type=> passportDataTypeToString[type['@type']]);
            return (
                <span className={className}>
                    <span className="part-1">
                        {chat.title} received the following documents: {passportDataTypes.join(', ')}
                    </span>
                </span>
            );

        case 'messagePaymentSuccessful':
            var noInvoiceTitleFallback= (
                <span className={className}>
                    <span className="part-1">
                        You successfully transferred 
                        {currencyAmountToString(message.content.currency, message.content.total_amount)} 
                        to {chat.title}
                    </span>
                </span>
            );

            // Get invoice message
            var PaymentInfoWithInvoiceTitle= React.lazy(()=>new Promise(resolve=> {
                TdLib.sendQuery({
                    '@type': 'getMessage',
                    chat_id: chat.id,
                    message_id: message.content.invoice_message_id
                }).then(
                    result=> { 
                        //eslint-disable-next-line react/display-name
                        resolve({ default: ()=> (
                            <span className={className}>
                                <span className="part-1">
                                    You successfully transferred 
                                    {currencyAmountToString(message.content.currency, message.content.total_amount)} 
                                    to {chat.title} for {result.content.title}
                                </span>
                            </span>
                        )});
                    },
                    (error)=> { 
                        console.log(error);
                        resolve({ default: ()=> noInvoiceTitleFallback});
                    }
                );
            }));

            return (
                <React.Suspense fallback={noInvoiceTitleFallback}>
                    <PaymentInfoWithInvoiceTitle/>
                </React.Suspense>
            );

        case 'messagePhoto':
            if(message.content.is_secret) {
                if(message.is_outgoing) {
                    return (
                        <span className={className}>
                            <span className="part-1">You sent a self-destructing photo</span>
                        </span>
                    );
                } else {
                    return (
                        <span className={className}><span className="part-1">
                            <SenderFullName message={message} chat={chat} users={users}/> sent you a self-destructing photo. Please view it on your mobile.
                        </span></span>
                    );
                }
            } else {
                return <MayHaveCaption type="Photo" caption={message.content.caption?.text} className={className} message={message} chat={chat}/>;
            }

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
            <span className="part-1">{type}</span> <span className="part-2">{caption.replace(/(\n|\r|\r\n|\n\r)/g, ' ')}</span>
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

function SenderFullName({message, chat, users, includeYou}) {
    if(includeYou) {
        return message.is_outgoing ? 'You' : <SenderFullName message={message} chat={chat} users={users}/>;
    }
    const sender=message.sender;
    const user=users[sender.user_id];
    if(sender['@type']=='messageSenderUser') {
        return user.last_name ? (user.first_name +' '+ user.last_name) : user.first_name;
    } else if(sender['@type']=='messageSenderChat') {
        return chat.title;
    }
}

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
