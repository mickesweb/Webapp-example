$(document).ready(function(){
    // Triggered when the twitter button is pushed.
    $('#tweetButton').on('click', function(){
        // Get the twitter username.
        var user = $("#twitterUser").val();
        if(user != ""){
            $("#tweets").html('');
            $.mobile.showPageLoadingMsg();
            // Get all tweets from twitter through the API.
            $.getJSON('http://twitter.com/status/user_timeline/'+user+'.json?count=10&callback=?', function(data){
                // Loop through all tweets and add them to a list.
                $.each(data, function(index, item){
                    var screenname = item.user.screen_name;
                    var tweet = item.text;
                    var images = item.user.profile_image_url;
                    var createdDate = new Date(item.created_at);
                    var dateString = createdDate.getDate() + "/" + (createdDate.getMonth()+1) + " - " + createdDate.getFullYear() + " kl: " + createdDate.getHours() + ":" + createdDate.getMinutes();
                    // create list item template
                    $("#tweets").append('<li><a href="#"><img style="margin: 1em;" src="'+images+'" /><h3>'+screenname+'</h3><p style="white-space: normal;">'+ tweet +'</p><p class="light-text">'+ dateString +'</p></a></li>');
                    // Refresh list so jquery mobile can apply iphone look to the list
                    $("#tweets").listview();
                    $("#tweets").listview("refresh");		
                });
                $.mobile.hidePageLoadingMsg();
            });
        }
    });
});