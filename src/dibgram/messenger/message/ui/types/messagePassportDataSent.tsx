import React from 'react';
import __, { __fmt } from '../../../../language-pack/language-pack';
import { LanguagePackKey } from '../../../../language-pack/language-pack-types';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessagePassportDataSent({message, chat}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messagePassportDataSent') {
        throw new Error('Message is not messagePassportDataSent');
    }

    const passportDataTypeToString= {
        'passportElementTypeAddress':               'lng_passport_address',
        'passportElementTypeBankStatement':         'lng_passport_address_statement',
        'passportElementTypeDriverLicense':         'lng_passport_identity_license',
        'passportElementTypeEmailAddress':          'lng_passport_email_title',
        'passportElementTypeIdentityCard':          'lng_passport_identity_card',
        'passportElementTypeInternalPassport':      'lng_passport_identity_internal',
        'passportElementTypePassport':              'lng_passport_identity_passport',
        'passportElementTypePassportRegistration':  'lng_passport_address_registration',
        'passportElementTypePersonalDetails':       'lng_passport_personal_details',
        'passportElementTypePhoneNumber':           'lng_passport_phone_title',
        'passportElementTypeRentalAgreement':       'lng_passport_address_agreement',
        'passportElementTypeTemporaryRegistration': 'lng_passport_address_temporary',
        'passportElementTypeUtilityBill':           'lng_passport_address_bill',
    };
    const passportDataTypes= message.content.types.map(type=> (__(passportDataTypeToString[type['@type']] as LanguagePackKey) as string).toLowerCase());
    return (
        <ServiceMessage>
            {__fmt('lng_action_secure_values_sent', {
                user: chat.title,
                documents: passportDataTypes.join(', ')
            })}
        </ServiceMessage>
    );
}