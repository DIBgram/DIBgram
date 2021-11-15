import React from 'react';
import PropTypes from 'prop-types';
import './menu.scss';
import TdLib from '../../../../TdWeb/tdlib';
import ProfilePhoto from '../../../../ui/components/profile-photo';
import { getChatsFromList } from '../chat-list';
import chatStore from '../../../chat-store';
import { archive_userpic, menu_new_channel, menu_new_group, menu_night_mode, menu_settings, settings_name, settings_phone_number } from '../../../../ui/icon/icons';
import { connect, Provider } from 'react-redux';
import { createContextMenu } from '../../../../ui/menu/context-menu';
import Menu from '../../../../ui/menu/menu';
import ScrollView from '../../../../ui/scroll/scrollbar';
import LinkButton from '../../../../ui/elements/link-button';
import version from '../../../../../version';
import Dialogs, { addDialog, dialogStore } from '../../../../ui/dialog/dialogs';
import ConfirmDialog from '../../../../ui/dialog/confirm-dialog';
import ToolStrip from '../../../../ui/tool-strip/tool-strip';
import { setTheme, themeStore } from '../../../../ui/themes/theme';
import SettingsDialog from '../../settings/settings-dialog';
import usersStore from '../../../users-store';
import options from '../../../../TdWeb/options';
import { getUserFullName } from '../../../user-misc';
import __, { _s__fmt, __fmt } from '../../../../language-pack/language-pack';

/**
 * Renders the main menu (always rendered but not always visible)
 */
const HamburgerMenu= connect(state=> ({
    chats: state.chats,
    archiveButtonState: state.archiveButtonState,
})) (
    function HamburgerMenu ({visible, onClose, chats, archiveButtonState}) {
        const [me, setMe] = React.useState(null);
        React.useEffect(() => {
            TdLib.sendQuery({ // Get current user info
                '@type': 'getMe'
            }).then(result => {
                // Format phone number and put it in state
                if(result.phone_number) {
                    TdLib.sendQuery({
                        '@type': 'getPhoneNumberInfo',
                        phone_number_prefix: result.phone_number
                    }).then(info => {
                        // Format phone number
                        if(info.country_calling_code){
                            result.phone_number= `+${info.country_calling_code} ${info.formatted_phone_number}`;
                        }
                        setMe(result);
                    });
                } 
                else setMe(result);
            });
        }, []); // equivalent to componentDidMount

        const [nightMode, setNightMode] = React.useState(['tinted', 'night'].includes(themeStore.getState().theme));

        /**@type React.KeyboardEventHandler<HTMLDivElement> */
        function onKeyDown (e){
            // `Esc` closes the menu
            if(e.key === 'Escape') {
                onClose();
            }
        }
        // Autofocus menu
        var ref = React.useRef(null);
        React.useEffect(() => {
            if(visible) {
                ref.current.focus();
            }
        }, [visible]);

        // Get chats from archive to see if archive button should be shown
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
                                                }}>{__('lng_context_archive_to_list')}</Menu.MenuItem>
                                            </Menu.MenuContents>
                                        ))}/>
                                )}
                            </div>
                        </div>
                        <div className="row-2">
                            <div className="name">
                                {me && getUserFullName(me)}
                            </div>
                            <div className="phone-number">
                                {me?.phone_number}
                            </div>
                        </div>
                    </div>
                    <ScrollView scrollAlwaysVisible>
                        <div className="scroll-content">
                            <div className="options">
                                <ToolStrip.Section>
                                    <ToolStrip.Button icon={menu_new_group} text={__('lng_create_group_title')}/>
                                    <ToolStrip.Button icon={menu_new_channel} text={__('lng_create_channel_title')}/>
                                    <ToolStrip.Button icon={settings_name} text={__('lng_menu_contacts')}/>
                                    <ToolStrip.Button icon={settings_phone_number} text={__('lng_menu_calls')}/>
                                    <ToolStrip.Button icon={menu_settings} text={__('lng_menu_settings')} onClick={()=> {
                                        onClose();
                                        addDialog('full-settings-dialog',
                                            <Provider store={usersStore}>
                                                <SettingsDialog id="full-settings-dialog" />
                                            </Provider>
                                        );
                                    }}/>
                                    <ToolStrip.ToggleButton icon={menu_night_mode} text={__('lng_menu_night_mode')} isActive={nightMode} onChange={(isNight)=> {
                                        setNightMode(isNight);
                                        setTheme(isNight ? 'night' : 'day');
                                    }}/>
                                </ToolStrip.Section>
                            </div>
                            <div className="about">
                                <div className="row-1">
                                    <LinkButton href="https://github.com/DIBgram/DIBgram">DIBgram</LinkButton>
                                </div>
                                <div className="row-2">
                                    <LinkButton href="https://github.com/DIBgram/DIBgram/releases/">{__fmt('lng_settings_current_version', {version})}</LinkButton> ­– <LinkButton onClick={()=> {
                                        // About DIBgram
                                        onClose();
                                        addDialog('main-menu-about-dibgram-dialog', (
                                            <ConfirmDialog id="main-menu-about-dibgram-dialog"
                                                width="390px" title="DIBgram" OKButtonText={__('lng_close')}
                                                hideCancelButton={true}>

                                                <LinkButton className="version link-button"
                                                    style={{color: 'var(--theme-color-windowSubTextFg)'}} 
                                                    href="https://github.com/DIBgram/DIBgram/releases/">
                                                        
                                                    {_s__fmt('lngd_about_version', {
                                                        version,
                                                        tdlib: options['version']
                                                    })}
                                                </LinkButton>

                                                <p>{_s__fmt('lngd_about_text1', {
                                                    tdlib: <LinkButton href="https://core.telegram.org/tdlib">TDLib</LinkButton>
                                                })}</p>

                                                <p>{__fmt('lng_about_text2', { //TODO: find out why it doesn't work
                                                    gpl_link: <LinkButton href="https://github.com/DIBgram/DIBgram/blob/main/LICENSE">GNU GPL</LinkButton>,
                                                    github_link: <LinkButton href="https://github.com/DIBgram/DIBgram">GitHub</LinkButton>
                                                })}</p>

                                                <p>{__fmt('lng_about_text3', {
                                                    faq_link: <LinkButton href="https://telegram.org/faq">{__('lng_about_text3_faq')}</LinkButton>
                                                })}</p>
                                            </ConfirmDialog>
                                        ));
                                    }}>
                                        {__('lng_menu_about')}
                                    </LinkButton>
                                </div>
                            </div>
                        </div>
                    </ScrollView>
                </div>
                <Provider store={dialogStore}>
                    <Dialogs className="shadow" onClick={onClose}/>
                </Provider>
            </div>
        );
    });
HamburgerMenu.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func
};
export default HamburgerMenu;
