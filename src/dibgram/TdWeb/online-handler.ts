import TdLib from './tdlib';

/**
 * Sets initial online state
 */
export default function setInitialOnlineStatus(): void {
    TdLib.sendQuery({
        '@type': 'setOption',
        name: 'online',
        value: {
            '@type': 'optionValueBoolean',
            value: document.hasFocus()
        }
    });
}

window.onfocus = () => { // Become online when tab/window focuses
    TdLib.sendQuery({
        '@type': 'setOption',
        name: 'online',
        value: {
            '@type': 'optionValueBoolean',
            value: true
        }
    });
};

window.onblur = () => { // Become offline when switching tabs/windows
    TdLib.sendQuery({
        '@type': 'setOption',
        name: 'online',
        value: {
            '@type': 'optionValueBoolean',
            value: false
        }
    });
};