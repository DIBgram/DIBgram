import React from 'react';
import TdLib from '../TdWeb/tdlib';
import {MessengerWindow} from '../messenger/messengerWindow';

import Dialogs, { dialogStore } from '../ui/dialog/dialogs';

import './auth.scss';
import { Provider } from 'react-redux';
import AuthWindowStepPhoneNumber from './auth-step/phone-number/phone-number';
import AuthWindowStepCode from './auth-step/verification-code/verification-code';
import AuthWindowStepPassword from './auth-step/cloud-password/cloud-password';
import AuthWindowStepRegister from './auth-step/register/register';

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
export function manageStatusTextContent(thisClass) {
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
                <React.Fragment>
                    <Provider store={dialogStore}>
                        <Dialogs/>
                    </Provider>
                    <AuthWindowStepPhoneNumber/>
                </React.Fragment>
            );

        case 'authorizationStateWaitCode':
            // Enter the verification code sent to you
            return (
                <React.Fragment>
                    <Provider store={dialogStore}>
                        <Dialogs/>
                    </Provider>
                    <AuthWindowStepCode info={this.state.step.code_info}/>
                </React.Fragment>
            );

        case 'authorizationStateWaitPassword':
            // Enter your 2-factor auth password
            return (
                <React.Fragment>
                    <Provider store={dialogStore}>
                        <Dialogs/>
                    </Provider>
                    <AuthWindowStepPassword info={this.state.step}/>
                </React.Fragment>
            );

        case 'authorizationStateWaitRegistration':
            // There isn't an account on this number, you need to sign up
            return (
                <React.Fragment>
                    <Provider store={dialogStore}>
                        <Dialogs/>
                    </Provider>
                    <AuthWindowStepRegister tos={this.state.step.terms_of_service}/>
                </React.Fragment>
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
