import React from 'react';
import './footer.scss';
import ComposeButton from './compose-button';
import __ from '../../../../language-pack/language-pack';
import options from '../../../../TdWeb/options';
import { ChatSectionContentProps } from '../chat-section';

export function ChatFooter({user, supergroup}: ChatSectionContentProps): JSX.Element {
    return (
        <div className="footer">
            {(user?.username || supergroup?.username) && ( // As DIBgram has many missing features, we can show an 'OPEN WITH' button so the user can open the chat with another client
                <ComposeButton onClick={()=> {
                    window.open((options['t_me_url'] as string) + (user?.username || supergroup?.username), '_blank');
                }}>
                    {__('lng_media_open_with')}
                </ComposeButton>
            )}
            {/* TODO: Render different footers based on chat. (e.g. compose area, 'mute', 'unmute', 'unblock', etc.) Compose footer must be on a separate file. */}
        </div>
    );
}
