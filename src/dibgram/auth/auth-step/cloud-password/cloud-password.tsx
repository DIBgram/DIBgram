import React from 'react';
import { manageStatusTextContent } from '../../auth-screen';
import Auth from '../../../TdWeb/auth';
import UnderlinedInput from '../../../ui/elements/underlined-input';
import LinkButton from '../../../ui/elements/link-button';
import BigHighlightedButton from '../../../ui/elements/highlighted-button';
import { Provider } from 'react-redux';
import connectionStore from '../../../TdWeb/connectionStore';
import ConnectionState from '../../../ui/components/connecting';
import './cloud-password.scss';
import __, { __fmt } from '../../../language-pack/language-pack';
import TdApi from '../../../TdWeb/td_api';

type AuthWindowStepPasswordProps = {
    info: TdApi.authorizationStateWaitPassword;
}

type AuthWindowStepPasswordState = {
    password: string;
    invalid: boolean;
    statusContent: React.ReactNode|React.ReactNode[]|null;
    statusVisible: boolean;
}

/**
 * Renders 2FA password step of authorization screen
 */
export default class AuthWindowStepPassword extends React.Component<AuthWindowStepPasswordProps, AuthWindowStepPasswordState> {
    constructor(args: AuthWindowStepPasswordProps) {
        super(args);
        [this.Status, this.changeStatus] = manageStatusTextContent(this);
    }
    state= {
        password: '',
        invalid: false,
        statusContent: '',
        statusVisible: false
    };
    changeStatus: (status: React.ReactNode|React.ReactNode[])=> void;
    Status: ()=> JSX.Element;
    handlePasswordFieldChange= (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            password: event.target.value,
            invalid: false, // Password was changed, and we don't know if it is wrong or not. We should not show it as wrong
        });
        this.changeStatus(''); // Same
    }
    handleContinueButton= (): void => {
        Auth.check2FACode(this.state.password).catch(reason=> {
            if(reason.message=='PASSWORD_HASH_INVALID') {
                this.setState({invalid: true});
                this.changeStatus(__('lng_signin_bad_password'));
            }
            else {
                // We don't know what the error is, so all we can do is to show it to the user
                this.setState({invalid: true});
                this.changeStatus(reason.message);
            }
        });
    }
    render (): JSX.Element {
        const Status=this.Status;
        return (
            <div id="auth" className="auth-step-password">
                <div className="content">

                    <h2>{__('lng_signin_title')}</h2>

                    <p className="description">{__('lng_signin_desc')}</p>

                    <UnderlinedInput
                        type="password"
                        value={this.state.password} 
                        onChange={this.handlePasswordFieldChange}
                        autoFocus={true} 
                        title={__('lng_signin_password')}
                        onEnterKeyPressed={this.handleContinueButton}
                        disableCopy={true}
                        invalid={this.state.invalid}/>

                    <div className="hint">
                        {this.props.info.password_hint?__fmt('lng_signin_hint', {password_hint: this.props.info.password_hint}):<span>&nbsp;</span>}
                    </div>

                    <div className="forgot-password">
                        <LinkButton>{__('lng_signin_recover')}</LinkButton>
                    </div>

                    <Status/>

                    <BigHighlightedButton 
                        onClick={this.handleContinueButton}>
                        {__('lng_intro_submit')}
                    </BigHighlightedButton>

                </div>
                <Provider store={connectionStore}>
                    <ConnectionState/>
                </Provider>
            </div>
        );
    }
}