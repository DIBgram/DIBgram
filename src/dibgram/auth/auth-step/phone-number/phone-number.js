import React from 'react';
import { Provider } from 'react-redux';
import Auth from '../../../TdWeb/auth';
import connectionStore from '../../../TdWeb/connectionStore';
import ConfirmDialog from '../../../ui/dialog/confirm-dialog';
import { addDialog } from '../../../ui/dialog/dialogs';
import BigHighlightedButton from '../../../ui/elements/highlighted-button';
import UnderlinedInput from '../../../ui/elements/underlined-input';
import { manageStatusTextContent } from '../../auth-screen';
import ConnectionState from '../../../ui/components/connecting';
import callingCodes from './phone-number-calling-codes.json';
import './phone-number.scss';
import CountrySelect from './country-select';
import TdLib from '../../../TdWeb/tdlib';

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
        number_p: '+',
        invalid: false,
        statusContent: '',
        statusVisible: false,
        dropDownText: 'Country Code',
        countries: [],
    };

    ref1= React.createRef();
    ref2= React.createRef();

    componentDidMount() {
        TdLib.sendQuery({
            '@type': 'getCountries',
        }).then(result => {
            this.setState({
                countries: result.countries,
            });
        });
    }


    handlePNFieldChange = (event) => {
        const value = event.target.value.replace(/[^0-9-]/g, '');
        this.setState({
            number: value,
            invalid: false // We shouldn't show the phone number as invalid, since it has changed after submission
        });
        this.changeStatus(''); // The same
    }

    openCountryDropdown = () => {
        addDialog('login-phone-number-country-selector-dialog', (
            <CountrySelect id="login-phone-number-country-selector-dialog"
                countries={this.state.countries} onChange={cc=> {
                    this.setState({
                        number_p: cc,
                        dropDownText: this.getCountryDropdownText(cc),
                    });
                }}/>
        ));
    }

    getCountryDropdownText(callingCode) {
        var countryName= 'Invalid Country Code';
        if(callingCode == '+') {
            countryName= 'Country Code';
        }
        for(let country of callingCodes) {
            if( callingCode.substr(1) == country.callingCode) {
                countryName = country.name;
                break;
            }
        }
        return countryName;
    }

    handlePNFieldChange_p = (event) => {
        var value = '+' + event.target.value.replace(/[^0-9-]/g, '');

        if(value.length > 5) {
            let length = 1;
            for(let country of callingCodes) {
                if(value.startsWith(country.callingCode, 1)) {
                    length = country.callingCode.length+1;
                    break;
                }
            }

            let value_new = value.substr(0, length);
            let rest= value.substr(length);

            this.setState({
                number_p: value_new,
                number: rest + this.state.number,
                invalid: false,
                dropDownText: this.getCountryDropdownText(value_new)
            });
            this.ref2.current.focus();
        }
        else {
            this.setState({
                number_p: value,
                dropDownText: this.getCountryDropdownText(value)
            });
        }

        this.changeStatus('');
    }

    /** @param {React.SyntheticEvent<HTMLInputElement>} e */
    handleKeyDown = (e) => { // Focus the previous field when the user presses the backspace key
        if(e.nativeEvent.key === 'Backspace') {
            if(this.state.number.length === 0) {
                this.ref1.current.focus();
            }
        }
    }

    submitNumber= async () => {
        const number = this.state.number_p + ' ' + this.state.number;
        Auth.givePhoneNumber(number).catch(reason=> {
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

                <div className="country-dropdown" onClick={this.openCountryDropdown}>
                    {this.state.dropDownText}
                </div>

                <div className="phone-number-input">
                    <UnderlinedInput
                        iRef={this.ref1}
                        type="tel" 
                        value={this.state.number_p} 
                        autoFocus={true}
                        onChange={this.handlePNFieldChange_p}
                        onEnterKeyPressed={this.submitNumber}
                        preventNumberScrolling={false}/>
                    
                    <UnderlinedInput
                        iRef={this.ref2}
                        type="tel" 
                        value={this.state.number} 
                        onChange={this.handlePNFieldChange}
                        onEnterKeyPressed={this.submitNumber}
                        invalid={this.state.invalid}
                        preventNumberScrolling={false}
                        onKeyDown={this.handleKeyDown}/>
                </div>

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