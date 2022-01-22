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
import { intro_country_dropdown } from '../../../ui/icon/icons';
import __ from '../../../language-pack/language-pack';
import TdApi from '../../../TdWeb/td_api';

type AuthWindowStepPhoneNumberProps = {
}

type AuthWindowStepPhoneNumberState = {
    number: string;
    number_p: string;
    invalid: boolean;
    statusContent: React.ReactNode|React.ReactNode[]|null;
    statusVisible: boolean;
    dropDownText: React.ReactNode|React.ReactNode[];
    countries: TdApi.td_countryInfo[],
}

/**
 * Renders the phone number step of authorization screen
 */
export default class AuthWindowStepPhoneNumber extends React.Component<AuthWindowStepPhoneNumberProps, AuthWindowStepPhoneNumberState> {
    constructor(args: AuthWindowStepPhoneNumberProps) {
        super(args);
        [this.Status, this.changeStatus] = manageStatusTextContent(this);
    }
    state= {
        number: '',
        number_p: '+',
        invalid: false,
        statusContent: '',
        statusVisible: false,
        dropDownText: '',
        countries: [],
    };

    changeStatus: (status: React.ReactNode|React.ReactNode[])=> void;
    Status: ()=> JSX.Element;

    ref1= React.createRef<HTMLInputElement>();
    ref2= React.createRef<HTMLInputElement>();

    componentDidMount(): void {
        TdLib.sendQuery({
            '@type': 'getCountries',
        }).then((result) => {
            this.setState({
                countries: (result as TdApi.td_countries).countries,
            });
        });
    }


    handlePNFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value.replace(/[^0-9-]/g, '');
        this.setState({
            number: value,
            invalid: false // We shouldn't show the phone number as invalid, since it has changed after submission
        });
        this.changeStatus(''); // The same
    }

    openCountryDropdown = (): void => {
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

    getCountryDropdownText(callingCode: string): React.ReactNode|React.ReactNode[] {
        let countryName= __('lng_bad_country_code');
        if(callingCode == '+') {
            countryName= __('lng_country_code');
        }
        for(const country of callingCodes) {
            if( callingCode.slice(1) == country.callingCode) {
                countryName = country.name;
                break;
            }
        }
        return countryName;
    }

    handlePNFieldChange_p = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = '+' + event.target.value.replace(/[^0-9-]/g, '');

        if(value.length > 5) {
            let length = 1;
            for(const country of callingCodes) {
                if(value.startsWith(country.callingCode, 1)) {
                    length = country.callingCode.length+1;
                    break;
                }
            }

            const value_new = value.slice(0, length);
            const rest= value.slice(length);

            this.setState({
                number_p: value_new,
                number: rest + this.state.number,
                invalid: false,
                dropDownText: this.getCountryDropdownText(value_new)
            });
            this.ref2.current?.focus();
        }
        else {
            this.setState({
                number_p: value,
                dropDownText: this.getCountryDropdownText(value)
            });
        }

        this.changeStatus('');
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => { // Focus the previous field when the user presses the backspace key
        if(e.nativeEvent.key === 'Backspace') {
            if(this.state.number.length === 0) {
                this.ref1.current?.focus();
            }
        }
    }

    submitNumber= (): void => {
        const number = this.state.number_p + ' ' + this.state.number;
        Auth.givePhoneNumber(number).catch(reason=> {
            switch(reason.message){
                case 'PHONE_NUMBER_FLOOD':
                    addDialog( 'phone_number_flood_error',
                        <ConfirmDialog width="320px" hideCancelButton={true} largeFont={true} id="phone_number_flood_error">
                            {__('lng_error_phone_flood')}
                        </ConfirmDialog>
                    );
                    this.changeStatus('');
                    break;

                case 'PHONE_NUMBER_INVALID':
                    this.setState({invalid: true});
                    this.changeStatus(__('lng_bad_phone'));
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
    render (): JSX.Element {
        const Status=this.Status;
        return (
            <div id="auth" className="auth-step-phoneNumber">

                <h2>{__('lng_phone_title')}</h2>

                <p className="description">
                    {__('lng_phone_desc')}
                </p>

                {//TODO: Add phone number placeholder
                }

                <div className="country-dropdown" onClick={this.openCountryDropdown}>
                    {this.state.dropDownText || __('lng_country_code')}
                    <span dangerouslySetInnerHTML={{__html: intro_country_dropdown}}/>
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
                    {__('lng_intro_next')}
                </BigHighlightedButton>

                <Provider store={connectionStore}>
                    <ConnectionState/>
                </Provider>
            </div>
        );
    }
}