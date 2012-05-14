$(document).bind("mobileinit", function() {
    // Add so the "back button" will be added automatically.
    $.mobile.page.prototype.options.addBackBtn = true;
    // Turn off transition effects. 
    $.mobile.defaultPageTransition = 'none';
});