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
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export function addDialog(id, dialog) {
    dialogStore.dispatch({
        type: 'ADD_DIALOG',
        dialog: {
            element: dialog,
            id: id
        }
    });
}

const Dialogs= (connect(function (state) {
    return {dialogs: state || []};
})(function (props) {
    return props.dialogs.map(el => el.element) || null;
}));

export default Dialogs;