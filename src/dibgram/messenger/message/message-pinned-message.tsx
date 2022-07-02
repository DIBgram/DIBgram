import __, { _s__, __fmt } from '../../language-pack/language-pack';
import TdApi from '../../TdWeb/td_api';
import compileEntities from './ui/entities';
import React from 'react';

type MessagePinnedMessageProps = {
    /** The message which was pinned */
    message: TdApi.message,
    /** The string representation of the user/chat who pinned the message */
    from: React.ReactNode|React.ReactNode[],
}

export default function MessaagePinnedMessage({message, from}: MessagePinnedMessageProps): JSX.Element {
    switch (message.content['@type']) {
        case 'messageAnimation':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_gif'), from: from})}</>;

        case 'messageAudio':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_audio'), from: from})}</>;

        case 'messageContact':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_contact'), from: from})}</>;

        case 'messageAnimatedEmoji':
        case 'messageDice':
            return <>{__fmt('lng_action_pinned_message', {text: message.content.emoji, from: from})}</>;

        case 'messageDocument':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_file'), from: from})}</>;

        case 'messageGame':
            return <>{__fmt('lng_action_pinned_media', {media: __fmt('lng_action_pinned_media_game', {game: message.content.game.title}), from: from})}</>;

        case 'messagePhoto':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_photo'), from: from})}</>;

        case 'messagePoll':
            return <>{__fmt('lng_action_pinned_message', {text: message.content.poll.question, from: from})}</>;

        case 'messageSticker':
            return <>{__fmt('lng_action_pinned_media', {media: __fmt('lng_action_pinned_media_emoji_sticker', {emoji: message.content.sticker.emoji}), from: from})}</>;
        
        case 'messageText': {
            let text= message.content.text.text;
            if( text.length > 21 ) {
                text = `${text.slice(0, 16)}...`;
            }
            const ctext= compileEntities({
                '@type': 'formattedText',
                entities: message.content.text.entities,
                text
            });
            return <>{__fmt('lng_action_pinned_message', {text: ctext, from})}</>;
        }
        case 'messageUnsupported':
            return <>{__fmt('lng_action_pinned_message', {text: (_s__('lngd_message_unsupported') as string).slice(0, 16)+'...', from: from})}</>;

        case 'messageLocation':
        case 'messageVenue':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_location'), from: from})}</>;

        case 'messageVideo':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_video'), from: from})}</>;

        case 'messageVideoNote':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_video_message'), from: from})}</>;

        case 'messageVoiceNote':
            return <>{__fmt('lng_action_pinned_media', {media: __('lng_action_pinned_media_voice'), from: from})}</>;

        default:
            return <>{__fmt('lng_action_pinned_message', {text: '', from: from})}</>;
    }
}