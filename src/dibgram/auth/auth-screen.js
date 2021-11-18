import React from 'react';
import PropTypes from 'prop-types';
import TdLib from '../TdWeb/tdlib';
import {MessengerWindow} from '../messenger/messengerWindow';
import Dialogs, { dialogStore } from '../ui/dialog/dialogs';
import './auth.scss';
import { connect, Provider } from 'react-redux';
import AuthWindowStepPhoneNumber from './auth-step/phone-number/phone-number';
import AuthWindowStepCode from './auth-step/verification-code/verification-code';
import AuthWindowStepPassword from './auth-step/cloud-password/cloud-password';
import AuthWindowStepRegister from './auth-step/register/register';
import { createStore } from 'redux';
import { themeStore } from '../ui/themes/theme';
import { _s__ } from '../language-pack/language-pack';
import LoadingSpinner from '../ui/elements/loading-spinner';

export const authStore = createStore((state= { 'state': null }, action) => {
    switch (action.type) {
    case 'SET_STATE':
        return {
            ...state,
            'state': action.state
        };
    default:
        return state;
    }
});

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
export const MainApp= connect(state=> ({step: state.state}))(class MainApp extends React.Component {
    static propTypes = {
        step: PropTypes.object
    };

    componentDidMount(){
        // Handle authorization state updates
        TdLib.registerUpdateHandler('updateAuthorizationState', (update) => {
            authStore.dispatch({
                type: 'SET_STATE',
                state: update.authorization_state
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        // Some authorization states are handled without the user knowing. We don't change what's shown to the users if that happens.
        const states= [
            'authorizationStateWaitPhoneNumber',
            'authorizationStateWaitCode',
            'authorizationStateWaitPassword',
            'authorizationStateWaitRegistration',
            'authorizationStateReady',
            'authorizationStateClosed',
        ];
        if(states.includes(nextProps.step['@type'])) {
            return true;
        }
        return false;
    }
    
    render () {
        switch (this.props.step?.['@type']) {
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
                    <AuthWindowStepCode info={this.props.step.code_info}/>
                </React.Fragment>
            );

        case 'authorizationStateWaitPassword':
            // Enter your 2-factor auth password
            return (
                <React.Fragment>
                    <Provider store={dialogStore}>
                        <Dialogs/>
                    </Provider>
                    <AuthWindowStepPassword info={this.props.step}/>
                </React.Fragment>
            );

        case 'authorizationStateWaitRegistration':
            // There isn't an account on this number, you need to sign up
            return (
                <React.Fragment>
                    <Provider store={dialogStore}>
                        <Dialogs/>
                    </Provider>
                    <AuthWindowStepRegister tos={this.props.step.terms_of_service}/>
                </React.Fragment>
            );

        case 'authorizationStateReady':
            // Logged in
            return (
                <Provider store={themeStore}>
                    <MessengerWindow/>
                </Provider>
            );

        case 'authorizationStateClosed':
            // TDLib session is closed.
            window.location.reload();
            return (
                <p>{_s__('lngd_auth_closed_restart')}</p>
            );
        
        default:
            // TDLib is still loading
            return (
                <div id="auth" className="loading">
                    <LoadingSpinner size={50} lineWidth={5} progressColor="var(--theme-color-menuIconFg)"/>
                </div>
            );
        }
    }
});
