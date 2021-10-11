// https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice
/**
 * Removes an item from an array
 * @param {*} item The item to remove
 */
export default function removeItemFromArray(item) {
    for( var i = 0; i < this.length; i++){ 
        if ( this[i] === item) { 
            this.splice(i, 1); 
        }
    }
}

Array.prototype.remove= removeItemFromArray;