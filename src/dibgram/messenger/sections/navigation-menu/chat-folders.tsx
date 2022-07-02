import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filters from '../../../ui/icon/chat_filters/chat-filters';
import RippleEffect, {handleMyMouseEventsFunction, RippleEffectProps_AutoSettable} from '../../../ui/elements/ripple-effect';
import HamburgerMenuButton from './hamburger-menu/menu-button';
import { ChatListUnreadData, ChatStoreAction, ChatStoreState, ChatStoreUnreadData, compareChatList } from '../../chat-store';
import TdLib from '../../../TdWeb/tdlib';
import ScrollView from '../../../ui/scroll/scrollbar';
import './chat-folders.scss';
import __ from '../../../language-pack/language-pack';
import TdApi from '../../../TdWeb/td_api';
import { Dispatch } from 'redux';

//eslint-disable-next-line @typescript-eslint/no-empty-function
export const chatListScrollToTopEvent = [function():void{}];

type ChatFolderProps = {
    folder: TdApi.chatFilterInfo,
    active: boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    unread: ChatListUnreadData
}

/**
 * Renders a chat folder button
 */
export function ChatFolder({folder, active, onClick, unread}: ChatFolderProps): JSX.Element {
    // Ripple effect
    const ripple= React.useState<RippleEffectProps_AutoSettable>({state: 'off'});
    const rippleEvents= handleMyMouseEventsFunction(ripple);

    const [iconName, setIconName]= React.useState(folder.icon_name);

    React.useEffect(()=> { // Get folder chats, TDLib won't show them if this request isn't sent
        TdLib.sendQuery({
            '@type': 'loadChats',
            'chat_list': {
                '@type': 'chatListFilter',
                'chat_filter_id': folder.id,
            },
            'limit': 50 // Only get 50 chats //TODO: Implement loading more chats
        });
    }, []);

    React.useEffect(()=> {
        if(!folder.icon_name) {
            // Default icon is used and we don't know what it is.
            TdLib.sendQuery({ // Get chat filter info so we can get an idea what it is
                '@type': 'getChatFilter',
                'chat_filter_id': folder.id
            }).then(folder=> {
                TdLib.sendQuery({ // Ask TDLib what the icon should be
                    '@type': 'getChatFilterDefaultIconName',
                    'filter': folder as TdApi.chatFilter
                }).then(result=> setIconName((result as TdApi.text).text));
            });
        }
    }, [folder]);

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        onClick(e);
        chatListScrollToTopEvent[0]?.();
    }

    const ic= (filters[iconName] || filters['Custom']); // If the icon was empty, show a generic icon instead.
    const icon= ic[Number(active)] || ic[0]; // Some icons dont have active variant
    return (
        <div className={active ? 'item active' : 'item'}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-sideBarBgRipple)"/>
            <button {...rippleEvents}
                onClick={handleClick}>

                <div className="icon" dangerouslySetInnerHTML={{__html: icon}}></div>
                <div className="title">{folder.title}</div>
                {unread?.unread_chats_count? (
                    <div className="unread-badge" 
                        data-muted={(unread?.unread_unmuted_chats_count==0) ? 'true' : 'false'}>
                        <span>{unread?.unread_chats_count}</span>
                    </div>
                ): null}
            </button>
        </div>
    );
}

ChatFolder.propTypes= {
    /** The folder object provided by TdLib */
    folder: PropTypes.object.isRequired,
    /** A boolean indicating if the folder is currently selected */
    active: PropTypes.bool.isRequired,
    /** A function to call when the folder is clicked */
    onClick: PropTypes.func.isRequired,
    /** An object containing unread messages and chats count, from `chatStore` */
    unread: PropTypes.object
};

type ChatFolderListSelfProps= {
    /** Fires when main menu is triggered */
    onHamburgerMenuOpened: ()=>void
}

type ChatFolderListStoreProps= {
    folders: TdApi.chatFilterInfo[],
    currentFolder: TdApi.ChatList,
    unread: ChatStoreUnreadData
}

type ChatFolderListProps= ChatFolderListSelfProps & ChatFolderListStoreProps & {dispatch: Dispatch<ChatStoreAction>};

/**
 * Renders the chat folders list
 */
function ChatFolderList({folders, currentFolder, unread, dispatch, onHamburgerMenuOpened}: ChatFolderListProps): JSX.Element|null {
    if(!folders || folders.length==0) return null;

    return (
        <div id="chat-folders-list">
            <HamburgerMenuButton.WithFolders onClick={onHamburgerMenuOpened}/>

            <ScrollView scrollBarWidth="4" className="list scrollbar full-size">
                <ChatFolder 
                    active={compareChatList(currentFolder, {'@type': 'chatListMain'})} 
                    folder={{ 
                        '@type': 'chatFilterInfo',
                        id: -1,
                        title: (__('lng_filters_all') as string), 
                        icon_name: 'All' 
                    }}
                    unread={unread.main}
                    onClick={()=> dispatch({
                        type: 'SET_CURRENT_CHAT_LIST',
                        chatList: { '@type': 'chatListMain' }
                    })}/>
                
                {folders.map(folder=> (
                    <ChatFolder folder={folder} key={folder.id}
                        unread={unread.filters[folder.id]}
                        active={compareChatList(currentFolder, 
                            {'@type': 'chatListFilter', 'chat_filter_id': folder.id})}
                        onClick={()=> dispatch({
                            type: 'SET_CURRENT_CHAT_LIST',
                            chatList: { 
                                '@type': 'chatListFilter',
                                chat_filter_id: folder.id
                            }
                        })}/>
                ))}
            </ScrollView>
        </div>
    );
}
export default connect<ChatFolderListStoreProps, unknown, ChatFolderListSelfProps, ChatStoreState>(state=>({
    folders:state.filters, 
    currentFolder: state.currentChatList,
    unread: state.unread
}))(ChatFolderList);