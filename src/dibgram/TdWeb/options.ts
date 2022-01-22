import TdLib from './tdlib';
import TdApi from './td_api';

type OptionInt64ToInt53<T> = 
    T extends TdApi.td_optionValueInteger ? number :
    T extends TdApi.td_optionValueBoolean ? boolean :
    T extends TdApi.td_optionValueString ? string :
    T extends TdApi.td_optionValueEmpty ? undefined :
    never;
type OptionsInt64ToInt53<T> = { [K in keyof T]: OptionInt64ToInt53<T[K]> };

/**
 * Contains all options received from TdLib `updateOption`s
 */
const options: OptionsInt64ToInt53<TdApi.TdOptions>={};

TdLib.registerUpdateHandler<TdApi.td_updateOption>('updateOption', function (update) {
    switch (update.value['@type']) {
        case 'optionValueInteger':
            options[update.name] = Number(update.value.value);
            break;
        case 'optionValueBoolean':
            options[update.name] = update.value.value;
            break;
        case 'optionValueString':
            options[update.name] = update.value.value;
            break;
        case 'optionValueEmpty':
            options[update.name] = undefined;
            break;
    }
});

export default options;
