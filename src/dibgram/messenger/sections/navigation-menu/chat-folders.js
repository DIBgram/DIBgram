import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filters from '../../../ui/icon/chat_filters/chat-filters';
import RippleEffect, {handleMyMouseEventsFunction} from '../../../ui/elements/ripple-effect';
import HamburgerMenuButton from './hamburger-menu/menu-button';
import { compareChatList } from '../../chat-store';
import TdLib from '../../../TdWeb/tdlib';
import ScrollView from '../../../ui/scroll/scrollbar';
import './chat-folders.scss';
import __ from '../../../language-pack/language-pack';

export var chatListScrollToTopEvent = [function(){}];

/**
 * Renders a chat folder button
 */
export function ChatFolder({folder, active, onClick, unread}) {
    // Ripple effect
    const ripple= React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave]= handleMyMouseEventsFunction(ripple);

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
                    'filter': folder
                }).then(result=> setIconName(result.text));
            });
        }
    }, [folder]);

    function handleClick(e){
        onClick(e);
        chatListScrollToTopEvent[0]?.();
    }

    var icon= (filters[iconName] || filters['Custom']); // If the icon was empty, show a generic icon instead.
    icon= icon[active+0] || icon[0]; // Some icons dont have active variant
    return (
        <div className={active ? 'item active' : 'item'}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-sideBarBgRipple)"/>
            <button
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseLeave={mouseLeave}
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

/**
 * Renders the chat folders list
 */
function ChatFolderList({folders, currentFolder, unread, dispatch, onHamburgerMenuOpened}) {
    if(!folders || folders.length==0) return null;

    return (
        <div id="chat-folders-list">
            <HamburgerMenuButton.WithFolders onClick={onHamburgerMenuOpened}/>

            <ScrollView scrollBarWidth="4" className="list scrollbar full-size">
                <ChatFolder 
                    active={compareChatList(currentFolder, {'@type': 'chatListMain'})} 
                    folder={{ title: __('lng_filters_all'), icon_name: 'All' }}
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
ChatFolderList.propTypes={
    /** An array of chat filters */
    folders: PropTypes.arrayOf(PropTypes.object),
    /** Current chat list */
    currentFolder: PropTypes.object,
    /** A list of unread messages info for each chat list */
    unread: PropTypes.object,
    
    dispatch: PropTypes.func,
    /** Fires when main menu is triggered */
    onHamburgerMenuOpened: PropTypes.func
};
export default connect(state=>({
    folders:state.filters, 
    currentFolder: state.currentChatList,
    unread: state.unread
}))(ChatFolderList);