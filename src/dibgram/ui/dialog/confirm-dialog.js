import React from 'react';
import PropTypes from 'prop-types';
import SmallButton from '../elements/small-button';
import { removeDialog } from './dialogs';
/**
 * Renders a modal dialog with a title and cancel and OK button. OK button text can be changed.
 */
export default class ConfirmDialog extends React.Component{
    static propTypes= {
        children: PropTypes.node.isRequired,
        /** Dialog width in CSS format */
        width: PropTypes.string,
        /** Dialog header */
        title: PropTypes.string,
        /** Text content of the OK button*/
        OKButtonText: PropTypes.string,
        /** Pass true to only show the OK button */
        hideCancelButton: PropTypes.bool,
        /** Unique ID of this dialog, used to close it. */
        id: PropTypes.any.isRequired,
        /** Called when the OK button is pressed */
        onOK: PropTypes.func,
        /** Called when the cancel button is pressed */
        onCancel: PropTypes.func
    };
    state= {
        closing: false
    }
    handleOK =()=>{
        this.closeDialog();
        this.props.onOK && this.props.onOK();
    }
    handleCancel =()=>{
        this.closeDialog();
        this.props.onCancel && this.props.onCancel();
    }
    render() {
        return (
            <div className={'modal-dialog confirm-dialog' + ((this.state.closing) ? ' closing' : '')}>
                <div style={{
                    'width': this.props.width || 'auto'
                }}>
                    <h1>{this.props.title || ''}</h1>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <div className="options">
                        {this.props.hideCancelButton ? null : (
                            <SmallButton onClick={this.handleCancel}>
                                Cancel
                            </SmallButton>
                        )}
                        <SmallButton onClick={this.handleOK}>
                            {this.props.OKButtonText || 'OK'}
                        </SmallButton>
                    </div>
                </div>
            </div>
        );
    }
    
    closeDialog= ()=>{
        this.setState({
            closing: true
        });
        setTimeout(() => {
            removeDialog(this.props.id);
        }, 1000);
    }
}
