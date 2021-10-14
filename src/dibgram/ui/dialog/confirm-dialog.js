import React from 'react';
import PropTypes from 'prop-types';
import SmallButton from '../elements/small-button';
import Dialog from './dialog';
/**
 * Renders a modal dialog with a title and cancel and OK button. OK button text can be changed.
 */
export default class ConfirmDialog extends React.Component{
    dialogRef = React.createRef();
    handleOK =()=>{
        this.dialogRef.current.close();
        this.props.onOK && this.props.onOK();
    }
    handleCancel =()=>{ //TODO: Clicking outside of the dialog should close it
        this.dialogRef.current.close();
        this.props.onCancel && this.props.onCancel();
    }
    handleButton =(handler)=>{
        this.dialogRef.current.close();
        handler && handler();
    }
    render() {
        return (
            <Dialog className="confirm-dialog" id={this.props.id} ref={this.dialogRef} width={this.props.width || '320px'}>
                <h1>{this.props.title || ''}</h1>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="options">
                    {this.props.thirdButton ?  (
                        <SmallButton 
                            className="small-button left"
                            style={{'float': 'left'}}
                            onClick={ this.props.thirdButtonClosesDialog ?
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
                    <SmallButton onClick={()=>this.handleButton(this.props.onOK)} attention={this.props.attention}>
                        {this.props.OKButtonText || 'OK'}
                    </SmallButton>
                </div>
            </Dialog>
        );
    }
}
ConfirmDialog.propTypes= {
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
    onThirdButtonClick: PropTypes.func,
    /** If true, the OK button will become red, meaning the user should pay attention */
    attention: PropTypes.bool
};
