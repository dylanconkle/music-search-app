$(document).ready(function() {
            $("#search-form").submit(function(event) {
                event.preventDefault();
                var userInput = $("#query").val();
                if (userInput == 0) {
                    alert('Please type a search term!');
                } else {
                    spotifyApiCall(userInput);
                    youtubeApiCall(userInput);
                };
            });

            function spotifyApiCall(userSearchTerm) {
                $.getJSON("https://api.spotify.com/v1/search", {
                        q: userSearchTerm,
                        limit: 20,
                        type: "track",
                    },
                    function(receivedApiData) {
                        console.log(receivedApiData);
                        if (receivedApiData.pageInfo.totalResults == 0) {
                            alert("Not found!");
                        } else {
                            displaySearchResults(receivedApiData.items);
                        }
                    });
                  }

            function youtubeApiCall(userSearchTerm) {
                $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                        part: "snippet",
                        maxResults: 20,
                        key: "AIzaSyD7y-IwGNkpZIIwE5K8IymLFM6HZAYNsiY",
                        q: userSearchTerm,
                        type: "video"
                    },
                    function(receivedApiData) {
                        console.log(receivedApiData);
                        if (receivedApiData.pageInfo.totalResults == 0) {
                            alert("Not found!");
                        } else {
                            displaySearchResults(receivedApiData.items);
                        }
                    });
                  }
});
