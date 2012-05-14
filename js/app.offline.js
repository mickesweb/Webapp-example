$(function(){
    if (navigator.onLine) {
        // The device is online.
        $('.online').show();
    } else {
        // The device is offline, hide some functionality.
        $('.online').hide();
    }
})