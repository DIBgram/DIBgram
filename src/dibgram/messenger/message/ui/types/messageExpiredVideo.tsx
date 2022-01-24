import React from 'react';
import __ from '../../../../language-pack/language-pack';
import { ServiceMessage } from '../message-containers';

export default function MessageExpiredVideo(): JSX.Element {
    return (
        <ServiceMessage>
            {__('lng_ttl_video_expired')}
        </ServiceMessage>
    );
}