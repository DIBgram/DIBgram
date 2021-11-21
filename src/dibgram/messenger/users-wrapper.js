import React from 'react';
import usersStore from './users-store';
import { Provider, connect } from 'react-redux';
/**
 * A React higher order component that provides the `users` prop to the wrapped component.
 */
export default function withUsers(Component) {
    const WrappedComponent= connect(users => ({users}))(Component);
    return function WithUsers(props) {
        return (
            <Provider store={usersStore}>
                <WrappedComponent {...props} />
            </Provider>
        );
    };
}