import { ProgressRing } from 'progress-ring';
import React from 'react';
import TdLib from '../../TdWeb/tdlib';
import TdApi from '../../TdWeb/td_api';
import { history_file_cancel, history_file_download } from '../icon/icons';
import './download-circle.scss';

type DownloadCircleProps = {
    file: TdApi.file,
    priority?: number,
}

export default function DownloadCircle({file, priority=1}: DownloadCircleProps): JSX.Element|null {

    function downloadFile() {
        TdLib.sendQuery({
            '@type': 'downloadFile',
            'file_id': file.id,
            'priority': priority,
            'offset': 0,
            'limit': 0,
            'synchronous': false
        }).then(file=> {
            TdLib.handleUpdate({ // TDLib will not sent an update when file.local.is_downloading_active changes. We can inject one here.
                '@type': 'updateFile',
                file
            });
        });
    }

    function cancelDownloadFile() {
        TdLib.sendQuery({
            '@type': 'cancelDownloadFile',
            'file_id': file.id
        });
    }

    if ((!file.local.is_downloading_active) && (!file.local.is_downloading_completed)) {
        return (
            <div className='download-circle-container' onClick={downloadFile}>
                <div className="download-circle">
                    <div className="icon download" dangerouslySetInnerHTML={ {__html: history_file_download} }/>
                </div>
            </div>
        );
    } 
    else if(file.local.is_downloading_active) {
        return (
            <div className='download-circle-container' onClick={cancelDownloadFile}>
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