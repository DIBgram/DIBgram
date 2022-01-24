import TdApi from '../../TdWeb/td_api';

const serviceMessages= ([
    'messageExpiredPhoto',
    'messageExpiredVideo',
    'messageVideoChatScheduled',
    'messageVideoChatStarted',
    'messageVideoChatEnded',
    'messageInviteVideoChatParticipants',
    'messageBasicGroupChatCreate',
    'messageSupergroupChatCreate',
    'messageChatChangeTitle',
    'messageChatChangePhoto',
    'messageChatDeletePhoto',
    'messageChatAddMembers',
    'messageChatJoinByLink',
    'messageChatJoinByRequest',
    'messageChatDeleteMember',
    'messageChatUpgradeTo',
    'messageChatUpgradeFrom',
    'messagePinMessage',
    'messageScreenshotTaken',
    'messageChatSetTheme',
    'messageChatSetTtl',
    'messageCustomServiceAction',
    'messageGameScore',
    'messagePaymentSuccessful',
    'messageContactRegistered',
    'messageWebsiteConnected',
    'messagePassportDataSent',
    'messageProximityAlertTriggered',
] as TdApi.td_MessageContent['@type'][])

export default function messageIsService(message: TdApi.td_message): boolean {
    return serviceMessages.includes(message.content['@type']);
}