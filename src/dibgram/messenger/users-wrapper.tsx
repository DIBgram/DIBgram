import React from 'react';
import usersStore, { UsersStoreAction, UsersStoreState } from './users-store';
import { Provider, connect } from 'react-redux';
import { Dispatch } from 'redux';
/**
 * A React higher order component that provides the `users` prop to the wrapped component.
 */
export default function withUsers<P extends {users: UsersStoreState, dispatch?: Dispatch<UsersStoreAction>}>(Component: React.ComponentType<P>): React.ComponentType<Omit<P, 'users'|'dispatch'>> {
    const WrappedComponent= connect<{users: UsersStoreState}, unknown, Omit<P, 'users'|'dispatch'>, UsersStoreState>(users => ({users}))(Component as any);
    return function WithUsers(props) {
        return (
            <Provider store={usersStore}>
                <WrappedComponent {...props} />
            </Provider>
        );
    };
}
