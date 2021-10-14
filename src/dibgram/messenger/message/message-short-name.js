/**
 * Gets a very short representation of the message, even if it it does not contain the full meaning.
 * 
 * Used in places such as "Some user pinned **XXXX**"
 */
export default function MessageShortName({message}) {
    switch (message.content['@type']) {
    case 'messageAnimation':
        return 'a GIF';

    case 'messageAudio':
        return 'an audio file';

    case 'messageContact':
        return 'a contact information';

    case 'messageDice':
        return '«'+ message.content.emoji +'»';

    case 'messageDocument':
        return 'a file';

    case 'messageGame':
        return `the game «${message.content.game.title}»`;

    case 'messagePhoto':
        return 'a photo';

    case 'messagePoll':
        return '«'+ message.content.poll.question +'»';

    case 'messageSticker':
        return 'a '+ message.content.sticker.emoji +' sticker';
    
    case 'messageText':
        var text= message.content.text.text;
        if( text.length > 21 ) {
            text = `«${text.substr(0, 16)}...»`;
        }
        return `«${text}»`;
    
    case 'messageUnsupported':
        return '«This message is ...»';

    case 'messageLocation':
    case 'messageVenue':
        return 'a location mark';

    case 'messageVideo':
        return 'a video';

    case 'messageVideoNote':
        return 'a video message';

    case 'messageVoiceNote':
        return 'a voice message';

    default:
        return '«»';
    }
}