import React from 'react';
import PropTypes from 'prop-types';
import { manageStatusTextContent } from '../auth-screen';
import Auth from '../../TdWeb/auth';
import UnderlinedInput from '../../ui/elements/underlined-input';
import BigHighlightedButton from '../../ui/elements/highlighted-button';
import { Provider } from 'react-redux';
import connectionStore from '../../TdWeb/connectionStore';
import ConnectionState from '../../ui/components/connecting';
import './verification-code.scss';

/**
 * Renders verification code step of authorization screen
 */
export default class AuthWindowStepCode extends React.Component {
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