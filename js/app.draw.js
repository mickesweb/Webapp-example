$(document).ready(function() {
    // Initialize the database.
    initDB();
    // Create canvas so it covers the entire screen.
    var width = $(document).width() - 5;
    var height = $(document).height() - $("#header").height() - 10;
    $("#canvas").attr('width', width);
    $("#canvas").attr('height', height);

    // Check if the browser/device support canvas element.
    if(Modernizr.canvas) {
        // Default values.
        var paintType = "brush";
        var mouseDown = false;
        var posX, posY = "";
        var canvas = document.getElementById("canvas");
        var canvasContext = canvas.getContext("2d");
        canvasContext.strokeStyle = "black";
        canvasContext.lineWidth = 10;
        canvasContext.lineCap = "round";
        canvasContext.fillStyle = "#fff";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        /* Futures functions.   
            $("#brush").on("click", function() {
                paintType = "brush";
            });

            $("#fill").on("click", function() {
                paintType = "fill";
            });
        */

        // Change pen size.
        $("#brushSize").bind("change", function() {
            canvasContext.lineWidth = $(this).val();
        });

        // change draw color.
        $("#selectedColor").bind("change", function() {
            canvasContext.strokeStyle = $(this).val();
        });
        $("#colorMenu > div").on("click", function() {
            canvasContext.strokeStyle = $(this).css("background-color");
            $("#selectedColor").val(colorToHex($(this).css("background-color")));
        });

        // Clear all settings and empty the canvas.
        $("#clear").on("click", function() {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            $("#selectedColor").val("#000000");
            canvasContext.strokeStyle = "black";
            canvasContext.fillStyle = "black";
            canvasContext.lineWidth = 10;
            $("#brushSize").val(canvasContext.lineWidth);
            paintType = "brush";
        });

        // Called when someone want to draw or do something else at the canvas.
        $("#canvas").on("touchstart mousedown", function(canvasEvent) {
            // Fixes so you get control of touchevents.
            canvasEvent.preventDefault();
            // Handler  all function and call the function who is active.
            switch(paintType) {
                case "fill" :
                    fill(this,canvasEvent);
                    break;
                case "brush" :
                default :
                    brush(this,canvasEvent);
                    break;
            }
        });

        // The user stop tauch the screen, end the tauch move function.
        $(document).on("touchend mouseup", function() {
            $(document).off("touchmove mousemove");
        });

        /* Manage pen/brush drawing.
        * Input:
        *      @param object canvasObject
        *      @param object canvasEvent
        * @return NO
        */
        function brush(canvasObject,canvasEvent) {
            // Get position for mous or finger.
            var point = getCursorPosition(canvasEvent)
            var offset = $(canvasObject).offset();
            posX = point.x - offset.left;
            posY = point.y - offset.top;
            // start a moveevent and draw.
            $(document).on("touchmove mousemove", function(canvasEvent) {
                canvasContext.beginPath();
                point = getCursorPosition(canvasEvent);
                canvasContext.moveTo(point.x - offset.left, point.y - offset.top);
                canvasContext.lineTo(posX, posY);
                canvasContext.stroke();
                canvasContext.closePath();
                posX = point.x - offset.left;
                posY = point.y - offset.top;
            });
        }

        /* Futures functions. */
        function fill(caThis,canvas) {
        // TODO: implement so you can fill an area with color.
        }

        // Save image to database.
        $("#save").on("click", function() {
            $.mobile.showPageLoadingMsg();
            // Create a image from canvas object.
            var canvasNote = canvas.toDataURL('image/png');
            // Check if the browser/device support this database type.
            if(Modernizr.websqldatabase) {
                // Save image with timestamp to database.
                database.transaction(function(tx) {
                    tx.executeSql('INSERT INTO images (image, added) values (?, ?)', [canvasNote, new Date()]);
                });
            } else {
            // TODO: implement a other database.
            //       use localStorage, supported by more browser?
            //localStorage.setItem('images', canvasNote);
            //localStorage.setItem('timestamp', (new Date()).getTime());
            }  
            $.mobile.hidePageLoadingMsg();
        });


        $("#loadData").on("click", function() {
            $("#images").html('');
            $.mobile.showPageLoadingMsg();
            // Check if the browser/device support this database type.
            if(Modernizr.websqldatabase) {
                database.transaction(function(tx) {
                    tx.executeSql('SELECT * FROM images ORDER BY id DESC', [], function(tx, result) {
                        for(var i=0; i<result.rows.length; i++) {
                            var item = result.rows.item(i);
                            // Get the image source.
                            var imageSrc = item['image'];
                            // Get add date and format it.
                            var addDate = new Date(item['added']);
                            var dateString = addDate.getDate() + "/" + (addDate.getMonth()+1) + " - " + addDate.getFullYear() + " kl: " + addDate.getHours() + ":" + addDate.getMinutes();
                            // Create a new list element with image info.
                            var newLi = $("<li>").append('<a href="#page1"><img style="margin: 1em; width: 100px;" src="'+imageSrc+'" /><h3>id: '+item['id']+'</h3><p>Skapad: '+dateString+'</p></a>').click(function() {
                                /* If you choose clicking on an listelement, the image is 
                                        loaded into the canvas, so you can continue editing it. */
                                canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                                var images = new Image();
                                images.src = $(this).find("img").attr("src");
                                canvasContext.drawImage(images,0,0);
                            });

                            $("#images").append(newLi);
                            // Refresh list so jquery mobile can apply mobile look to the list.
                            $("#images").listview();
                            $("#images").listview("refresh");	
                        }
                    });
                });
            } else {
            // TODO: implement a other database.
            }
            $.mobile.hidePageLoadingMsg();
        });
    } else {
        alert("No support for canvas");
        console.log('No support for canvas');
    }
});
