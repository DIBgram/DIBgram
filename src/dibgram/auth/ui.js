import React from 'react';
import PropTypes from 'prop-types';
import TdLib from '../TdWeb/tdlib';
import Auth from './auth';
import {MessengerWindow} from '../messenger/messengerWindow';

import BigHighlightedButton from '../ui/elements/highlighted-button';
import UnderlinedInput from '../ui/elements/underlined-input';
import ConnectionState from '../ui/components/connecting';
import { addDialog } from '../ui/dialog/dialogs';
import ConfirmDialog from '../ui/dialog/confirm-dialog';

var initialAuthState = {'@type': undefined};
export function setInitialAuthState(state) {
    initialAuthState=state;
}

/**
 * Start managing a status text block with fade effects.  
 * Usage:
 * ```js
 * manageStatusTextContent(this);
 * ```
 * 
 * @param {React.Component} thisClass pass `this` as this argument
 * @returns Store this function and call it to change 
 */
function manageStatusTextContent(thisClass) {
    thisClass.state= {
        ...(thisClass.state|{}),
        statusContent: '',
        statusVisible: false
    };
    thisClass.Status= function Status(){
        return (
            <div className={'status'+ (thisClass.state.statusVisible?'':' hidden')}>{thisClass.state.statusContent}</div>
        );
    };
    thisClass.changeStatus= function(string){
        if(string) {
            thisClass.setState({
                statusContent: string,
                statusVisible: true
            });
        } else {
            thisClass.setState({
                statusVisible: false
            });
            setTimeout(() => {
                thisClass.setState({
                    statusContent: null
                });
            }, 1000);
        }
    };
}

/**
 * Renders the messenger or authorization screens. Does not include dialogs and toasts
 */
export class MainApp extends React.Component {
    state= {
        step: initialAuthState
    };

    componentDidMount(){
        // eslint-disable-next-line no-func-assign
        setInitialAuthState= state=> {
            this.setState({step: state});
        };

        TdLib.registerUpdateHandler('updateAuthorizationState', this.handleAuthStateUpdate);
    }

    handleAuthStateUpdate= update => {
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
    };
    
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

/**
 * Renders the phone number step of authorization screen
 */
class AuthWindowStepPhoneNumber extends React.Component {
    constructor(args) {
        super(args);
        manageStatusTextContent(this);
    }
    state= {
        number: '',
        invalid: false
    };
    handlePNFieldChange = (event) => {
        this.setState({
            number: event.target.value,
            invalid: false
        });
        this.changeStatus('');
    }
    submitNumber= async () => {
        Auth.givePhoneNumber(this.state.number).catch(reason=> {
            switch(reason.message){
            case 'PHONE_NUMBER_FLOOD':
                addDialog( 'phone_number_flood_error',
                    <ConfirmDialog width="320px" hideCancelButton={true} id="phone_number_flood_error">
                        Sorry, you have deleted and re-created your account too many times recently.<br/>
                        Please wait for a few days before signing up again.
                    </ConfirmDialog>
                );
                this.changeStatus('');
                break;
            case 'PHONE_NUMBER_INVALID':
                this.setState({invalid: true});
                this.changeStatus('Invalid phone number. Please try again.');
                
                break;
            case 'Another authorization query has started': 
                break;
            default:
                this.setState({invalid: false});
                this.changeStatus(reason.message);
                break;
            }
        });
    }
    render () {
        const Status=this.Status;
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
                    onEnterKeyPressed={this.submitNumber}
                    invalid={this.state.invalid}/>

                <Status/>

                <BigHighlightedButton 
                    onClick={this.submitNumber}>
                    NEXT
                </BigHighlightedButton>

                <ConnectionState/>
            </div>
        );
    }
}

/**
 * Renders verification code step of authorization screen
 */
class AuthWindowStepCode extends React.Component {
    static propTypes= {
        info: PropTypes.object
    };
    constructor(args) {
        super(args);
        manageStatusTextContent(this);
    }
    state= {
        code: '',
        invalid: false,
    };
    handleCodeFieldChange= (event) => {
        this.setState({
            code: event.target.value,
            invalid: false
        });
        this.changeStatus('');
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
                this.setState({invalid: true});
                this.changeStatus('You have entered an invalid code.');
            }
            else {
                this.setState({invalid: true});
                this.changeStatus(reason.message);
            }
        });
    }
    render () {
        const Status = this.Status;

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

                <Status/>

                <BigHighlightedButton 
                    onClick={this.handleContinueButton}>
                    NEXT
                </BigHighlightedButton>

                <ConnectionState/>
            </div>
        );
    }
}

/**
 * Renders 2FA password step of authorization screen
 */
class AuthWindowStepPassword extends React.Component {
    constructor(args) {
        super(args);
        manageStatusTextContent(this);
    }
    static propTypes= {
        info: PropTypes.object
    };
    state= {
        password: '',
        invalid: false
    };
    handlePasswordFieldChange= (event) => {
        this.setState({
            password: event.target.value,
            invalid: false,
        });
        this.changeStatus('');
    }
    handleContinueButton= async () => {
        Auth.check2FACode(this.state.password).catch(reason=> {
            if(reason.message=='PASSWORD_HASH_INVALID') {
                this.setState({invalid: true});
                this.changeStatus('You have entered a wrong password.');
            }
            else {
                this.setState({invalid: true});
                this.changeStatus(reason.message);
            }
        });
    }
    render () {
        const Status=this.Status;
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

                    <Status/>

                    <BigHighlightedButton 
                        onClick={this.handleContinueButton}>
                        SUBMIT
                    </BigHighlightedButton>

                    <ConnectionState/>
                </div>
            </div>
        );
    }
}

/**
 * Render sign up step of authorization screen
 */
class AuthWindowStepRegister extends React.Component {
    state= {
        firstName: '',
        lastName: ''
    };
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

                    <ConnectionState/>
                </div>
            </div>
        );
    }
}
