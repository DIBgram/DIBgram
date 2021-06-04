import { connect } from 'react-redux';
import { createStore } from 'redux';

export var dialogStore= createStore(function (state= [], action) {
    switch (action.type) {
    case 'ADD_DIALOG':
        return [
            ...state,
            action.dialog
        ];
    
    default:
        break;
    }
});

export function addDialog(dialog) {
    dialogStore.dispatch({
        type: 'ADD_DIALOG',
        dialog: dialog
    });
}

const Dialogs= (connect(function (state) {
    return {dialogs: state};
})(function (props) {
    return props.dialogs || null;
}));

export default Dialogs;