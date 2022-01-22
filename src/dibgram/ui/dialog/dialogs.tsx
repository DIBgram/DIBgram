import React from 'react';
import { connect } from 'react-redux';
import { createStore } from 'redux';

type CanBeDialog= any;
type DialogStoreState= CanBeDialog[];

type DialogStoreAction_AddDialog= {
    type: 'ADD_DIALOG';
    dialog: CanBeDialog;
}
type DialogStoreAction_RemoveDialog= {
    type: 'REMOVE_DIALOG';
    id: string;
}
type DialogStoreAction= DialogStoreAction_AddDialog | DialogStoreAction_RemoveDialog;

/**
 * A redux store which state is an array of objects with {id: unique ID of dialog, element: react element of the dialog}
 */
export const dialogStore= createStore<DialogStoreState, DialogStoreAction, any, any> (
    function (state: DialogStoreState= [], action: DialogStoreAction): DialogStoreState {
        switch (action.type) {
            case 'ADD_DIALOG':
                return [
                    ...state,
                    action.dialog
                ];
            
            case 'REMOVE_DIALOG':
                return state.filter(value =>value.id!=action.id);
            
            default:
                return state;
        }
    },
    (window as any).__REDUX_DEVTOOLS_EXTENSION__?.());

/**
 * Opens a dialog
 * @param id A unique ID for the dialog
 * @param dialog The dialog React element
 */
export function addDialog(id: string, dialog: CanBeDialog): void {
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
 * @param id The dialog unique ID
 */
export function removeDialog(id: string): void {
    dialogStore.dispatch({
        type: 'REMOVE_DIALOG',
        id: id
    });
}
type DialogsProps= {
    // dialogs: DialogStoreState;
    // dispatch: (action: DialogStoreAction) => void;
    [key: string]: any;
}

/**
 * Renders all dialogs.
 */
const Dialogs= (connect<{dialogs: DialogStoreState}, unknown, DialogsProps, DialogStoreState>(
    function (state) {
        return {dialogs: state || []};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    })(function Dialogs({dialogs, dispatch, ...rest}: DialogsProps): JSX.Element {
    return (
        <div data-dialog={!!dialogs.length} {...rest}>
            {dialogs.map((el: CanBeDialog) => <React.Fragment key={el.id}>{(el as any).element}</React.Fragment>) || null}
        </div>
    );
}
));

export default Dialogs;