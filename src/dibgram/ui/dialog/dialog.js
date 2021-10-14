import React from 'react';
import PropTypes from 'prop-types';
import { removeDialog } from './dialogs';
/**
 * Renders a modal dialog
 * Use React ref to access the `close()` method.
 */
export default class Dialog extends React.Component{
    static propTypes= {
        children: PropTypes.node.isRequired,
        /** Dialog width in CSS format */
        width: PropTypes.string,
        /** Unique ID of this dialog, used to close it. */
        id: PropTypes.any.isRequired,
        className: PropTypes.string
    };
    state= {
        closing: false
    }
    render(){
        return (
            <div className={'modal-dialog' + ((this.state.closing) ? ' closing ' : ' ') + this.props.className}>
                <div style={{
                    'width': this.props.width || 'auto'
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
    close=  ()=>{
        this.setState({
            closing: true
        });
        setTimeout(() => {
            removeDialog(this.props.id);
        }, 1000);
    }
}
