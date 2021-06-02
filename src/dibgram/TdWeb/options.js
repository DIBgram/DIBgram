import TdLib from './tdlib';

/**
 * Contains all options received from TdLib `updateOption`s
 */
var options={};

TdLib.registerUpdateHandler('updateOption', function (update) {
    options[update.name]=update.value.value;
});

export default options;
