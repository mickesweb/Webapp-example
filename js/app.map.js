var map;
var startMarker;
var trackerPoints = new Array(0);

/* Add a point to the map, and draw a line between the points.
 * Input:
 *      @param float latitude
 *      @param float longitude
 * @return NO
 */
function addPoint(latitude, longitude) {
    // Check so the map is created.
    if (map != null) {
        var latlng = new google.maps.LatLng(latitude, longitude);
        // Add the points to tracker array.
        trackerPoints.push(latlng);
        // Center the map to new point.
        map.panTo(latlng);
        // Draw line between tracker points.
        var track = new google.maps.Polyline({
            path: trackerPoints,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
        });
    } else {
        alert("No map is created");
        console.log('No map is created');
    }
}

/* Print a error message, if something went wrong.
 * Input:
 *      @param exception error
 * @return NO
 */
function navigatorError(error) {
    switch(error.code) {
        case error.TIMEOUT:
            alert("Timeout");
            console.log('Timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Position unavailable");
            console.log('Position unavailable');
            break;
        case error.PERMISSION_DENIED:
            alert("Permission denied");
            console.log('Permission denied');
            break;
        case error.UNKNOWN_ERROR:
            alert("Unknown error");
            console.log('Unknown error');
            break;
    }
}

/* Create a google maps and add a start marker.
 * @return NO
 */
function createMaps() {
    // Check if the browser/device support geolocation.
    if(Modernizr.geolocation) {
        // Create a mapdiv to fit the screen.
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'map';
        mapcanvas.style.width = $(document).width() + 'px';
        mapcanvas.style.height = ($(document).height() - $("#header").height() - 5) + 'px';
        document.querySelector('#maps').appendChild(mapcanvas);
        // Get the current position and crate the map.
        navigator.geolocation.getCurrentPosition(function(position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var options = {
                zoom: 16,
                center: latlng,
                mapTypeControl: false,
                overviewMapControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map"), options);
            // Create start marker and add it to the map.
            var marker = new google.maps.Marker({
                position: latlng,
                title: "start",
                map: map
            });
            // Add start points to tracker array.
            trackerPoints.push(latlng);
        }, navigatorError);
    } else {
        alert("No support for maps and positioning.");
        console.log('No support for maps and positioning.');
    }
}

/* Get the position and add marker to the map. Called when tracking is started.
 * @return NO
 */
function tracking() {
    // Check if the browser/device support geolocation.
    if(Modernizr.geolocation) {
        // Get the position from gps or network.
        navigator.geolocation.getCurrentPosition(function (position) {  
            // Print a marker to google maps.
            addPoint(position.coords.latitude, position.coords.longitude);
        }, navigatorError);
    } else {
        console.log("Not working");
    }
}


$(document).ready(function() {
    var trackId = 0;
    
    $("#myPosition").on("click", function() {
        $("#myPosition").hide();
        $.mobile.showPageLoadingMsg();
        // Create a google maps.
        createMaps();
        // TODO: Displayed only when the map is complete.
        $.mobile.hidePageLoadingMsg();
        $("#startTrack").show();
    // END TODO ------------------------------------
    });
    
    $("#startTrack").on("click", function() {
        $("#startTrack").hide();
        // Start tracking, retrieve data every 3 seconds.
        trackId = setInterval("tracking()", 3000);
        $("#stopTrack").show();
        return false;
    });
    
    $("#stopTrack").on("click", function() {
        $("#stopTrack").hide();
        // Stop tracking.
        clearInterval(trackId);
        $("#startTrack").show();
        return false;
    });
});