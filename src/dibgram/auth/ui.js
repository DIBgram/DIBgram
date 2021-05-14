import React from 'react';
import PropTypes from 'prop-types';
import TdLib from '../TdWeb/tdlib';
import Auth from './auth';
import {MessengerWindow} from '../messenger/messengerWindow';

import BigHighlightedButton from '../ui/elements/highlighted-button';
import UnderlinedInput from '../ui/elements/underlined-input';

var initialAuthState = {'@type': undefined};
export function setInitialAuthState(state) {
    initialAuthState=state;
}

export class MainApp extends React.Component {
    constructor(args) {
        super(args);

        this.state= {
            step: initialAuthState
        };
        // eslint-disable-next-line no-func-assign
        setInitialAuthState= state=> {
            this.setState({step: state});
        };

        TdLib.registerUpdateHandler('updateAuthorizationState', update => {
            const states= [
                'authorizationStateWaitPhoneNumber',
                'authorizationStateWaitCode',
                'authorizationStateWaitPassword',
                'authorizationStateWaitRegistration',
                'authorizationStateReady',
                'authorizationStateClosed',
            ];
            const state=update['authorization_state'];
            if(states.includes(state['@type'])) {
                this.setState({step: state});
            }
        });
    }
    
    render () {
        switch (this.state.step['@type']) {
        case 'authorizationStateWaitPhoneNumber':
            return (
                <AuthWindowStepPhoneNumber/>
            );

        case 'authorizationStateWaitCode':
            return (
                <AuthWindowStepCode info={this.state.step.code_info}/>
            );

        case 'authorizationStateWaitPassword':
            return (
                <AuthWindowStepPassword info={this.state.step}/>
            );

        case 'authorizationStateWaitRegistration':
            return (
                <AuthWindowStepRegister/>
            );

        case 'authorizationStateReady':
            return (
                <MessengerWindow/>
            );

        case 'authorizationStateClosed':
            window.location.reload();
            return (
                <p>This session is closed. Please wait till DIBgram reloads automatically...</p>
            );
        
        default:
            return <p>Loading...</p>;
        }
    }
}

class AuthWindowStepPhoneNumber extends React.Component {
    constructor (args) {
        super(args);

        this.state= {
            number: ''
        };
    }
    handlePNFieldChange = (event) => {
        this.setState({number: event.target.value});
    }
    submitNumber= async () => {
        Auth.givePhoneNumber(this.state.number).catch(reason=> {
            this.setState({textUnderField: reason.message});
        });
    }
    render () {
        return (
            <div id="auth" className="auth-step-phoneNumber">

                <h2>Your Phone Number</h2>

                <p className="description">
                    Please confirm your country code and enter your mobile phone number.
                </p>

                <UnderlinedInput 
                    type="text" 
                    value={this.state.number} 
                    autoFocus={true}
                    onChange={this.handlePNFieldChange}
                    onEnterKeyPressed={this.submitNumber}/>

                <div className="status">
                    {this.state.textUnderField || <span>&nbsp;</span>}
                </div>

                <BigHighlightedButton 
                    onClick={this.submitNumber}>
                    NEXT
                </BigHighlightedButton>
            </div>
        );
    }
}

class AuthWindowStepCode extends React.Component {
    constructor (args) {
        super(args);

        this.state= {
            code: '',
            invalid: false,
        };
    }
    handleCodeFieldChange= (event) => {
        this.setState({
            code: event.target.value,
            invalid: false
        });
        if(event.target.value.length==this.props.info.type.length) {
            this.handleContinueButton(event.target.value);
        }
    }
    handleContinueButton= (code) => {
        if(typeof code != 'string') {
            code= undefined;
        }
        code = code || this.state.code;
        if(code.length!=this.props.info.type.length) return;

        Auth.checkAuthCode(code).catch(reason=> {
            if(reason.message==='PHONE_CODE_INVALID'){
                this.setState({
                    textUnderField: 'You have entered an invalid code.',
                    invalid: true
                });
            }
            else
                this.setState({
                    textUnderField: reason.message,
                    invalid: true
                });
        });
    }
    render () {
        var message= (this.props.info.type['@type']=='authenticationCodeTypeSms') ?
            (<p className="description">
                A code was sent <strong>via SMS</strong> to your phone number.
            </p>) 
            :
            (<p className="description">
                A code was sent <strong>via Telegram</strong> to your other devices, if you have any connected.
            </p>);
            
        return (
            <div id="auth" className="auth-step-code">

                <h2>{this.props.info.phone_number}</h2>

                {message}

                <UnderlinedInput 
                    type="text" 
                    value={this.state.code} 
                    onChange={this.handleCodeFieldChange}
                    autoFocus={true}
                    title="Code"
                    maxLength={this.props.info.type.length}
                    onEnterKeyPressed={this.handleContinueButton}
                    invalid={this.state.invalid}/>

                <div className="status">
                    {this.state.textUnderField || ''}
                </div>

                <BigHighlightedButton 
                    onClick={this.handleContinueButton}>
                    NEXT
                </BigHighlightedButton>
            </div>
        );
    }
}
AuthWindowStepCode.propTypes= {
    info: PropTypes.object
};
class AuthWindowStepPassword extends React.Component {
    constructor (args) {
        super(args);

        this.state= {
            password: '',
            invalid: false
        };
    }
    handlePasswordFieldChange= (event) => {
        this.setState({
            password: event.target.value,
            invalid: false,
        });
    }
    handleContinueButton= async () => {
        Auth.check2FACode(this.state.password).catch(reason=> {
            if(reason.message=='PASSWORD_HASH_INVALID') 
                this.setState({
                    textUnderField: 'You have entered a wrong password.',
                    invalid: true,
                });
            else
                this.setState({
                    textUnderField: reason.message,
                    invalid: true,
                });
        });
    }
    render () {
        return (
            <div id="auth" className="auth-step-password">
                <div className="content">

                    <h2>Cloud password check</h2>

                    <p className="description">
                        Please enter your cloud password.
                    </p>

                    <UnderlinedInput 
                        type="text" 
                        value={this.state.password} 
                        onChange={this.handlePasswordFieldChange}
                        autoFocus={true} 
                        title="Your cloud password"
                        onEnterKeyPressed={this.handleContinueButton}
                        disableCopy={true}
                        invalid={this.state.invalid}/>

                    <div className="hint">
                        Hint: {this.props.info.password_hint}
                    </div>

                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>

                    <div className="status">
                        {this.state.textUnderField || <i>&nbsp;</i>}
                    </div>

                    <BigHighlightedButton 
                        onClick={this.handleContinueButton}>
                        SUBMIT
                    </BigHighlightedButton>
                </div>
            </div>
        );
    }
}
AuthWindowStepPassword.propTypes= {
    info: PropTypes.object
};

class AuthWindowStepRegister extends React.Component {
    constructor (args) {
        super(args);

        this.state= {
            firstName: '',
            lastName: ''
        };
    }
    handleFirstNameFieldChange= (event) => {
        this.setState({firstName: event.target.value});
    }
    handleLastNameFieldChange= (event) => {
        this.setState({lastName: event.target.value});
    }
    handleContinueButton= async () => {
        await Auth.registerNewAccount(this.state.firstName, this.state.lastName).catch(reason=> {
            this.setState({textUnderField: reason.message});
        });
    }
    render () {
        return (
            <div id="auth" className="auth-step-signup">
                <div className="content">

                    <h2>Your info</h2>

                    <p className="description">
                        Please enter your name and upload a photo.
                    </p>

                    <UnderlinedInput 
                        type="text" 
                        value={this.state.firstName} 
                        onChange={this.handleFirstNameFieldChange}
                        autoFocus={true} />

                    <UnderlinedInput 
                        type="text" 
                        value={this.state.lastName} 
                        onChange={this.handleLastNameFieldChange} />

                    <div className="status">
                        {this.state.textUnderField || ''}
                    </div>

                    <BigHighlightedButton 
                        onClick={this.handleContinueButton}>
                        SIGN UP
                    </BigHighlightedButton>
                </div>
            </div>
        );
    }
}
