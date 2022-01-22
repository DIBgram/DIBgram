import React from 'react';
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
import TdApi from '../TdWeb/td_api';

type AuthStoreState = {
    state: TdApi.td_AuthorizationState | null;
}

type AuthStoreAction_SetState = {
    type: 'SET_STATE';
    state: TdApi.td_AuthorizationState;
}

export const authStore = createStore<AuthStoreState, AuthStoreAction_SetState, any, any>(
    (state= { 'state': null }, action) => {
        switch (action.type) {
            case 'SET_STATE':
                return {
                    ...state,
                    'state': action.state
                };
            default:
                return state;
        }
    }
);


type ComponentWithStatusText= React.Component<unknown, {
    statusContent: React.ReactNode|React.ReactNode[]|null;
    statusVisible: boolean;
}>;

/**
 * Returns 2 functions that can be used for managing status text content
 * 
 * @param thisClass pass `this` as this argument
 * @returns Store this function and call it to change 
 */
export function manageStatusTextContent(thisClass: ComponentWithStatusText): [
    ()=> JSX.Element,
    (status: React.ReactNode|React.ReactNode[])=> void
] {
    return [ 
        function Status() {
            return (
                <div className={'status'+ (thisClass.state.statusVisible?'':' hidden')}>{thisClass.state.statusContent}</div>
            );
        },
        function changeStatus(string) {
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
        }
    ];
}

type MainAppProps= {
    step?: TdApi.td_AuthorizationState;
}

/**
 * Renders the messenger or authorization screens (layer 1). Does not include dialogs and toasts
 */
export const MainApp= connect<MainAppProps, unknown, Record<string, never>, AuthStoreState>(state=> ({step: state.state} as MainAppProps))(
    class MainApp extends React.Component<MainAppProps> {
        componentDidMount(){
            // Handle authorization state updates
            TdLib.registerUpdateHandler<TdApi.td_updateAuthorizationState>('updateAuthorizationState', (update) => {
                authStore.dispatch({
                    type: 'SET_STATE',
                    state: update.authorization_state
                });
            });
        }

        shouldComponentUpdate(nextProps: MainAppProps): boolean {
            // Some authorization states are handled without the user knowing. We don't change what's shown to the users if that happens.
            const states= [
                'authorizationStateWaitPhoneNumber',
                'authorizationStateWaitCode',
                'authorizationStateWaitPassword',
                'authorizationStateWaitRegistration',
                'authorizationStateReady',
                'authorizationStateClosed',
            ];
            if(states.includes(nextProps.step?.['@type'] || '')) {
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
    }
);
