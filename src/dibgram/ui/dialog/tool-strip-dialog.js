import React from 'react';
import PropTypes from 'prop-types';
import { removeDialog } from './dialogs';
import Dialog from './dialog';
import ToolStrip from '../tool-strip/tool-strip';
import ScrollView from '../scroll/scrollbar';

/**
 * Renders a modal dialog
 * Use React ref to access the `close()` method.
 */
export default class ToolStripDialog extends React.Component{
    static propTypes= {
        children: PropTypes.node.isRequired,
        /** Dialog width in CSS format */
        width: PropTypes.string,
        /** Unique ID of this dialog, used to close it. */
        id: PropTypes.any.isRequired,
        className: PropTypes.string,
        title: PropTypes.string
    };

    state = {
        closing: false
    }
    ref = React.createRef();

    /** @param {React.SyntheticEvent} e */
    onClick(e){
        if (e.target === this.ref.current) {
            this.close();
        }
    }

    render(){
        return (
            <Dialog className="tool-strip-dialog" id={this.props.id} ref={this.dialogRef} width={this.props.width || '400px'}>
                <h2>{this.props.title}</h2>
                <ScrollView>
                    <div className="scroll-content">
                        <div className="options">
                            <ToolStrip.Section>
                                <ToolStrip.Button text="Test button" />
                                {this.props.children}
                                <ToolStrip.ToggleButton text="Test toggle button" />
                            </ToolStrip.Section>
                        </div>
                    </div>
                </ScrollView>
            </Dialog>
        );
    }

    close(){
        this.setState({
            closing: true
        });
        setTimeout(() => {
            removeDialog(this.props.id);
        }, 1000);
    }
}
