import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filters from '../../../ui/icon/chat_filters/chat-filters';
import RippleEffect, {handleMyMouseEvents} from '../../../ui/elements/ripple-effect';
import HamburgerMenuButton_WithFolders from './hamburger-menu/menu-button';

/**
 * Renders a chat folder button
 */
class ChatFolder extends React.Component {
    state= {
        ripple: {
            state: 'off'
        }
    }
    constructor() {
        super();
        [this.mouseDown, this.mouseUp, this.mouseLeave]= handleMyMouseEvents(this);
    }
    render(){
        return (
            <li className={this.props.active ? 'active' : ''}>
                <RippleEffect {...this.state.ripple} color="var(--theme-color-sideBarBgRipple)"/>
                <button
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                    onMouseLeave={this.mouseLeave}>
                    <div className="icon" dangerouslySetInnerHTML={{__html:filters.all[this.props.active+0]}}></div>
                    <div className="title">{this.props.folder.title}</div>
                </button>
            </li>
        );
    }
}
ChatFolder.propTypes= {
    /** The folder object provided by TdLib */
    folder: PropTypes.object,
    /** A boolean indicating if the folder is currently selected */
    active: PropTypes.bool
};
export {ChatFolder};

/**
 * Renders the chat folders list
 */
function ChatFolderList(props) {
    if(!props.folders || props.folders.length==0) return null;
    return (
        <div id="chat-folders-list">
            <HamburgerMenuButton_WithFolders/>
            <ul>
                <ChatFolder active={true} folder={{
                    title: 'All chats',
                    icon: 'all'
                }}/>
                {props.folders.map(folder=><ChatFolder folder={folder} active={false} key={folder.id}/>)}
            </ul>
        </div>
    );
}
ChatFolderList.propTypes={
    folders: PropTypes.arrayOf(PropTypes.object)
};
export default connect(state=>({folders:state}))(ChatFolderList);