import React from 'react';
import { connect } from 'react-redux';
import { createStore } from 'redux';

/**
 * A redux store which state is an array of objects with {id: unique ID of dialog, element: react element of the dialog}
 */
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

/**
 * Opens a dialog
 * @param {string} id A unique ID for the dialog
 * @param {React.ReactElement} dialog The dialog React element
 */
export function addDialog(id, dialog) {
    dialogStore.dispatch({
        type: 'ADD_DIALOG',
        dialog: {
            element: dialog,
            id: id
        }
    });
}

/**
 * Closes an existing dialog
 * @param {string} id The dialog unique ID
 */
export function removeDialog(id) {
    dialogStore.dispatch({
        type: 'REMOVE_DIALOG',
        id: id
    });
}

/**
 * Renders all dialogs.
 */
const Dialogs= (connect(function (state) {
    return {dialogs: state || []};
})(function Dialogs({dialogs, ...rest}) {
    return (
        <div data-dialog={!!dialogs.length} {...rest}>
            {dialogs.map(el => <React.Fragment key={el.id}>{el.element}</React.Fragment>) || null}
        </div>
    );
}));

export default Dialogs;