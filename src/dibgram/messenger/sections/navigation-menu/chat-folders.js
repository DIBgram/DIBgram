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

/**
 * Renders a chat folder button
 */
export function ChatFolder({folder, active, onClick}) {
    const ripple= React.useState({state: 'off'});
    const [mouseDown, mouseUp, mouseLeave]= handleMyMouseEventsFunction(ripple);
    const [iconName, setIconName]= React.useState(folder.icon_name);

    React.useEffect(()=> {
        TdLib.sendQuery({
            '@type': 'getChats',
            'chat_list': {
                '@type': 'chatListFilter',
                'chat_filter_id': folder.id,
            },
            'offset_order': '9223372036854775807',
            'offset_chat_id': 0,
            'limit': 50
        });
    }, []);

    React.useEffect(()=> {
        if(!folder.icon_name) {
            TdLib.sendQuery({
                '@type': 'getChatFilter',
                'chat_filter_id': folder.id
            }).then(folder=> {
                TdLib.sendQuery({
                    '@type': 'getChatFilterDefaultIconName',
                    'filter': folder
                }).then(result=> setIconName(result.text));
            });
        }
    }, [folder]);

    var icon= (filters[iconName] || filters['Custom']);
    icon= icon[active+0] || icon[0];
    return (
        <div className={active ? 'item active' : 'item'}>
            <RippleEffect {...ripple[0]} color="var(--theme-color-sideBarBgRipple)"/>
            <button
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseLeave={mouseLeave}
                onClick={onClick}>

                <div className="icon" dangerouslySetInnerHTML={{__html: icon}}></div>
                <div className="title">{folder.title}</div>
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
    onClick: PropTypes.func.isRequired
};

/**
 * Renders the chat folders list
 */
function ChatFolderList({folders, currentFolder, dispatch}) {
    if(!folders || folders.length==0) return null;
    return (
        <div id="chat-folders-list">
            <HamburgerMenuButton.WithFolders/>
            <ScrollView scrollBarWidth="4" className="list scrollbar full-size">
                <ChatFolder 
                    active={compareChatList(currentFolder, {'@type': 'chatListMain'})} 
                    folder={{ title: 'All chats', icon_name: 'All' }}
                    onClick={()=> dispatch({
                        type: 'SET_CURRENT_CHAT_LIST',
                        chatList: { '@type': 'chatListMain' }
                    })}/>
                
                {folders.map(folder=> (
                    <ChatFolder folder={folder} key={folder.id}
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
    folders: PropTypes.arrayOf(PropTypes.object),
    currentFolder: PropTypes.object,
    dispatch: PropTypes.func
};
export default connect(state=>({
    folders:state.filters, 
    currentFolder: state.currentChatList
}))(ChatFolderList);