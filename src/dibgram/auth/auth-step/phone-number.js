import React from 'react';
import { Provider } from 'react-redux';
import Auth from '../../TdWeb/auth';
import connectionStore from '../../TdWeb/connectionStore';
import ConfirmDialog from '../../ui/dialog/confirm-dialog';
import { addDialog } from '../../ui/dialog/dialogs';
import BigHighlightedButton from '../../ui/elements/highlighted-button';
import UnderlinedInput from '../../ui/elements/underlined-input';
import { manageStatusTextContent } from '../auth-screen';
import ConnectionState from '../../ui/components/connecting';
import './phone-number.scss';

/**
 * Renders the phone number step of authorization screen
 */
export default class AuthWindowStepPhoneNumber extends React.Component {
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
                    <ConfirmDialog width="320px" hideCancelButton={true} largeFont={true} id="phone_number_flood_error">
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
                    type="tel" 
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