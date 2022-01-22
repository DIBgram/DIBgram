import React from 'react';
import SmallButton from '../elements/small-button';
import Dialog from './dialog';
import __ from '../../language-pack/language-pack';

type ConfirmDialogProps = {
    children: React.ReactNode;
    /** Dialog width in CSS format */
    width?: string;
    /** Dialog header */
    title?: React.ReactNode;
    /** Text content of the OK button*/
    OKButtonText?: React.ReactNode;
    /** Pass true to only show the OK button */
    hideCancelButton?: boolean;
    /** Unique ID of this dialog, used to close it. */
    id: string;
    /** Called when the OK button is pressed */
    onOK?: () => void;
    /** Called when the cancel button is pressed */
    onCancel?: () => void;
    /** Third button text (optional) */
    thirdButton?: React.ReactNode;
    /** Pass true if third button click closes dialog */
    thirdButtonClosesDialog?: boolean;
    /** Called when third button is pressed */
    onThirdButtonClick?: () => void;
    /** If true, the OK button will become red, meaning the user should pay attention */
    attention?: boolean;
    /** If true, the dialog text will be larger */
    largeFont?: boolean;
};

/**
 * Renders a modal dialog with a title and cancel and OK button. OK button text can be changed.
 */
export default class ConfirmDialog extends React.Component<ConfirmDialogProps> {
    dialogRef = React.createRef<Dialog>();
    handleOK= (): void=> {
        this.dialogRef.current?.close();
        this.props.onOK && this.props.onOK();
    }
    handleCancel= (): void=> {
        this.dialogRef.current?.close();
        this.props.onCancel && this.props.onCancel();
    }
    handleButton= (handler: (()=> void) | undefined): void=> {
        this.dialogRef.current?.close();
        handler && handler();
    }
    render(): JSX.Element {
        return (
            <Dialog className="confirm-dialog" id={this.props.id} ref={this.dialogRef} width={this.props.width || '320px'}>
                <h1>{this.props.title || ''}</h1>
                <div className={'content' + (this.props.largeFont? ' large-font' : '')}>
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
                            {__('lng_cancel')}
                        </SmallButton>
                    )}
                    <SmallButton onClick={()=>this.handleButton(this.props.onOK)} attention={this.props.attention}>
                        {this.props.OKButtonText || __('lng_box_ok')}
                    </SmallButton>
                </div>
            </Dialog>
        );
    }
}
