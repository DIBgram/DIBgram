import React from 'react';
import PropTypes from 'prop-types';
import TdLib from '../TdWeb/tdlib';
import Auth from '../TdWeb/auth';
import {MessengerWindow} from '../messenger/messengerWindow';

import BigHighlightedButton from '../ui/elements/highlighted-button';
import UnderlinedInput from '../ui/elements/underlined-input';
import ConnectionState from '../ui/components/connecting';
import { addDialog } from '../ui/dialog/dialogs';
import ConfirmDialog from '../ui/dialog/confirm-dialog';

import './auth.scss';
import { Provider } from 'react-redux';
import connectionStore from '../TdWeb/connectionStore';
import LinkButton from '../ui/elements/link-button';

var initialAuthState = {'@type': undefined};
export function setInitialAuthState(state) {
    initialAuthState=state;
}

/**
 * Start managing a status text block with fade effects.  
 * Usage:
 * ```js
 * // constructor
 * manageStatusTextContent(this);
 * 
 * // render
 * <Status/>
 * 
 * // TdLib.sendQuery({...}).then
 * this.changeStatus("Wrong code")
 * 
 * // state
 * {
 *   statusContent: '',
 *   statusVisible: false
 * }
 * ```
 * 
 * @param {React.Component} thisClass pass `this` as this argument
 * @returns Store this function and call it to change 
 */
function manageStatusTextContent(thisClass) {
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
                if(!thisClass.state.statusVisible) { // Prevent timeout overlapping with later status changes
                    thisClass.setState({
                        statusContent: null
                    });
                }
            }, 1000);
        }
    };
}

/**
 * Renders the messenger or authorization screens (layer 1). Does not include dialogs and toasts
 */
export class MainApp extends React.Component {
    state= {
        step: initialAuthState
    };

    componentDidMount(){
        // Change `setInitialAuthState` to update state, because we don't use `initialAuthState` anymore
        // eslint-disable-next-line no-func-assign
        setInitialAuthState= state=> {
            this.setState({step: state});
        };

        // Handle authorization state updates
        TdLib.registerUpdateHandler('updateAuthorizationState', this.handleAuthStateUpdate);
    }

    handleAuthStateUpdate= update => {
        // Some authorization states are handled without the user knowing. We don't change what's shown to the users if that happens.
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
            // Enter your phone number
            return (
                <AuthWindowStepPhoneNumber/>
            );

        case 'authorizationStateWaitCode':
            // Enter the verification code sent to you
            return (
                <AuthWindowStepCode info={this.state.step.code_info}/>
            );

        case 'authorizationStateWaitPassword':
            // Enter your 2-factor auth password
            return (
                <AuthWindowStepPassword info={this.state.step}/>
            );

        case 'authorizationStateWaitRegistration':
            // There isn't an account on this number, you need to sign up
            return (
                <AuthWindowStepRegister/>
            );

        case 'authorizationStateReady':
            // Logged in
            return (
                <MessengerWindow/>
            );

        case 'authorizationStateClosed':
            // TDLib session is closed.
            window.location.reload();
            return (
                <p>This session is closed. Please wait till DIBgram reloads automatically...</p>
            );
        
        default:
            // TDLib is still loading
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
        invalid: false,
        statusContent: '',
        statusVisible: false
    };
    handlePNFieldChange = (event) => {
        this.setState({
            number: event.target.value,
            invalid: false // We shouldn't show the phone number as invalid, since it has changed after submission
        });
        this.changeStatus(''); // The same
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
                // We don't know what error it is, so just show it to the user, he/she might understand it.
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

                {
                    //TODO: Add a country code selector  
                    //TODO: Separate the country code from the phone number
                    //TODO: Add phone number placeholder
                }
                <UnderlinedInput 
                    type="number" 
                    value={this.state.number} 
                    autoFocus={true}
                    onChange={this.handlePNFieldChange}
                    onEnterKeyPressed={this.submitNumber}
                    invalid={this.state.invalid}
                    preventNumberScrolling={false}/>

                <Status/>

                <BigHighlightedButton 
                    onClick={this.submitNumber}>
                    NEXT
                </BigHighlightedButton>

                <Provider store={connectionStore}>
                    <ConnectionState/>
                </Provider>
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
        statusContent: '',
        statusVisible: false
    };

    handleCodeFieldChange= (event) => {
        this.setState({
            code: event.target.value,
            invalid: false // Verification code is changed, and we don't know if it is correct or not. Do not show it as invalid anymore
        });
        this.changeStatus('');
        if(event.target.value.length==this.props.info.type.length) { // Automatically submit code if it is filled in
            this.handleContinueButton(event.target.value);
        }
    }
    handleContinueButton= (code) => {
        // `code` might be the authorization code, or an event object. If it is not the authorization code, get it ourselves
        if(typeof code != 'string') {
            code= undefined;
        }
        code = code || this.state.code;

        if(code.length!=this.props.info.type.length) return; // The code is not complete. It is definitely wrong.

        Auth.checkAuthCode(code).catch(reason=> {
            if(reason.message==='PHONE_CODE_INVALID'){
                this.setState({invalid: true});
                this.changeStatus('You have entered an invalid code.');
            }
            else {
                // We don't know the error, all we can do is to just inform the user about it
                this.setState({invalid: true});
                this.changeStatus(reason.message);
            }
        });
    }
    render () {
        const Status = this.Status;

        var message= (this.props.info.type['@type']=='authenticationCodeTypeSms') ?
            (<p className="description">
                We&apos;ve sent an activation code to your phone. <br/>
                Please enter it below.
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
                    type="number" 
                    value={this.state.code} 
                    onChange={this.handleCodeFieldChange}
                    autoFocus={true}
                    title="Code"
                    maxLength={this.props.info.type.length}
                    onEnterKeyPressed={this.handleContinueButton}
                    invalid={this.state.invalid}
                    preventNumberScrolling={true}/>

                <Status/>

                <BigHighlightedButton 
                    onClick={this.handleContinueButton}>
                    NEXT
                </BigHighlightedButton>

                <Provider store={connectionStore}>
                    <ConnectionState/>
                </Provider>
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
        invalid: false,
        statusContent: '',
        statusVisible: false
    };
    handlePasswordFieldChange= (event) => {
        this.setState({
            password: event.target.value,
            invalid: false, // Password was changed, and we don't know if it is wrong or not. We should not show it as wrong
        });
        this.changeStatus(''); // Same
    }
    handleContinueButton= async () => {
        Auth.check2FACode(this.state.password).catch(reason=> {
            if(reason.message=='PASSWORD_HASH_INVALID') {
                this.setState({invalid: true});
                this.changeStatus('You have entered a wrong password.');
            }
            else {
                // We don't know what the error is, so all we can do is to show it to the user
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
                        type={'webkitTextSecurity' in document.body.style ? 'text' : 'password'} 
                        value={this.state.password} 
                        onChange={this.handlePasswordFieldChange}
                        autoFocus={true} 
                        title="Your cloud password"
                        onEnterKeyPressed={this.handleContinueButton}
                        disableCopy={true}
                        invalid={this.state.invalid}/>

                    <div className="hint">
                        {this.props.info.password_hint?'Hint: ':<span>&nbsp;</span>}{this.props.info.password_hint}
                    </div>

                    <div className="forgot-password">
                        <LinkButton>Forgot password?</LinkButton>
                    </div>

                    <Status/>

                    <BigHighlightedButton 
                        onClick={this.handleContinueButton}>
                        SUBMIT
                    </BigHighlightedButton>

                    <Provider store={connectionStore}>
                        <ConnectionState/>
                    </Provider>
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
        lastName: '',
        statusContent: '',
        statusVisible: false
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

                    <Provider store={connectionStore}>
                        <ConnectionState/>
                    </Provider>
                </div>
            </div>
        );
    }
}
