import React from 'react';
import PropTypes from 'prop-types';
import TdLib from '../../TdWeb/tdlib';
import currencyAmountToString from '../sections/payments/currency-tostring';
import {getUserFullName} from '../user-misc';
import { getChatNoCache } from '../chat-store';
import MessagePinnedMessage from './message-pinned-message';
import { durationToString, futureDayToString, timeToString } from '../../time-tostring';
import __, { __fmt, __pl } from '../../language-pack/language-pack';

/**
 * Gets a textual representation of the message without a thumbnail.
 * Usage examples: 
 * - Last message in chat list
 * - Search results 
 * TODO: add possibility to hide sender name (for search results)
 * @returns A span element containing a textual representation of the message. Contains span.part-1 and span.part-2
 */
export default function MessageSummaryWithoutIcon({message, className, users, chat}) {
    if(!message) return null;

    switch(message.content['@type']) {
    case 'messageAnimation': // GIF
        return (
            <MayHaveCaptionThumbnail
                type="GIF" //TODO: Find the localized string
                caption={message.content.caption?.text} 
                className={className} 
                message={message} 
                chat={chat}
                users={users}
                thumbnails={[message.content?.animation?.minithumbnail?.data]}/>
        );
    
    case 'messageAudio': // Audio/music file
        var title= message.content.audio.title || message.content.audio.file_name; // If there is no title, use file name instead
        if(message.content.audio.performer) // Prepend performer name
            title= message.content.audio.performer+ ' ­­– ' + title;
        return (
            <MayHaveCaption 
                type={title} 
                caption={message.content.caption?.text} 
                className={className} 
                message={message} 
                chat={chat}
                users={users}/>
        );

    case 'messageBasicGroupChatCreate': // X created the group «xxxx»
        return (
            <span className={className}>
                <span className="part-1">{__fmt('lng_action_created_chat', {from: <SenderFullName chat={chat} message={message} users={users}/>, title: message.content.title})}</span>
            </span>
        );

    case 'messageCall': // Call
        var text='';
        if(message.is_outgoing) { // You made the call
            switch(message.content.discard_reason?.['@type']) {
            case 'callDiscardReasonMissed':
                text= __(message.content.is_video? 'lng_call_video_cancelled' : 'lng_call_cancelled');
                break;
            default:
                text= __(message.content.is_video? 'lng_call_video_outgoing' : 'lng_call_outgoing');
            }
        } else { // The other user called you
            switch(message.content.discard_reason?.['@type']) {
            case 'callDiscardReasonDeclined':
                text= __(message.content.is_video? 'lng_call_video_declined' : 'lng_call_declined');
                break;
            case 'callDiscardReasonMissed':
                text= __(message.content.is_video? 'lng_call_video_missed' : 'lng_call_missed');
                break;
            default: 
                text= __(message.content.is_video? 'lng_call_video_incoming' : 'lng_call_incoming');
            }
        } 
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">{text}</span>
            </span>
        );

    case 'messageChatAddMembers': // X added Y
        // If the user joined the group by themselves, it appears as 'X added X' and that is not accurate.
        if(message.content.member_user_ids[0] == message.sender?.user_id) {
            return (
                <span className={className}>
                    <span className="part-1">{__fmt('lng_action_user_joined', {from: <SenderFullName message={message} chat={chat} users={users}/>})}</span>
                </span>
            );
        }

        var newMembers= message.content.member_user_ids.map(id=> // convert user IDs to names
            getUserFullName(users[id]));
        if(newMembers.length>1){ // X and Y // X, Y and Z //TODO localize
            newMembers= newMembers.slice(0, newMembers.length - 1) .join(', ') + ' and ' + newMembers[newMembers.length - 1];

            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_add_user', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>,
                        user: newMembers
                    })}
                </span></span>
            );
        } else {
            newMembers= newMembers[0];

            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_add_users_many', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>,
                        users: newMembers
                    })}
                </span></span>
            );
        }

    case 'messageChatChangePhoto': // Chat photo changed
        // Telegram Desktop shows chat photo change events as 'Photo' instead of 'X changed group photo' or 'Channel photo changed'
        return (
            <span className={className}>
                <span className="part-1">{__('lng_attach_photo')}</span> 
            </span>
        );

    case 'messageChatChangeTitle': // Chat was renamed
        if(message.is_channel_post) {
            return (
                <span className={className}>
                    <span className="part-1">{__fmt('lng_action_changed_title_channel', {title: message.content.title})}</span>
                </span>
            );
        } else {
            return (
                <span className={className}>
                    <span className="part-1">{__fmt('lng_action_changed_title', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>,
                        title: message.content.title
                    })}</span>
                </span>
            );
        }

    case 'messageChatDeleteMember': // X removed Y
        var deletedMember= users[message.content.user_id];
        if( deletedMember.id == message.sender?.user_id ) {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_user_left', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>
                    })}
                </span></span>
            );
        }
        return (
            <span className={className}><span className="part-1">
                {__fmt('lng_action_kick_user', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>,
                    user: getUserFullName(deletedMember)
                })}
            </span></span>
        );

    case 'messageChatDeletePhoto': // Chat photo was deleted
        if(message.is_channel_post) {
            return (
                <span className={className}>
                    <span className="part-1">{__('lng_action_removed_photo_channel')}</span>
                </span>
            );
        } else {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_removed_photo', {
                        from:  <SenderFullName message={message} chat={chat} users={users}/>
                    })}
                </span></span>
            );
        }

    case 'messageChatJoinByLink': // X joined the group via invite link
        return (
            <span className={className}><span className="part-1">
                {__fmt('lng_action_user_joined_by_link', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>
                })}
            </span></span>
        );

    case 'messageChatSetTheme':
        if(message.content.theme_name){
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_theme_changed', {
                        from: <SenderFullName message={message} chat={chat} users={users} includeYou={true}/>,
                        emoji: message.content.theme_name
                    })}
                </span></span>
            );
        } else {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_theme_disabled', {
                        from: <SenderFullName message={message} chat={chat} users={users} includeYou={true}/>
                    })}
                </span></span>
            );
        }

    case 'messageChatSetTtl': // Auto-delete / self-destruct timer changed
        var timeConversionTable= {86400: 'day', 604800: 'week', 2678400: 'month'}; // seconds to day, week and month
        return ( //TODO localize
            <span className={className}>
                <span className="part-1"><SenderFullName message={message} chat={chat} users={users} includeYou={true}/> set messages to auto-delete in 1 {timeConversionTable[message.content.ttl]}</span>
            </span>
        );

    case 'messageChatUpgradeFrom': // It is too complicated to get basic group last message.
    case 'messageChatUpgradeTo': // TODO: It's complicated, but it should be done.
        return (
            <span className={className}>
                <span className="part-1">Group was upgraded to a super-group</span>
            </span>
        );

    case 'messageContact': // Shared contact
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">{__('lng_in_dlg_contact')}</span>
            </span>
        );

    case 'messageContactRegistered': // X joined Telegram
        return (
            <span className={className}><span className="part-1">
                {__fmt('lng_action_user_registered', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>
                })}
            </span></span>
        );

    case 'messageCustomServiceAction': // ¯\_(ツ)_/¯
        return (
            <span className={className}>
                <span className="part-1">{message.content.text}</span>
            </span>
        );

    case 'messageDice': // Dice (🎲🎯🎳⚽🏀)
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">{message.content.emoji}</span>
            </span>
        );

    case 'messageDocument': // File/document
        return (
            <MayHaveCaptionThumbnail
                type={message.content.document.file_name} 
                caption={message.content.caption?.text} 
                className={className} 
                message={message} 
                chat={chat}
                users={users}
                thumbnails={[message.content?.document?.minithumbnail?.data]}/>
        );
    
    case 'messageExpiredPhoto': 
        return (
            <span className={className}>
                <span className="part-1">{__('lng_ttl_photo_expired')}</span>
            </span>
        );
    
    case 'messageExpiredVideo':
        return (
            <span className={className}>
                <span className="part-1">{__('lng_ttl_video_expired')}</span>
            </span>
        );
    
    case 'messageGame': // Game
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">🎮 {message.content.game.title}</span>
            </span>
        );

    case 'messageGameScore': // X scored {score} in {game}
        // Text to use if game message is not available
        var noGameTitleFallback= (
            <span className={className}><span className="part-1">
                {__pl('lng_action_game_score_no_game', message.content.score, {
                    from: <SenderFullName message={message} chat={chat} users={users} includeYou={true}/>
                })}
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
                            {__pl('lng_action_game_score', message.content.score, {
                                from: <SenderFullName message={message} chat={chat} users={users} includeYou={true}/>,
                                game: result.content.game.title
                            })}
                        </span></span>
                    )});
                },
                ()=> { // Failed
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

    case 'messageInvoice': // Invoice (a buyable product)
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">{message.content.title}</span>
            </span>
        );

    case 'messageLocation': // Location
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">{__('lng_maps_point')}</span>
            </span>
        );

    case 'messagePassportDataSent': // You sent some Telegram passport data
        var passportDataTypeToString= {
            'passportElementTypeAddress':               'lng_passport_address',
            'passportElementTypeBankStatement':         'lng_passport_address_statement',
            'passportElementTypeDriverLicense':         'lng_passport_identity_license',
            'passportElementTypeEmailAddress':          'lng_passport_email_title',
            'passportElementTypeIdentityCard':          'lng_passport_identity_card',
            'passportElementTypeInternalPassport':      'lng_passport_identity_internal',
            'passportElementTypePassport':              'lng_passport_identity_passport',
            'passportElementTypePassportRegistration':  'lng_passport_address_registration',
            'passportElementTypePersonalDetails':       'lng_passport_personal_details',
            'passportElementTypePhoneNumber':           'lng_passport_phone_title',
            'passportElementTypeRentalAgreement':       'lng_passport_address_agreement',
            'passportElementTypeTemporaryRegistration': 'lng_passport_address_temporary',
            'passportElementTypeUtilityBill':           'lng_passport_address_bill',
        };
        var passportDataTypes= message.content.types.map(type=> __(passportDataTypeToString[type['@type']]).toLowerCase());
        return (
            <span className={className}><span className="part-1">
                {__fmt('lng_action_secure_values_sent', {
                    user: chat.title,
                    documents: passportDataTypes.join(', ')
                })}
            </span></span>
        );

    case 'messagePaymentSuccessful': // You paid [real] money
        // To be shown if invoice is not available
        var noInvoiceTitleFallback= (
            <span className={className}><span className="part-1">
                {__fmt('lng_action_payment_done', {
                    amount: currencyAmountToString(message.content.currency, message.content.total_amount),
                    user: chat.title
                })}
            </span></span>
        );

        // Get invoice message
        var PaymentInfoWithInvoiceTitle= React.lazy(()=>new Promise(resolve=> {
            TdLib.sendQuery({
                '@type': 'getMessage',
                chat_id: message.content.invoice_chat_id,
                message_id: message.content.invoice_message_id
            }).then(
                result=> { 
                    //eslint-disable-next-line react/display-name
                    resolve({ default: ()=> (
                        <span className={className}><span className="part-1">
                            {__fmt('lng_action_payment_done_for', {
                                amount: currencyAmountToString(message.content.currency, message.content.total_amount),
                                user: chat.title,
                                invoice: result.content.title
                            })}
                        </span></span>
                    )});
                },
                ()=> { // Failed
                    resolve({ default: ()=> noInvoiceTitleFallback});
                }
            );
        }));

        return (
            <React.Suspense fallback={noInvoiceTitleFallback}>
                <PaymentInfoWithInvoiceTitle/>
            </React.Suspense>
        );

    case 'messagePhoto': // A photo
        if(message.content.is_secret) { // Self-destructing photo, not implemented
            if(message.is_outgoing) { // You sent it
                return (
                    <span className={className}>
                        <span className="part-1">{__('lng_ttl_photo_sent')}</span>
                    </span>
                );
            } else { // You received it
                return (
                    <span className={className}><span className="part-1">
                        {__fmt('lng_ttl_photo_received', {
                            from: <SenderFullName message={message} chat={chat} users={users}/>
                        })}
                    </span></span>
                );
            }
        } else { // Normal photo
            return (
                <MayHaveCaptionThumbnail 
                    type={__('lng_in_dlg_photo')}
                    caption={message.content.caption?.text} 
                    className={className} 
                    message={message} 
                    chat={chat}
                    users={users}
                    thumbnails={[message.content?.photo?.minithumbnail?.data]}/>
            );
        }
    
    case 'messagePinMessage':

        // Get pinned message message
        var PinnedMessageMessage= React.lazy(()=>new Promise(resolve=> {
            TdLib.sendQuery({
                '@type': 'getMessage',
                chat_id: chat.id,
                message_id: message.content.message_id
            }).then(
                result=> { 
                    //eslint-disable-next-line react/display-name
                    resolve({ default: ()=> (
                        <span className={className}><span className="part-1">
                            <MessagePinnedMessage message={result} sender={<SenderFullName message={message} chat={chat} users={users}/>}/>
                        </span></span>
                    )});
                },
                ()=> { // Failed
                    //eslint-disable-next-line react/display-name
                    resolve({ default: ()=> (
                        <span className={className}><span className="part-1">
                            {__fmt('lng_action_pinned_media', {
                                from: <SenderFullName message={message} chat={chat} users={users}/>,
                                media: __('lng_deleted_message')
                            })}
                        </span></span>
                    )});
                }
            );
        }));

        return (
            <React.Suspense fallback={
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_pinned_media', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>,
                        media: __('lng_contacts_loading')
                    })}
                </span></span>
            }>
                <PinnedMessageMessage/>
            </React.Suspense>
        );
    
    case 'messagePoll':
        return (
            <span className={className}>
                <span className="part-1">{message.content.poll.question}</span>
            </span>
        );
    
    // case 'messageProximityAlertTriggered': // TODO: Reproduce this message and implement it
    // case 'messageScreenshotTaken':
    case 'messageSticker': // Sticker
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">
                    {__fmt('lng_in_dlg_sticker_emoji', {
                        emoji: message.content.sticker.emoji
                    })}
                </span>
            </span>
        );

    case 'messageSupergroupChatCreate': // Supergroup created
        if(message.is_channel_post) {
            return (
                <span className={className}>
                    <span className="part-1">{__('lng_action_created_channel')}</span>
                </span>
            );
        } else {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_created_chat', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>,
                        title: message.content.title
                    })}
                </span></span>
            );
        }

    case 'messageText':
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-2">{message.content.text.text.replace(/(\n|\r|\r\n|\n\r)/g, ' ')}</span>
            </span>
        );

    case 'messageUnsupported': // Is not supported :(
        return ( //TODO localize
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-2">This message is not supported by your version of DIBgram. Please update to the latest version.</span>
            </span>
        );
    
    case 'messageVenue': // Venue/location
        return ( //TODO find the translation string
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">Location, </span>
                <span className="part-2">{message.content.venue.title}</span>
            </span>
        );

    case 'messageVideo': // Video
        if(message.content.is_secret) { // Self-destructing photo, not implemented
            if(message.is_outgoing) { // You sent it
                return (
                    <span className={className}>
                        <span className="part-1">{__('lng_ttl_video_sent')}</span>
                    </span>
                );
            } else { // You received it
                return (
                    <span className={className}><span className="part-1">
                        {__fmt('lng_ttl_video_received', {
                            from: <SenderFullName message={message} chat={chat} users={users}/>
                        })}
                    </span></span>
                );
            }
        } else { // Normal photo
            return (
                <MayHaveCaptionThumbnail
                    type={__('lng_in_dlg_video')}
                    caption={message.content.caption?.text} 
                    className={className} 
                    message={message} 
                    chat={chat}
                    users={users}
                    isVideo={true}
                    thumbnails={[message.content?.video?.minithumbnail?.data]}/>
            );
        }

    case 'messageVideoNote':
        return (
            <span className={className}>
                <MessageSummarySender message={message} chat={chat} users={users}/>
                <span className="part-1">{__('lng_in_dlg_video_message')}</span>
            </span>
        );

    case 'messageVoiceChatScheduled':
        if(message.is_channel_post) {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_group_call_scheduled_channel', {
                        date: __fmt('lng_mediaview_date_time', {
                            date: futureDayToString(message.content.start_date),
                            time: timeToString(message.content.start_date)
                        })
                    })}
                </span></span>
            );
        } else {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_group_call_scheduled_group', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>,
                        date: __fmt('lng_mediaview_date_time', {
                            date: futureDayToString(message.content.start_date),
                            time: timeToString(message.content.start_date)
                        })
                    })}
                </span></span>
            );
        }

    case 'messageVoiceChatStarted':
        if(message.is_channel_post) {
            return (
                <span className={className}>
                    <span className="part-1">{__('lng_action_group_call_started_channel')}</span>
                </span>
            );
        } else {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_group_call_started_group', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>
                    })}
                </span></span>
            );
        }

    case 'messageVoiceChatEnded':
        if(message.is_channel_post) {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_group_call_finished', {
                        duration: durationToString(message.content.duration)
                    })}
                </span></span>
            );
        } else {
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_group_call_finished_group', {
                        from: <SenderFullName message={message} chat={chat} users={users}/>,
                        duration: durationToString(message.content.duration)
                    })}
                </span></span>
            );
        }

    case 'messageInviteVoiceChatParticipants':
        var invitedMembers= message.content.user_ids.map(id=> // convert user IDs to names
            getUserFullName(users[id]));
        if(invitedMembers.length>1){ // X and Y // X, Y and Z
            invitedMembers= invitedMembers.slice(0, invitedMembers.length - 1) .join(', ') + ' and ' + invitedMembers[invitedMembers.length - 1];
        } else {
            invitedMembers= invitedMembers[0];
        }
        return (
            <span className={className}><span className="part-1">
                {__fmt('lng_action_invite_user', {
                    from: <SenderFullName message={message} chat={chat} users={users}/>,
                    user: invitedMembers,
                    chat: __('lng_action_invite_user_chat')
                })}
            </span></span>
        );

    case 'messageVoiceNote':
        return (
            <MayHaveCaption 
                type={__('lng_in_dlg_audio')}
                caption={message.content.caption?.text} 
                className={className} 
                message={message} 
                chat={chat}
                users={users}/>
        );

    case 'messageWebsiteConnected':
        return (
            <span className={className}><span className="part-1">
                {__fmt('lng_action_bot_allowed_from_domain', {
                    domain: message.content.domain_name
                })}
            </span></span>
        );

    default:
        return null;
    }
}
MessageSummaryWithoutIcon.propTypes= {
    /** Input message */
    message: PropTypes.object,
    className: PropTypes.string,
    /** The chat in which the message was */
    chat: PropTypes.object,
    /** A dictionary of all users */
    users: PropTypes.object,
};


/** If caption has a value, adds a comma to type and returns type */ 
function MayHaveCaption({type, caption, className, message, chat, users}) {
    if(caption) type+=',';
    return (
        <span className={className}>
            <MessageSummarySender message={message} chat={chat} users={users}/>
            <span className="part-1">{type}</span> <span className="part-2">{caption.replace(/(\n|\r|\r\n|\n\r)/g, ' ')}</span>
        </span>
    );
}
MayHaveCaption.propTypes= {
    /** Message type, e.g. 'GIF', 'Video' */
    type: PropTypes.string.isRequired,
    /** Message caption, can be empty */
    caption: PropTypes.string,
    className: PropTypes.string,
    /** Message object */
    message: PropTypes.object,
    /** The chat in which the message was sent */
    chat: PropTypes.object,
    /** A dictionary of all users */
    users: PropTypes.object.isRequired
};

/** If caption has a value, adds a comma to type and returns type */ 
function MayHaveCaptionThumbnail({thumbnails, isVideo, type, caption, className, message, chat, users}) {
    if(!thumbnails?.length) return <MayHaveCaption type={type} caption={caption} className={className} message={message} chat={chat} users={users}/>;
    return (
        <span className={className}>
            <MessageSummarySender message={message} chat={chat} users={users}/>
            {thumbnails.map((data, i) => data && <span className={'thumbnail'+ (isVideo? ' video': '')} key={i}><img src={'data:image/jpeg;base64,'+data}/></span>)} 
            {caption? 
                <span className="part-2">{caption.replace(/(\n|\r|\r\n|\n\r)/g, ' ')}</span>
                :<span className="part-1">{type}</span> 
            }
        </span>
    );
}
MayHaveCaptionThumbnail.propTypes= {
    /** An array of one or more base64-encoded image data */
    thumbnails: PropTypes.arrayOf(PropTypes.string),
    /** If true, a tiny play icon will be shown on the image */
    isVideo: PropTypes.bool,
    /** Message type, e.g. 'GIF', 'Video' */
    type: PropTypes.string.isRequired,
    /** Message caption, can be empty */
    caption: PropTypes.string,
    className: PropTypes.string,
    /** Message object */
    message: PropTypes.object,
    /** The chat in which the message was sent */
    chat: PropTypes.object,
    /** A dictionary of all users */
    users: PropTypes.object.isRequired
};

/** Sender's first name + last name */
function SenderFullName({message, chat, users, includeYou}) {
    if(includeYou) { // Use 'You' if the message is outgoing?
        return message.is_outgoing ? 'You' : <SenderFullName message={message} chat={chat} users={users}/>;
    }
    const sender=message.sender;
    const user=users[sender.user_id];
    if(sender['@type']=='messageSenderUser') {
        return getUserFullName(user); 
    } else if(sender['@type']=='messageSenderChat') { // Anonymous admin
        return chat.title;
    }
}

/** Short sender names in the beginning of message previews */
export const MessageSummarySender= 
    function MessageSummarySender ({message, chat, users}) {
        if(!message) return null;

        var part1;
        if(chat && (!message.is_channel_post)) { // Channel posts dont have sender names
            if(message.is_outgoing) {
                part1= 'You: ';
            } else if(['chatTypeBasicGroup', 'chatTypeSupergroup'].includes(chat.type['@type'])) { // Message is sent in a group
                if(message.sender['@type']=='messageSenderUser') {
                    part1= users[message.sender.user_id].first_name + ': ';
                }
            }
            if(message.sender['@type']=='messageSenderChat') {
                part1= getChatNoCache(message.sender.chat_id).title+': ';
            }
        }
        return part1? <span className="sender">{part1}</span> : null;
    };
MessageSummarySender.propTypes= {
    /** Message to check the sender */
    message: PropTypes.object.isRequired,
    /** Chat in which the message was sent */
    chat: PropTypes.object.isRequired,
    /** A dictionary of all users */
    users: PropTypes.object.isRequired
};
