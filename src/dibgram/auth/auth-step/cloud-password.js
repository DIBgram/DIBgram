import React from 'react';
import PropTypes from 'prop-types';
import { manageStatusTextContent } from '../auth-screen';
import Auth from '../../TdWeb/auth';
import UnderlinedInput from '../../ui/elements/underlined-input';
import LinkButton from '../../ui/elements/link-button';
import BigHighlightedButton from '../../ui/elements/highlighted-button';
import { Provider } from 'react-redux';
import connectionStore from '../../TdWeb/connectionStore';
import ConnectionState from '../../ui/components/connecting';


/**
 * Renders 2FA password step of authorization screen
 */
export default class AuthWindowStepPassword extends React.Component {
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
                        type="password"
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

                </div>
                <Provider store={connectionStore}>
                    <ConnectionState/>
                </Provider>
            </div>
        );
    }
}