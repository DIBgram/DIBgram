import React from 'react';
import PropTypes from 'prop-types';
import './menu.scss';
import TdLib from '../../../../TdWeb/tdlib';
import ProfilePhoto from '../../../../ui/components/profile-photo';
import { getChatsFromList } from '../chat-list';
import chatStore from '../../../chat-store';
import { archive_userpic, menu_settings } from '../../../../ui/icon/icons';
import { connect } from 'react-redux';
import { createContextMenu } from '../../../../ui/menu/context-menu';
import Menu from '../../../../ui/menu/menu';
import ScrollView from '../../../../ui/scroll/scrollbar';
import LinkButton from '../../../../ui/elements/link-button';
import version from '../../../../../version';
import { addDialog } from '../../../../ui/dialog/dialogs';
import ConfirmDialog from '../../../../ui/dialog/confirm-dialog';
import ToolStrip from '../../../../ui/tool-strip/tool-strip';

const HamburgerMenu= connect(state=> ({
    chats: state.chats,
    archiveButtonState: state.archiveButtonState,
})) (
    function HamburgerMenu ({visible, onClose, chats, archiveButtonState}) {
        const [me, setMe] = React.useState(null);
        React.useEffect(() => {
            TdLib.sendQuery({
                '@type': 'getMe'
            }).then(result => {
                if(result.phone_number) {
                    TdLib.sendQuery({
                        '@type': 'getPhoneNumberInfo',
                        phone_number_prefix: result.phone_number
                    }).then(info => {
                        if(info.country_calling_code){
                            result.phone_number= `+${info.country_calling_code} ${info.formatted_phone_number}`;
                        }
                        setMe(result);
                    });
                } 
                else setMe(result);
            });
        }, []);

        /**@type React.KeyboardEventHandler<HTMLDivElement> */
        function onKeyDown (e){
            if(e.key === 'Escape') {
                onClose();
            }
        }
        var ref = React.useRef(null);
        React.useEffect(() => {
            if(visible) {
                ref.current.focus();
            }
        }, [visible]);

        const showArchivedChats = getChatsFromList(chats, {'@type': 'chatListArchive'}).length > 0;

        return (
            <div id="hamburger-menu" ref={ref} className={visible ? 'visible' : ''} 
                onKeyDown={onKeyDown} tabIndex={0}>
                <div className="content">
                    <div className="header">
                        <div className="row-1">
                            <ProfilePhoto 
                                id={me?.id || 0} 
                                name={(me?.first_name || '') + (me?.last_name? (' ' + me.last_name) : '')} 
                                photo={me?.profile_photo?.small}
                                disableSavedMessages={true}/>
                            <div className="buttons">
                                {(showArchivedChats && (['hidden-collapsed', 'hidden-expanded'].includes(archiveButtonState))) && (
                                    <button 
                                        className="button" 
                                        dangerouslySetInnerHTML={{__html: archive_userpic}}
                                        onClick={() => {
                                            chatStore.dispatch({
                                                type: 'SET_ARCHIVE_STATE',
                                                archiveState: 'open'
                                            });
                                            onClose();
                                        }}
                                        onContextMenu={e=> createContextMenu(e, (
                                            <Menu.MenuContents>
                                                <Menu.MenuItem onClick={()=> {
                                                    const newState= {'hidden-collapsed': 'collapsed', 'hidden-expanded': 'expanded'}[archiveButtonState];
                                                    chatStore.dispatch({
                                                        type: 'SET_ARCHIVE_BUTTON_STATE',
                                                        archiveButtonState: newState
                                                    });
                                                    localStorage.setItem('dibgram-archived-chats-button-mode', newState);
                                                    onClose();
                                                }}>Move to chats list</Menu.MenuItem>
                                            </Menu.MenuContents>
                                        ))}/>
                                )}
                            </div>
                        </div>
                        <div className="row-2">
                            <div className="name">
                                {me?.first_name} {me?.last_name || ''}
                            </div>
                            <div className="phone-number">
                                {me?.phone_number}
                            </div>
                        </div>
                    </div>
                    <ScrollView>
                        <div className="scroll-content">
                            <div className="options">
                                <ToolStrip.Section>
                                    <ToolStrip.Button icon={menu_settings} text={'Log out'} onClick={()=> {
                                        onClose();
                                        addDialog('log-out-from-main-menu-confirm-dialog',
                                            <ConfirmDialog 
                                                id="log-out-from-main-menu-confirm-dialog"
                                                OKButtonText="Log out" onOK={()=> {
                                                    TdLib.sendQuery({
                                                        '@type': 'logOut'
                                                    });
                                                }} attention={true}>
                                                Are you sure you want to log out?
                                            </ConfirmDialog>
                                        );
                                    }}/>
                                </ToolStrip.Section>
                            </div>
                            <div className="about">
                                <div className="row-1">
                                    <LinkButton href="https://github.com/DIBgram/DIBgram">DIBgram</LinkButton>
                                </div>
                                <div className="row-2">
                                    <LinkButton href="https://github.com/DIBgram/DIBgram/releases/">Version {version}</LinkButton> ­– <LinkButton onClick={()=> {
                                        onClose();
                                        addDialog('main-menu-about-dibgram-dialog', (
                                            <ConfirmDialog id="main-menu-about-dibgram-dialog"
                                                width="390px" title="DIBgram" OKButtonText="CLOSE"
                                                hideCancelButton={true}>

                                                <LinkButton className="version link-button"
                                                    style={{color: 'var(--theme-color-windowSubTextFg)'}} 
                                                    href="https://github.com/DIBgram/DIBgram/releases/">
                                                        version {version}
                                                </LinkButton>

                                                <p>Unofficial Telegram app based on <LinkButton href="https://core.telegram.org/tdlib">TDLib</LinkButton> for speed and security.</p>

                                                <p>This software is licensed under <LinkButton href="https://github.com/DIBgram/DIBgram/blob/main/LICENSE">GNU GPL</LinkButton> version 3.<br/>
                                                Source code is available on <LinkButton href="https://github.com/DIBgram/DIBgram">GitHub</LinkButton>.</p>

                                                <p>Visit the <LinkButton href="https://telegram.org/faq">Telegram FAQ</LinkButton> for more info.</p>
                                            </ConfirmDialog>
                                        ));
                                    }}>
                                        About
                                    </LinkButton>
                                </div>
                            </div>
                        </div>
                    </ScrollView>
                </div>
                <div className="shadow" onClick={onClose}></div>
            </div>
        );
    });
HamburgerMenu.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func
};
export default HamburgerMenu;
