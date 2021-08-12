import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filters from '../../../ui/icon/chat_filters/chat-filters';
import RippleEffect, {handleMyMouseEvents} from '../../../ui/elements/ripple-effect';
import HamburgerMenuButton_WithFolders from './hamburger-menu/menu-button';
import { compareChatList } from '../../chat-store';
import TdLib from '../../../TdWeb/tdlib';

/**
 * Renders a chat folder button
 */
export class ChatFolder extends React.Component {
    static propTypes= {
        /** The folder object provided by TdLib */
        folder: PropTypes.object.isRequired,
        /** A boolean indicating if the folder is currently selected */
        active: PropTypes.bool.isRequired,
        /** A function to call when the folder is clicked */
        onClick: PropTypes.func.isRequired
    }
    state= {
        ripple: {
            state: 'off'
        }
    }
    constructor() {
        super();
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
    }

    componentDidMount(){
        TdLib.sendQuery({
            '@type': 'getChats',
            'chat_list': {
                '@type': 'chatListFilter',
                'chat_filter_id': this.props.folder.id,
            },
            'offset_order': '9223372036854775807',
            'offset_chat_id': 0,
            'limit': 50
        });
    }

    render(){
        return (
            <li className={this.props.active ? 'active' : ''}>
                <RippleEffect {...this.state.ripple} color="var(--theme-color-sideBarBgRipple)"/>
                <button
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                    onMouseLeave={this.mouseLeave}
                    onClick={this.props.onClick}>

                    <div className="icon" dangerouslySetInnerHTML={{__html:filters.all[this.props.active+0]}}></div>
                    <div className="title">{this.props.folder.title}</div>
                </button>
            </li>
        );
    }
}

/**
 * Renders the chat folders list
 */
function ChatFolderList({folders, currentFolder, dispatch}) {
    if(!folders || folders.length==0) return null;
    return (
        <div id="chat-folders-list">
            <HamburgerMenuButton_WithFolders/>
            <ul>
                <ChatFolder 
                    active={compareChatList(currentFolder, {'@type': 'chatListMain'})} 
                    folder={{ title: 'All chats', icon: 'all' }}
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
            </ul>
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