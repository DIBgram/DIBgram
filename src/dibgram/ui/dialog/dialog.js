import React from 'react';
import PropTypes from 'prop-types';
import { removeDialog } from './dialogs';
/**
 * Renders a modal dialog
 */
export default class Dialog extends React.Component{
    static propTypes= {
        children: PropTypes.node.isRequired,
        /** Dialog width in CSS format */
        width: PropTypes.string,
        /** Unique ID of this dialog, used to close it. */
        id: PropTypes.any.isRequired,
        /** This function is called immediately after mount, a function argument is provided to it.
         *  You need to store the argument somewhere and call it to close the dialog.
         *  Using `removeDialog` will not render any transition. */
        receiveCloseFunction: PropTypes.func
    };
    state= {
        closing: false
    }
    render(){
        return (
            <div className={'modal-dialog' + ((this.state.closing) ? ' closing' : '')}>
                <div style={{
                    'width': this.props.width || 'auto'
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
    componentDidMount() { // Transfer onClose to the parent
        this.props.receiveCloseFunction && this.props.receiveCloseFunction( ()=>{
            this.setState({
                closing: true
            });
            setTimeout(() => {
                removeDialog(this.props.id);
            }, 1000);
        });
    }
}
