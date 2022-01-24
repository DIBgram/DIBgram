import React from 'react';
import TdLib from '../../TdWeb/tdlib';
import currencyAmountToString from '../sections/payments/currency-tostring';
import {getUserFullName} from '../user-misc';
import MessagePinnedMessage from './message-pinned-message';
import { durationToString, futureDayToString, timeToString } from '../../time-tostring';
import __, { _s__, __collection, __fmt, __pl } from '../../language-pack/language-pack';
import compileEntities from './ui/entities';
import TdApi from '../../TdWeb/td_api';
import { UsersStoreState } from '../users-store';
import { LanguagePackKey, LanguagePackStringName, LanguagePackStringNamePluralized } from '../../language-pack/language-pack-types';
import currencies from '../sections/payments/currencies.json';

type MessageSummaryWithIconProps = {
    message?: TdApi.td_message,
    className: string,
    users: UsersStoreState,
    chat: TdApi.td_chat,
}

export default function MessageSummaryWithIcon({message, className, users, chat}: MessageSummaryWithIconProps): JSX.Element|null {
    if(!message) return null;

    switch(message.content['@type']) {
        case 'messageAnimation': // GIF
            return (
                <MayHaveCaption
                    type="GIF" //TODO: Find the localized string
                    caption={message.content.caption} 
                    className={className}/>
            );
        
        case 'messageAudio': { // Audio/music file
            let title= message.content.audio.title || message.content.audio.file_name; // If there is no title, use file name instead
            if(message.content.audio.performer) // Prepend performer name
                title= message.content.audio.performer+ ' ­­– ' + title;
            return (
                <MayHaveCaption 
                    type={title} 
                    caption={message.content.caption} 
                    className={className}/>
            );
        }

        case 'messageBasicGroupChatCreate': // X created the group «xxxx»
            return (
                <span className={className}>
                    <span className="part-1">{__fmt('lng_action_created_chat', {from: null, title: message.content.title})}</span>
                </span>
            );

        case 'messageCall': { // Call
            let text: React.ReactNode|React.ReactNode[] ='';
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
                    <span className="part-1">{text}</span>
                </span>
            );
        }

        case 'messageChatAddMembers': { // X added Y
            // If the user joined the group by themselves, it appears as 'X added X' and that is not accurate.
            if(message.sender_id['@type']=='messageSenderUser' && message.content.member_user_ids[0] == message.sender_id?.user_id) {
                return (
                    <span className={className}>
                        <span className="part-1">{__fmt('lng_action_user_joined', {from: null})}</span>
                    </span>
                );
            }

            const newMembers= __collection(false, message.content.member_user_ids.map(id=> getUserFullName(users[id])), false);
            
            return (
                <span className={className}><span className="part-1">
                    {__fmt(newMembers.length> 1 ? 'lng_action_add_users_many' : 'lng_action_add_user', {
                        from: null,
                        users: newMembers,
                        user: newMembers
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
                            from: null,
                            title: message.content.title
                        })}</span>
                    </span>
                );
            }

        case 'messageChatDeleteMember': { // X removed Y
            const deletedMember= users[message.content.user_id];
            if( message.sender_id['@type']=='messageSenderUser' && deletedMember.id == message.sender_id.user_id ) { // Left the group
                return (
                    <span className={className}><span className="part-1">
                        {__fmt('lng_action_user_left', { from: null })}
                    </span></span>
                );
            }
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_kick_user', {
                        from: null,
                        user: getUserFullName(deletedMember)
                    })}
                </span></span>
            );
        }

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
                        {__fmt('lng_action_removed_photo', { from:  null })}
                    </span></span>
                );
            }

        case 'messageChatJoinByLink': // X joined the group via invite link
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_user_joined_by_link', { from: null })}
                </span></span>
            );

        case 'messageChatJoinByRequest': // X was accepted to the group
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_user_joined_by_request', { from: null })}
                </span></span>
            );

        case 'messageChatSetTheme':
            if(message.content.theme_name){
                return (
                    <span className={className}><span className="part-1">
                        <ServiceMessageIncludingYou 
                            message={message}
                            lpString="lng_action_theme_changed"
                            lpString_you="lng_action_you_theme_changed"
                            params={{emoji: message.content.theme_name}}/>
                    </span></span>
                );
            } else {
                return (
                    <span className={className}><span className="part-1">
                        <ServiceMessageIncludingYou 
                            message={message}
                            lpString="lng_action_theme_disabled"
                            lpString_you="lng_action_you_theme_disabled"/>
                    </span></span>
                );
            }

        case 'messageChatSetTtl': { // Auto-delete / self-destruct timer changed
            const ttlTimeUnit= {
                86400: __('lng_ttl_about_duration1'), 
                604800: __('lng_ttl_about_duration2'),
                2678400: __('lng_ttl_about_duration3'),
            }[message.content.ttl];

            if(message.is_channel_post) {
                if(message.content.ttl) { // If TTL is disabled, it will be set to 0
                    return (
                        <span className={className}><span className="part-1">
                            {__fmt('lng_action_ttl_changed_channel', {
                                duration: ttlTimeUnit
                            })}
                        </span></span>
                    );
                } else {
                    return (
                        <span className={className}><span className="part-1">
                            {__('lng_action_ttl_removed_channel')}
                        </span></span>
                    );
                }
            } else {
                if(message.content.ttl) { // If TTL is disabled, it will be set to 0
                    return (
                        <span className={className}><span className="part-1">
                            <ServiceMessageIncludingYou 
                                message={message}
                                lpString="lng_action_ttl_changed"
                                lpString_you="lng_action_ttl_changed_you"
                                params={{duration: ttlTimeUnit}}/>
                        </span></span>
                    );
                } else {
                    return (
                        <span className={className}><span className="part-1">
                            <ServiceMessageIncludingYou 
                                message={message}
                                lpString="lng_action_ttl_removed"
                                lpString_you="lng_action_ttl_removed_you"/>
                        </span></span>
                    );
                }
            }
        }

        case 'messageChatUpgradeFrom': // It is too complicated to get basic group last message.
        case 'messageChatUpgradeTo': // TODO: It's complicated, but it should be done.
            return (
                <span className={className}>
                    <span className="part-1">{_s__('lngd_action_upgrade_to_supergroup')}</span>
                </span>
            );

        case 'messageContact': // Shared contact
            return (
                <span className={className}>
                    <span className="part-1">{__('lng_in_dlg_contact')}</span>
                </span>
            );

        case 'messageContactRegistered': // X joined Telegram
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_user_registered', { from: null })}
                </span></span>
            );

        case 'messageCustomServiceAction': // ¯\_(ツ)_/¯
            return (
                <span className={className}>
                    <span className="part-1">{message.content.text}</span>
                </span>
            );

        case 'messageAnimatedEmoji':
        case 'messageDice': // Dice (🎲🎯🎳⚽🏀)
            return (
                <span className={className}>
                    <span className="part-1">{message.content.emoji}</span>
                </span>
            );

        case 'messageDocument': // File/document
            return (
                <MayHaveCaption
                    type={message.content.document.file_name} 
                    caption={message.content.caption} 
                    className={className}/>
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
                    <span className="part-1">🎮 {message.content.game.title}</span>
                </span>
            );

        case 'messageGameScore': { // X scored {score} in {game}
            // Text to use if game message is not available
            const noGameTitleFallback= (
                <span className={className}><span className="part-1">
                    <ServiceMessageIncludingYou 
                        message={message}
                        lpString="lng_action_game_score_no_game"
                        lpString_you="lng_action_game_you_scored_no_game"
                        count={message.content.score}/>
                </span></span>
            );

            // Get game message
            const GameScoreWithTitle= React.lazy(()=> new Promise<{default: React.ComponentType}>(resolve=> {
                message.content = message.content as TdApi.td_messageGameScore;
                TdLib.sendQuery({
                    '@type': 'getMessage',
                    chat_id: chat.id,
                    message_id: message.content.game_message_id
                }).then(
                    result=> { 
                        //eslint-disable-next-line react/display-name
                        resolve({ default: ()=> {
                            message.content = message.content as TdApi.td_messageGameScore;
                            result = result as TdApi.td_message;
                            result.content = result.content as TdApi.td_messageGame;

                            return (
                                <span className={className}><span className="part-1">
                                    <ServiceMessageIncludingYou 
                                        message={message}
                                        lpString="lng_action_game_score"
                                        lpString_you="lng_action_game_you_scored"
                                        count={message.content.score}
                                        params={{game: result.content.game.title}}/>
                                </span></span>
                            );
                        }});
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
        }

        case 'messageInvoice': // Invoice (a buyable product)
            return (
                <span className={className}>
                    <span className="part-1">{message.content.title}</span>
                </span>
            );

        case 'messageLocation': // Location
            return (
                <span className={className}>
                    <span className="part-1">{__('lng_maps_point')}</span>
                </span>
            );

        case 'messagePassportDataSent': { // You sent some Telegram passport data
            const passportDataTypeToString= {
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
            const passportDataTypes= message.content.types.map(type=> (__(passportDataTypeToString[type['@type']] as LanguagePackKey) as string).toLowerCase());
            return (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_secure_values_sent', {
                        user: chat.title,
                        documents: passportDataTypes.join(', ')
                    })}
                </span></span>
            );
        }

        case 'messagePaymentSuccessful': { // You paid [real] money
            // To be shown if invoice is not available
            const noInvoiceTitleFallback= (
                <span className={className}><span className="part-1">
                    {__fmt('lng_action_payment_done', {
                        amount: currencyAmountToString(message.content.currency as keyof typeof currencies, message.content.total_amount),
                        user: chat.title
                    })}
                </span></span>
            );

            // Get invoice message
            const PaymentInfoWithInvoiceTitle= React.lazy(()=>new Promise<{default:React.ComponentType}>(resolve=> {
                message.content= message.content as TdApi.td_messagePaymentSuccessful;
                TdLib.sendQuery({
                    '@type': 'getMessage',
                    chat_id: message.content.invoice_chat_id,
                    message_id: message.content.invoice_message_id
                }).then(
                    result=> { 
                        //eslint-disable-next-line react/display-name
                        resolve({ default: ()=> {
                            message.content= message.content as TdApi.td_messagePaymentSuccessful;
                            result= result as TdApi.td_message;
                            result.content= result.content as TdApi.td_messageInvoice;
                            return (
                                <span className={className}><span className="part-1">
                                    {__fmt('lng_action_payment_done_for', {
                                        amount: currencyAmountToString(message.content.currency as keyof typeof currencies, message.content.total_amount),
                                        user: chat.title,
                                        invoice: result.content.title
                                    })}
                                </span></span>
                            );
                        }});
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
        }

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
                            {__fmt('lng_ttl_photo_received', { from: null })}
                        </span></span>
                    );
                }
            } else { // Normal photo
                return (
                    <MayHaveCaption
                        type={__('lng_in_dlg_photo') as string}
                        caption={message.content.caption} 
                        className={className}/>
                );
            }
        
        case 'messagePinMessage': { // Pinned message

            // Get pinned message message
            const PinnedMessageMessage= React.lazy(()=>new Promise<{default:React.ComponentType}>(resolve=> {
                message.content= message.content as TdApi.td_messagePinMessage;
                TdLib.sendQuery({
                    '@type': 'getMessage',
                    chat_id: chat.id,
                    message_id: message.content.message_id
                }).then(
                    result=> { 
                        //eslint-disable-next-line react/display-name
                        resolve({ default: ()=> {
                            message.content= message.content as TdApi.td_messagePinMessage;
                            result= result as TdApi.td_message;
                            return (
                                <span className={className}><span className="part-1">
                                    <MessagePinnedMessage message={result} from={null}/>
                                </span></span>
                            );
                        }});
                    },
                    ()=> { // Failed
                        //eslint-disable-next-line react/display-name
                        resolve({ default: ()=> (
                            <span className={className}><span className="part-1">
                                {__fmt('lng_action_pinned_media', {
                                    from: null,
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
                            from: null,
                            media: __('lng_contacts_loading')
                        })}
                    </span></span>
                }>
                    <PinnedMessageMessage/>
                </React.Suspense>
            );
        }
        
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
                            from: null,
                            title: message.content.title
                        })}
                    </span></span>
                );
            }

        case 'messageText':
            return (
                <span className={className}>
                    <span className="part-2">{compileEntities(message.content.text, true)}</span>
                </span>
            );

        case 'messageUnsupported': // Is not supported :(
            return ( //TODO localize
                <span className={className}>
                    <span className="part-2">{_s__('lngd_message_unsupported')}</span>
                </span>
            );
        
        case 'messageVenue': // Venue/location
            return ( //TODO find the translation string
                <span className={className}>
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
                            {__fmt('lng_ttl_video_received', { from: null })}
                        </span></span>
                    );
                }
            } else { // Normal photo
                return (
                    <MayHaveCaption
                        type={__('lng_in_dlg_video') as string}
                        caption={message.content.caption} 
                        className={className}/>
                );
            }

        case 'messageVideoNote':
            return (
                <span className={className}>
                    <span className="part-1">{__('lng_in_dlg_video_message')}</span>
                </span>
            );

        case 'messageVideoChatScheduled':
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
                            from: null,
                            date: __fmt('lng_mediaview_date_time', {
                                date: futureDayToString(message.content.start_date),
                                time: timeToString(message.content.start_date)
                            })
                        })}
                    </span></span>
                );
            }

        case 'messageVideoChatStarted':
            if(message.is_channel_post) {
                return (
                    <span className={className}>
                        <span className="part-1">{__('lng_action_group_call_started_channel')}</span>
                    </span>
                );
            } else {
                return (
                    <span className={className}><span className="part-1">
                        {__fmt('lng_action_group_call_started_group', { from: null })}
                    </span></span>
                );
            }

        case 'messageVideoChatEnded':
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
                            from: null,
                            duration: durationToString(message.content.duration)
                        })}
                    </span></span>
                );
            }

        case 'messageInviteVideoChatParticipants': {
            const invitedMembers= __collection(true, message.content.user_ids.map(id=> // convert user IDs to names
                getUserFullName(users[id])), false); // A, B, and C
            return (
                <span className={className}><span className="part-1">
                    {__fmt((invitedMembers.length==1 ? 'lng_action_invite_user' : 'lng_action_invite_users_many'), {
                        from: null,
                        user: invitedMembers,
                        users: invitedMembers,
                        chat: __('lng_action_invite_user_chat')
                    })}
                </span></span>
            );
        }

        case 'messageVoiceNote':
            return (
                <MayHaveCaption 
                    type={__('lng_in_dlg_audio') as string}
                    caption={message.content.caption} 
                    className={className} />
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

type MayHaveCaptionProps= {
    /** Message type, e.g. 'GIF', 'Video' */
    type: string,
    /** Message caption, can be empty */
    caption: TdApi.td_formattedText,

    className: string,
}

/** If caption has a value, adds a comma to type and returns type */ 
function MayHaveCaption({type, caption, className}: MayHaveCaptionProps): JSX.Element {
    if(caption?.text) type+=',';
    return (
        <span className={className}>
            <span className="part-1">{type}</span> <span className="part-2">{compileEntities(caption, true)}</span>
        </span>
    );
}

type ServiceMessageIncludingYouProps= {
    /** The message object */
    message: TdApi.td_message,
    /** Language pack string key for the service message */
    lpString: LanguagePackStringName,
    /** Language pack string key for the service message if the service message is outgoing */
    lpString_you: LanguagePackStringName,
    /** Parameters for the language pack string */
    params?: {[key: string]: React.ReactNode|React.ReactNode[]},
    /** If provided, the language pack strings will be treated as pluralized */
    count?: number,
}

function ServiceMessageIncludingYou({message, lpString, lpString_you, params={}, count=undefined}: ServiceMessageIncludingYouProps): JSX.Element {
    const string= message.is_outgoing ? lpString_you : lpString;

    if(count==undefined) {
        return <>{__fmt(string as Exclude<LanguagePackStringName, LanguagePackStringNamePluralized>, {
            from: null,
            ...params
        })}</>;
    } else {
        return <>{__pl(string, count, {
            from: null,
            ...params
        })}</>;
    }
}
