// https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice
Array.prototype.remove = function (item) {
    for( var i = 0; i < this.length; i++){ 
        if ( this[i] === item) { 
            this.splice(i, 1); 
        }
    }
};

export default Array.prototype.remove;