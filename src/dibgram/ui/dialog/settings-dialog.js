import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './dialog';
import ToolStrip from '../tool-strip/tool-strip';
import ScrollView from '../scroll/scrollbar';
import TdLib from '../../TdWeb/tdlib';
import { addDialog, removeDialog } from './dialogs';
import ConfirmDialog from './confirm-dialog';
import './settings-dialog.scss';
import { info_close, menu_help, menu_settings, three_dots } from '../icon/icons';
import ProfilePhoto from '../components/profile-photo';
import IconButton from '../elements/icon-button';

/**
 * Renders a modal dialog
 * Use React ref to access the `close()` method.
 */
export default class SettingsDialog extends React.Component{
    static propTypes= {
        /** Dialog width in CSS format */
        width: PropTypes.string,
        /** Unique ID of this dialog, used to close it. */
        id: PropTypes.any.isRequired,
        className: PropTypes.string,
        onClose: PropTypes.func.isRequired
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
            <Dialog className="settings-dialog" id={this.props.id} ref={this.dialogRef} width={this.props.width || '400px'}>
                <div className="dialog-content">
                    <div className="header">
                        <h3>Settings</h3>
                        <IconButton id="close-settings" icon={info_close} />
                        <IconButton id="more-options" icon={three_dots} />
                    </div>
                    <ScrollView>
                        <div className="scroll-content">
                            <div className="profile-info">
                                Name: Unknown
                            </div>
                            <ToolStrip.Section>
                                <ToolStrip.Button icon={menu_settings} text="Edit profile"/>
                                <ToolStrip.Button icon={menu_settings} text="Privacy and Security"/>
                                <ToolStrip.Button icon={menu_settings} text="Chat Settings"/>
                                <ToolStrip.Button icon={menu_settings} text="Folders"/>
                                <ToolStrip.Button icon={menu_settings} text="Advenced"/>
                                <ToolStrip.Button icon={menu_settings} text="Language"/>
                            </ToolStrip.Section>
                            <ToolStrip.Section>
                                <ToolStrip.Button icon={menu_settings} text="Telegram FAQ"/>
                                <ToolStrip.Button icon={menu_settings} text="Ask a Question"/>
                                <ToolStrip.Button text="Log Out" onClick={() => {
                                    // Log out
                                    this.props.onClose();
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
                                }} />
                                
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
}
