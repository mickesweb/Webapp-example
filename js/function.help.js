/* Return position for the curor or finger, x and y.
 * Input:
 *      @param object e
 * @return array
 */
function getCursorPosition(e) {
    var x, y;
    if(e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.originalEvent.touches[0].pageX;
        y = e.originalEvent.touches[0].pageY;	
    }
    var Point = {
        x: x,
        y: y
    };
    
    return Point;
}

/* Convert color to hex-color.
 * Input:
 *      @param string color
 * @return string
 */
function colorToHex(color) {
    // Return if color already is in hex.
    if(color.substr(0, 1) == '#') {
        return color;
    }
    
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    var hexColor = '#' + rgb.toString(16);
    
    return hexColor;
};
