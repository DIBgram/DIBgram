import React from 'react';
import Dialog from '../../../ui/dialog/dialog';
import ToolStrip from '../../../ui/tool-strip/tool-strip';
import ScrollView from '../../../ui/scroll/scrollbar';
import TdLib from '../../../TdWeb/tdlib';
import { addDialog } from '../../../ui/dialog/dialogs';
import ConfirmDialog from '../../../ui/dialog/confirm-dialog';
import ThreeDotsMenu from '../../../ui/menu/three-dots-menu';
import Menu from '../../../ui/menu/menu';
import './settings-dialog.scss';
import { info_close, settings_advanced, settings_chat, settings_faq, settings_folders, settings_info, settings_language, settings_notifications, settings_privacy_security } from '../../../ui/icon/icons';
import ProfilePhoto from '../../../ui/components/profile-photo';
import IconButton from '../../../ui/elements/icon-button';
import options from '../../../TdWeb/options';
import { connect } from 'react-redux';
import { getUserFullName } from '../../user-misc';
import __ from '../../../language-pack/language-pack';
import ChooseLanguageDialog from './choose-language';
import NavAnimation, { closeNavAnimation } from '../../../ui/elements/nav-animation';
import SettingsAdvanced from './advanced/advanced';
import { lastSeenToString } from '../../../time-tostring';
import { UsersStoreState } from '../../users-store';

type SettingsSection= React.ComponentType<{
    onClose: ()=> void,
    onBack: ()=> void
}>;

type SettingsSelfProps = {
    /** Unique ID of this dialog, used to close it. */
    id: string,
}
type SettingsStoreProps = {
    users: UsersStoreState,
}
type SettingsProps = SettingsSelfProps & SettingsStoreProps;

function Settings ({id, users}: SettingsProps): JSX.Element {
    const dialogRef = React.useRef<Dialog>() as React.RefObject<Dialog>;
    const user= users[options['my_id'] as number];
    const [navState, setNavState] = React.useState<'open'|'closing'|'closed'>('closed');
    const [section, setSection] = React.useState<React.ReactElement|null>(null);

    function openSection(Section: SettingsSection): void {
        setSection(<Section onClose={(dialogRef.current as Dialog).close} onBack={()=> {
            closeNavAnimation(()=>navState, setNavState);
        }}/>);
        setNavState('open');
    }

    return (
        <Dialog className="settings-dialog" id={id} ref={dialogRef} width="392px">
            <NavAnimation className="dialog-content" innerScreen={section} mode="swipe-fade" state={navState}>
                <div className="header">
                    <h3 className="title">{__('lng_menu_settings')}</h3>
                    <IconButton className="icon-button close" icon={info_close} onClick={() => {
                        dialogRef.current?.close();
                    }} />
                    
                    <ThreeDotsMenu className="more-options">
                        <Menu.MenuContents>
                            <Menu.MenuItem>{__('lng_menu_add_account')}</Menu.MenuItem>
                            <Menu.MenuItem>{__('lng_settings_information')}</Menu.MenuItem>
                            <Menu.MenuItem onClick={() => {
                                addDialog('log-out-from-main-menu-confirm-dialog',
                                    <ConfirmDialog largeFont={true}
                                        id="log-out-from-main-menu-confirm-dialog"
                                        OKButtonText={__('lng_settings_logout')} onOK={()=> {
                                            TdLib.sendQuery({
                                                '@type': 'logOut'
                                            });
                                        }} attention={true}>
                                        {__('lng_sure_logout')}
                                    </ConfirmDialog>
                                );
                            }}>{__('lng_settings_logout')}</Menu.MenuItem>
                        </Menu.MenuContents>
                    </ThreeDotsMenu>
                </div>
                <ScrollView scrollBarWidth="4">
                    <div className="scroll-content">
                        <ToolStrip.Section className="profile-info">
                            <ProfilePhoto id={user?.id} name={user ? getUserFullName(user) : ''} photo={user?.profile_photo?.small} disableSavedMessages={true}/>
                            <span>
                                <p className="name">{user && getUserFullName(user)}</p>
                                <p className={`status ${user.status['@type'] == 'userStatusOnline' ? 'active' : ''}`}>
                                    {lastSeenToString(user.status)}
                                </p>
                            </span>
                        </ToolStrip.Section>
                        <ToolStrip.Separator/>
                        <ToolStrip.Section>
                            <ToolStrip.Button icon={settings_info} text={__('lng_settings_information')}/>
                            <ToolStrip.Button icon={settings_notifications} text={__('lng_settings_section_notify')}/>
                            <ToolStrip.Button icon={settings_privacy_security} text={__('lng_settings_section_privacy')}/>
                            <ToolStrip.Button icon={settings_chat} text={__('lng_settings_section_chat_settings')}/>
                            <ToolStrip.Button icon={settings_folders} text={__('lng_settings_section_filters')}/>
                            <ToolStrip.Button icon={settings_advanced} text={__('lng_settings_advanced')} onClick={()=> openSection(SettingsAdvanced)}/>
                            <ToolStrip.Button icon={settings_language} text={__('lng_settings_language')}
                                onClick={()=>addDialog('settings-change-language-dialog', <ChooseLanguageDialog id="settings-change-language-dialog"/>)}>
                                <span className="value">{__('lng_language_name')}</span>
                            </ToolStrip.Button>
                        </ToolStrip.Section>
                        <ToolStrip.Separator/>
                        <ToolStrip.Section>
                            <ToolStrip.Button icon={settings_faq} text={__('lng_settings_faq')} onClick={() => window.open('https://telegram.org/faq')}/>
                            <ToolStrip.Button text={__('lng_settings_ask_question')}/>
                        </ToolStrip.Section>
                    </div>
                </ScrollView>
            </NavAnimation>
        </Dialog>
    );
}

const SettingsDialog =( connect<SettingsStoreProps, unknown, SettingsSelfProps, UsersStoreState>( (users)=> ({users}) ) (Settings)) as unknown as React.FunctionComponent<SettingsSelfProps>;
export default SettingsDialog;