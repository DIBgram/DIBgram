import React from 'react';
import { __fmt } from '../../../../language-pack/language-pack';
import TdLib from '../../../../TdWeb/tdlib';
import TdApi from '../../../../TdWeb/td_api';
import currencyAmountToString from '../../../sections/payments/currency-tostring';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';
import currencies from '../../../sections/payments/currencies.json';

export default function MessagePaymentSuccessful({message, chat}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messagePaymentSuccessful') {
        throw new Error('Message is not messagePaymentSuccessful');
    }

    const [invoiceMessage, setInvoiceMessage] = React.useState<TdApi.td_message|0|-1>(0);

    function handleMessageQuery(result: TdApi.td_message|TdApi.td_error) {
        if(result['@type'] == 'error') {
            setInvoiceMessage(-1);
        }
        else {
            setInvoiceMessage(result);
        }
    }

    if(invoiceMessage == 0) {
        TdLib.sendQuery({
            '@type': 'getMessage',
            chat_id: message.content.invoice_chat_id,
            message_id: message.content.invoice_message_id
        }).then(handleMessageQuery, handleMessageQuery);
    }

    return typeof invoiceMessage == 'number'? (
        <ServiceMessage>
            {__fmt('lng_action_payment_done', {
                amount: currencyAmountToString(message.content.currency as keyof typeof currencies, message.content.total_amount),
                user: chat.title
            })}
        </ServiceMessage>
    ) : (
        <ServiceMessage>
            {__fmt('lng_action_payment_done_for', {
                amount: currencyAmountToString(message.content.currency as keyof typeof currencies, message.content.total_amount),
                user: chat.title,
                invoice: (invoiceMessage.content as TdApi.td_messageInvoice).title
            })}
        </ServiceMessage>
    );
}