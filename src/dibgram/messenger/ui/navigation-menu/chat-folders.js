import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filters from '../../../ui/icon/chat_filters/chat-filters';

/**
 * Renders a chat folder button
 */
function ChatFolder(props) {
    return (
        <li className={props.active ? 'active' : ''}>
            <div className="icon" dangerouslySetInnerHTML={{__html:filters.all[props.active+0]}}></div>
            <div className="title">{props.folder.title}</div>
        </li>
    );
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
    return (
        <ul>
            <ChatFolder active={true} folder={{
                title: 'All chats',
                icon: 'all'
            }}/>
            {props.folders.map(folder=><ChatFolder folder={folder} active={false} key={folder.id}/>)}
        </ul>
    );
}
ChatFolderList.propTypes={
    folders: PropTypes.arrayOf(PropTypes.object)
};
export default connect(state=>({folders:state}))(ChatFolderList);