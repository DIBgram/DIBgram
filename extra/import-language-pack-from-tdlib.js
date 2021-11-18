/** Downloads the english language pack using TDLib and converts it to JSON.
 * 
 * How to use:
 * 1. Clone DIBgram and run it in development mode. (instructions in BUILDING.md)
 * 2. Open DIBgram in your browser (localhost:3000). 
 * 3. Open the console in your browser.
 * 4. Run the code below.
 */

sendQuery({
    '@type': 'getLanguagePackStrings',
    language_pack_id: 'en',
}).then(res => {
    var result= {};

    for(const string of res.strings) {
        switch(string.value['@type']) {
        case 'languagePackStringValueOrdinary':
            result[string.key] = string.value.value;
            break;
        case 'languagePackStringValuePluralized':
            if(string.value.zero_value ) { result[string.key+'#zero' ] = string.value.zero_value ; }
            if(string.value.one_value  ) { result[string.key+'#one'  ] = string.value.one_value  ; }
            if(string.value.two_value  ) { result[string.key+'#two'  ] = string.value.two_value  ; }
            if(string.value.few_value  ) { result[string.key+'#few'  ] = string.value.few_value  ; }
            if(string.value.many_value ) { result[string.key+'#many' ] = string.value.many_value ; }
            if(string.value.other_value) { result[string.key+'#other'] = string.value.other_value; }
            break;
        }
    }
    let order= window.prompt('Please paste the content of the JSON generated from lang.strings. This is to ensure that strings are outputted in the correct order.');
    if(order) {
        // Read the previous JSON file and reorder the result to match the order of the previous JSON file.
        order= JSON.parse(order);
        const newResult= {};
        for(const key in order) {
            newResult[key] = result[key];
        }
        result= newResult;
    }
    console.log(JSON.stringify(result, null, 4));
});