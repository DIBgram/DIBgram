import React from 'react';
import PropTypes from 'prop-types';
import TdLib from '../TdWeb/tdlib';
import Auth from './auth';
import {MessengerWindow} from '../messenger/messengerWindow';

import BigHighlightedButton from '../ui/elements/highlighted-button';

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
            return (
                <p>This session is closed.</p>
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
    handleContinueButton= async () => {
        Auth.givePhoneNumber(this.state.number).catch(reason=> {
            this.setState({textUnderField: reason.message});
        });
    }
    render () {
        return (
            <div id="auth" className="auth-step-phoneNumber">
                <input type="text" value={this.state.number} onChange={this.handlePNFieldChange} />
                <h2>Your Phone Number</h2>
                <p className="description">Please confirm your country code and enter your mobile phone number.</p>
                <div className="status">{this.state.textUnderField || <span>&nbsp;</span>}</div>
                <BigHighlightedButton onClick={this.handleContinueButton}>NEXT</BigHighlightedButton>
            </div>
        );
    }
}

class AuthWindowStepCode extends React.Component {
    constructor (args) {
        super(args);

        this.state= {
            code: ''
        };
    }
    handleCodeFieldChange= (event) => {
        this.setState({code: event.target.value});
    }
    handleContinueButton= async () => {
        Auth.checkAuthCode(this.state.code).catch(reason=> {
            if(reason.message==='PHONE_CODE_INVALID'){
                this.setState({textUnderField: 'Code is invalid'});
            }
            else
                this.setState({textUnderField: reason.message});
        });
    }
    render () {
        var message= (this.props.info.type['@type']=='authenticationCodeTypeSms') ?
            <p className="description">Please enter the verification code you received as SMS:</p> :
            <p className="description">A code was sent <b>via Telegram</b> to your other devices, if you have any connected.</p>;
        return (
            <div id="auth" className="auth-state-code">
                <h2>{this.props.info.phone_number}</h2>
                {message}
                <input type="text" value={this.state.code} onChange={this.handleCodeFieldChange} />
                <div className="status">{this.state.textUnderField || ''}</div>
                <BigHighlightedButton onClick={this.handleContinueButton}>NEXT</BigHighlightedButton>
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
            password: ''
        };
    }
    handlePasswordFieldChange= (event) => {
        this.setState({password: event.target.value});
    }
    handleContinueButton= async () => {
        Auth.check2FACode(this.state.password).catch(reason=> {
            if(reason.message=='PASSWORD_HASH_INVALID') 
                this.setState({textUnderField: 'You have entered a wrong password.'});
            else
                this.setState({textUnderField: reason.message});
        });
    }
    render () {
        return (
            <div id="auth" className="auth-state-password">
                <div className="content">
                    <h2>Cloud password check</h2>
                    <p className="description">Please enter your cloud password.</p>
                    <input type="text" value={this.state.password} onChange={this.handlePasswordFieldChange} />
                    <div className="hint">Hint: {this.props.info.password_hint}</div>
                    <div className="forgot-password"><a href="#">Forgot password?</a></div>
                    <div className="status">{this.state.textUnderField || <i>&nbsp;</i>}</div>
                    <BigHighlightedButton onClick={this.handleContinueButton}>SUBMIT</BigHighlightedButton>
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
            <div id="auth" className="auth-state-signup">
                <div className="content">
                    <h2>Your info</h2>
                    <p className="description">Please enter your name and upload a photo.</p>
                    <input type="text" value={this.state.firstName} onChange={this.handleFirstNameFieldChange} />
                    <input type="text" value={this.state.lastName} onChange={this.handleLastNameFieldChange} />
                    <div className="status">{this.state.textUnderField || ''}</div>
                    <BigHighlightedButton onClick={this.handleContinueButton}>SIGN UP</BigHighlightedButton>
                </div>
            </div>
        );
    }
}
