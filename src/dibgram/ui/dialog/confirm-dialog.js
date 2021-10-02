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
        onCancel: PropTypes.func,
        /** Third button text (optional) */
        thirdButton: PropTypes.string,
        /** Pass true if third button click closes dialog */
        thirdButtonClosesDialog: PropTypes.bool,
        /** Called when third button is pressed */
        onThirdButtonClick: PropTypes.func
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
    handleButton =(handler)=>{
        this.closeDialog();
        handler && handler();
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
                        {this.props.thirdButton ?  (
                            <SmallButton 
                                className="small-button left"
                                style={{'float': 'left'}}
                                onClick={
                                    this.props.thirdButtonClosesDialog ?
                                        ()=>this.handleButton(this.props.onThirdButtonClick)
                                        : this.props.onThirdButtonClick}>
                                {this.props.thirdButton}
                            </SmallButton>
                        ) : null}
                        {this.props.hideCancelButton ? null : (
                            <SmallButton onClick={()=>this.handleButton(this.props.onCancel)}>
                                Cancel
                            </SmallButton>
                        )}
                        <SmallButton onClick={()=>this.handleButton(this.props.onOK)}>
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
