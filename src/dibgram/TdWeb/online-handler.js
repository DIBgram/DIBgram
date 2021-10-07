import TdLib from './tdlib';

export default function setInitialOnlineStatus(){
    TdLib.sendQuery({
        '@type': 'setOption',
        name: 'online',
        value: {
            '@type': 'optionValueBoolean',
            value: document.hasFocus()
        }
    });
}

window.onfocus = () => {
    TdLib.sendQuery({
        '@type': 'setOption',
        name: 'online',
        value: {
            '@type': 'optionValueBoolean',
            value: true
        }
    });
};

window.onblur = () => {
    TdLib.sendQuery({
        '@type': 'setOption',
        name: 'online',
        value: {
            '@type': 'optionValueBoolean',
            value: false
        }
    });
};