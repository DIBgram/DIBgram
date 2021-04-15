import TdLib from './tdlib';

var options={};

TdLib.registerUpdateHandler('updateOption', function (update) {
    options[update.name]=update.value.value;
});

export default options;
