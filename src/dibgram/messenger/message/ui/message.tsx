import React from 'react';
import TdApi from '../../../TdWeb/td_api';
import { UsersStoreState } from '../../users-store';
import { ProcessedSingleMessage } from '../processHistory';
import MessageBasicGroupChatCreate from './types/messageBasicGroupChatCreate';
import MessageChatAddMembers from './types/messageChatAddMembers';
import MessageChatChangeTitle from './types/messageChatChangeTitle';
import MessageChatDeleteMember from './types/messageChatDeleteMember';
import MessageChatDeletePhoto from './types/messageChatDeletePhoto';
import MessageChatJoinByLink from './types/messageChatJoinByLink';
import MessageChatJoinByRequest from './types/messageChatJoinByRequest';
import MessageChatSetTheme from './types/messageChatSetTheme';
import MessageChatSetTtl from './types/messageChatSetTtl';
import MessageContactRegistered from './types/messageContactRegistered';
import MessageCustomServiceAction from './types/messageCustomServiceAction';
import MessageExpiredPhoto from './types/messageExpiredPhoto';
import MessageExpiredVideo from './types/messageExpiredVideo';
import MessageGameScore from './types/messageGameScore';
import MessageInviteVideoChatParticipants from './types/messageInviteVideoChatParticipants';
import MessagePassportDataSent from './types/messagePassportDataSent';
import MessagePaymentSuccessful from './types/messagePaymentSuccessful';
import MessagePinMessage from './types/messagePinMessage';
import MessageSupergroupChatCreate from './types/messageSupergroupChatCreate';
import MessageText from './types/messageText';
import { MessageUnsupported } from './types/messageUnsupported';
import MessageVideoChatEnded from './types/messageVideoChatEnded';
import MessageVideoChatScheduled from './types/messageVideoChatScheduled';
import MessageVideoChatStarted from './types/messageVideoChatStarted';
import MessageWebsiteConnected from './types/messageWebsiteConnected';

const messageTypes = {
    'messageText': MessageText,
    'messageExpiredPhoto': MessageExpiredPhoto,
    'messageExpiredVideo': MessageExpiredVideo,
    'messageVideoChatScheduled': MessageVideoChatScheduled,
    'messageVideoChatStarted': MessageVideoChatStarted,
    'messageVideoChatEnded': MessageVideoChatEnded,
    'messageInviteVideoChatParticipants': MessageInviteVideoChatParticipants,
    'messageBasicGroupChatCreate': MessageBasicGroupChatCreate,
    'messageSupergroupChatCreate': MessageSupergroupChatCreate,
    'messageChatChangeTitle': MessageChatChangeTitle,
    'messageChatDeletePhoto': MessageChatDeletePhoto,
    'messageChatAddMembers': MessageChatAddMembers,
    'messageChatJoinByLink': MessageChatJoinByLink,
    'messageChatJoinByRequest': MessageChatJoinByRequest,
    'messageChatDeleteMember': MessageChatDeleteMember,
    'messageChatUpgradeTo': ()=> null,
    'messageChatUpgradeFrom': ()=> null,
    'messagePinMessage': MessagePinMessage,
    'messageChatSetTheme': MessageChatSetTheme,
    'messageChatSetTtl': MessageChatSetTtl,
    'messageCustomServiceAction': MessageCustomServiceAction,
    'messageGameScore': MessageGameScore,
    'messagePaymentSuccessful': MessagePaymentSuccessful,
    'messageContactRegistered': MessageContactRegistered,
    'messageWebsiteConnected': MessageWebsiteConnected,
    'messagePassportDataSent': MessagePassportDataSent
};

export type MessageProps = {
    message: ProcessedSingleMessage
    chat: TdApi.chat
    users: UsersStoreState
};
export const Message= React.memo(function Message({message, chat, users}: MessageProps): JSX.Element {
    const MessageComponent= messageTypes[message.content['@type'] as keyof typeof messageTypes] || MessageUnsupported;
    return <MessageComponent message={message} chat={chat} users={users}/>;
});