$(document).ready(function() {
    $("#search-form").submit(function(event) {
        event.preventDefault();
        var userInput = $("#query").val();
        if (userInput == 0) {
            alert('Please type a search term!');
        } else {
            getResults(userInput);
        };
    });

function spotifyApiCall(userInput){

}

function itunesApiCall(userInput){

}

function soundcloudApiCall(userInput){

}

function youtubeApiCall(userInput){

}

function googleApiCall(userInput){

}
