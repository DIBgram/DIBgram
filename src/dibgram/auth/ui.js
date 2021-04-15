import React from 'react';
import TdLib from '../TdWeb/tdlib';
import Auth from './auth';
import {MessengerWindow} from '../messenger/messengerWindow';

var initialAuthState;
export function setInitialAuthState(state) {
    initialAuthState=state;
}

export class MainApp extends React.Component {
    constructor(args) {
        super(args);

        this.state= {
            step: initialAuthState
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
            const state=update['authorization_state']['@type'];
            if(states.includes(state)) {
                this.setState({step: state});
            }
        });
    }
    
    render () {
        switch (this.state.step) {
        case 'authorizationStateWaitPhoneNumber':
            return (
                <AuthWindowStepPhoneNumber/>
            );

        case 'authorizationStateWaitCode':
            return (
                <AuthWindowStepCode/>
            );

        case 'authorizationStateWaitPassword':
            return (
                <AuthWindowStepPassword/>
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
            return null;
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
            <div>
                <p>Please enter your phone number:</p>
                <input type="text" value={this.state.number} onChange={this.handlePNFieldChange} />
                {this.state.textUnderField || ''}
                <button onClick={this.handleContinueButton}>Continue</button>
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
        // if(res['@type']==='error') {
        //}
    }
    render () {
        return (
            <div>
                <p>Please enter the verification code you received:</p>
                <input type="text" value={this.state.code} onChange={this.handleCodeFieldChange} />
                {this.state.textUnderField || ''}
                <button onClick={this.handleContinueButton}>Continue</button>
            </div>
        );
    }
}

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
            this.setState({textUnderField: reason.message});
        });
    }
    render () {
        return (
            <div>
                <p>You have enabled 2FA on your account. Please enter your cloud password:</p>
                <input type="text" value={this.state.password} onChange={this.handlePasswordFieldChange} />
                {this.state.textUnderField || ''}
                <button onClick={this.handleContinueButton}>Continue</button>
            </div>
        );
    }
}

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
            <div>
                <p>Enter your name:</p>
                <input type="text" value={this.state.firstName} onChange={this.handleFirstNameFieldChange} />
                <input type="text" value={this.state.lastName} onChange={this.handleLastNameFieldChange} />
                {this.state.textUnderField || ''}
                <button onClick={this.handleContinueButton}>Continue</button>
            </div>
        );
    }
}
