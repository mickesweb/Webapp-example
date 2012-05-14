// Handling swipe.
$('div.ui-page').live("swipeleft", function(){
    // If we are at "Skapa bild" page.
    if($(this).attr("id") == "page1") {
        $("#rightPanel").removeClass("hidden");
    }
    // If we are at "karta" page.
    if($(this).attr("id") == "page4") {
        // Get next page.
        var nextpage = $(this).next('div[data-role="page"]');
        // Change to the next page.  
        $.mobile.changePage(nextpage, {
            transition: 'slide'
        });
    }
});

$('div.ui-page').live("swiperight", function(){
    // If we are at "Skapa bild" page.
    if($(this).attr("id") == "page1") {
        $("#rightPanel").addClass("hidden");
    }
    // If we are at "twitter" page.
    if($(this).attr("id") == "page5") {
        // Get previous page.
        var prevpage = $(this).prev('div[data-role="page"]');
        // Change to the next page.  
        $.mobile.changePage(prevpage, {
            transition: 'slide',
            reverse: true
        });
    }
});