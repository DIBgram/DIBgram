import { ProgressRing } from 'progress-ring';
import React from 'react';
import { cancelDownloadFile, downloadFile } from '../../TdWeb/file';
import TdApi from '../../TdWeb/td_api';
import { history_file_cancel, history_file_download } from '../icon/icons';
import './download-circle.scss';

type DownloadCircleProps = {
    file: TdApi.td_file,
    priority?: number,
}

export default function DownloadCircle({file, priority=1}: DownloadCircleProps): JSX.Element|null {
    if ((!file.local.is_downloading_active) && (!file.local.is_downloading_completed)) {
        return (
            <div className='download-circle-container' /*onClick={()=>downloadFile(file.id, priority)}*/>
                <div className="download-circle">
                    <div className="icon download" dangerouslySetInnerHTML={ {__html: history_file_download} }/>
                </div>
            </div>
        );
    } 
    else if(file.local.is_downloading_active) {
        return (
            <div className='download-circle-container' /*onClick={()=>cancelDownloadFile(file.id)}*/>
                <div className="download-circle">
                    <div className="icon cancel" dangerouslySetInnerHTML={ {__html: history_file_cancel} }/>
                    <ProgressRing 
                        size={40}
                        caps='round' 
                        lineWidth={3} 
                        percent={file.local.downloaded_size / file.expected_size * 99 + 1} 
                        transitionDuration={300} 
                        spin
                        trackColor="transparent"
                        progressColor="var(--theme-color-historyFileThumbIconFg)"
                    /> 
                </div>
            </div>
        );
    }
    return null;
}