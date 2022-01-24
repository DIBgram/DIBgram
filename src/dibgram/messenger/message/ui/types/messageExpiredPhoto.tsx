import React from 'react';
import __ from '../../../../language-pack/language-pack';
import { ServiceMessage } from '../message-containers';

export default function MessageExpiredPhoto(): JSX.Element {
    return (
        <ServiceMessage>
            {__('lng_ttl_photo_expired')}
        </ServiceMessage>
    );
}