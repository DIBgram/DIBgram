import React from 'react';
import { connect } from 'react-redux';
import { createStore } from 'redux';

export var dialogStore= createStore(
    /**
     * @param {any[]} state
     * @param {Object} action
     */
    function (state= [], action) {
        switch (action.type) {
        case 'ADD_DIALOG':
            return [
                ...state,
                action.dialog
            ];
        
        case 'REMOVE_DIALOG':
            return state.filter(value => value.id!=action.id);
        
        default:
            break;
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export function addDialog(id, dialog) {
    dialogStore.dispatch({
        type: 'ADD_DIALOG',
        dialog: {
            element: dialog,
            id: id
        }
    });
}

export function removeDialog(id) {
    dialogStore.dispatch({
        type: 'REMOVE_DIALOG',
        id: id
    });
}

function Wrapper(props){
    return props.children;
}
const Dialogs= (connect(function (state) {
    return {dialogs: state || []};
})(function (props) {
    return props.dialogs.map(el => <Wrapper key={el.id}>{el.element}</Wrapper>) || null;
}));

export default Dialogs;