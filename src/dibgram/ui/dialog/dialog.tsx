import React from 'react';
import { removeDialog } from './dialogs';

type DialogProps= {
    children: React.ReactNode;
    /** Dialog width in CSS format */
    width?: string;
    /** Unique ID of this dialog, used to close it. */
    id: string;
    className?: string;
}
type DialogState= {
    closing: boolean;
}

/**
 * Renders a modal dialog
 * Use React ref to access the `close()` method.
 */
export default class Dialog extends React.Component<DialogProps, DialogState> {
    state= {
        closing: false
    }

    ref = React.createRef<HTMLDivElement>();

    /** @param {React.SyntheticEvent} e */
    onClick= (e: React.SyntheticEvent): void => {
        if (e.target === this.ref.current) {
            this.close();
        }
    }

    render(): JSX.Element {
        return (
            <div ref={this.ref} onClick={this.onClick} id={this.props.id} className={'modal-dialog' + ((this.state.closing) ? ' closing ' : ' ') + this.props.className}>
                <div style={{
                    'width': this.props.width || 'auto'
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
    
    close= (): void=> {
        this.setState({
            closing: true
        });
        setTimeout(() => {
            removeDialog(this.props.id);
        }, 1000);
    }
}
