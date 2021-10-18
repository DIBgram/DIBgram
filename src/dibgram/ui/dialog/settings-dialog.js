import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './dialog';
import ToolStrip from '../tool-strip/tool-strip';
import ScrollView from '../scroll/scrollbar';
import TdLib from '../../TdWeb/tdlib';
import { addDialog, removeDialog } from './dialogs';
import ConfirmDialog from './confirm-dialog';
import ThreeDotsMenu from '../menu/three-dots-menu';
import Menu from '../menu/menu';
import './settings-dialog.scss';
import { info_close, settings_advenced, settings_chat, settings_faq, settings_folders, settings_info, settings_language, settings_notifications, settings_privacy_security } from '../icon/icons';
import ProfilePhoto from '../components/profile-photo';
import IconButton from '../elements/icon-button';
import options from '../../TdWeb/options';
import { connect } from 'react-redux';
import { getUserFullName } from '../../messenger/user-misc';

/**
 * Renders a modal dialog
 * Use React ref to access the `close()` method.
 */
class Settings extends React.Component{
    static propTypes= {
        /** Dialog width in CSS format */
        width: PropTypes.string,
        /** Unique ID of this dialog, used to close it. */
        id: PropTypes.any.isRequired,
        className: PropTypes.string,
        users: PropTypes.any.isRequired
    };

    state = {
        closing: false
    }
    ref = React.createRef();

    /** @param {React.SyntheticEvent} e */
    onClick(e){
        if (e.target === this.ref.current) {
            this.close();
        }
    }

    render(){
        return (
            <Dialog className="settings-dialog" id={this.props.id} ref={this.dialogRef} width={this.props.width || '392px'}>
                <div className="dialog-content">
                    <div className="header">
                        <h3 className="title">Settings</h3>
                        <IconButton className="icon-button close" icon={info_close} onClick={() => {
                            this.close();
                        }} />
                        
                        {/*[Add Account, Edit profile, Log out]*/}
                        <ThreeDotsMenu className="more-options">
                            <Menu.MenuContents>
                                <Menu.MenuItem>Add Account</Menu.MenuItem>
                                <Menu.MenuItem>Edit profile</Menu.MenuItem>
                                <Menu.MenuItem onClick={() => {
                                    addDialog('log-out-from-main-menu-confirm-dialog',
                                        <ConfirmDialog largeFont={true}
                                            id="log-out-from-main-menu-confirm-dialog"
                                            OKButtonText="LOG OUT" onOK={()=> {
                                                TdLib.sendQuery({
                                                    '@type': 'logOut'
                                                });
                                            }} attention={true}>
                                        Are you sure you want to log out?
                                        </ConfirmDialog>
                                    );
                                }}>Log Out</Menu.MenuItem>
                            </Menu.MenuContents>
                        </ThreeDotsMenu>
                    </div>
                    <ScrollView scrollBarWidth="4">
                        <div className="scroll-content">
                            <div className="profile-info">
                                <ProfilePhoto id={options['my_id']} name={getUserFullName(this.props.users[options['my_id']])} photo={this.props.users[options['my_id']]?.profile_photo?.small} disableSavedMessages={true}/>
                                <span>
                                    <p className="name">{getUserFullName(this.props.users[options['my_id']])}</p>
                                    <p className="status">online</p>
                                </span>
                            </div>

                            <ToolStrip.Section>
                                <ToolStrip.Separator />
                                <ToolStrip.Button icon={settings_info} text="Edit profile"/>
                                <ToolStrip.Button icon={settings_notifications} text="Notifications"/>
                                <ToolStrip.Button icon={settings_privacy_security} text="Privacy and Security"/>
                                <ToolStrip.Button icon={settings_chat} text="Chat Settings"/>
                                <ToolStrip.Button icon={settings_folders} text="Folders"/>
                                <ToolStrip.Button icon={settings_advenced} text="Advenced"/>
                                <ToolStrip.Button icon={settings_language} text="Language">
                                    <span className="value">English</span>
                                </ToolStrip.Button>
                                <ToolStrip.Separator />
                                <ToolStrip.Button icon={settings_faq} text="Telegram FAQ" onClick={() => window.open('https://telegram.org/faq')}/>
                                <ToolStrip.Button text="Ask a Question"/>
                            </ToolStrip.Section>
                        </div>
                    </ScrollView>
                </div>
            </Dialog>
        );
    }

    close(){
        this.setState({
            closing: true
        });
        setTimeout(() => {
            removeDialog(this.props.id);
        }, 1000);
    }

    /*
    
    */
}

const SettingsDialog = connect( (users)=> ({users}) ) (Settings);
export default SettingsDialog;