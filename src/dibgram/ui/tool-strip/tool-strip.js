/**
 * There are 3 ways to import the items
 * 1. import each component from the respective file
 * 2. import each component from tool-strip.js
 * 3. import the default export from tool-strip.js and access the object members
 * You can use whichever you want.
 */

import ToolStripButton from './button';
import ToolStripSection from './section';
import ToolStripToggleButton from './toggle-button';

/**
 * A collection of different components to create a generic menu.
 * 
 * Contains sections, menu-items, two kinds of separators, switches, check-boxes, etc.s
 */
const ToolStrip = {
    Button: ToolStripButton,
    Section: ToolStripSection,
    ToggleButton: ToolStripToggleButton
};
export default ToolStrip;
export { ToolStripButton, ToolStripSection, ToolStripToggleButton };
