$(document).ready(function() {
            $("#results").hide();
            $("#spotify-results").on("click", function(){
              $("#spotify").show();
              $("#spotify-tab").show();
              $("#youtube").hide();
              $("#youtube-tab").hide();
            });
            $("#youtube-results").on("click", function(){
              $("#youtube").show();
              $("#youtube-tab").show();
              $("#spotify").hide();
              $("#spotify-tab").hide();
              $("#spotify-results").removeClass("active");
            });
            $(document).keypress(function(e) {
              if(e.which == 13) {
                event.preventDefault();
                var userInput = $("#query").val();
                if (userInput == 0) {
                    alert('Please type a search term!');
                } else {
                    spotifyApiCall(userInput);
                    youtubeApiCall(userInput);
                    $("#spotify").show();
                    $("#youtube").hide();
                    $("#youtube-tab").hide();
                };
              }
            });
            $("#search-form").submit(function(event) {
                event.preventDefault();
                var userInput = $("#query").val();
                if (userInput == 0) {
                    alert('Please type a search term!');
                } else {
                    spotifyApiCall(userInput);
                    youtubeApiCall(userInput);
                    $("#spotify").show();
                    $("#youtube").hide();
                    $("#youtube-tab").hide();
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
                        if (receivedApiData.tracks.total == 0) {
                            alert("Not found!");
                        } else {
                            displaySpotifyResults(receivedApiData.tracks.items);
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
                            displayYoutubeResults(receivedApiData.items);
                        }
                    });
                  }

            function displaySpotifyResults(tracksArray) {
              $("#results").show();
              var html = "";
              var i = 1;
              $.each(tracksArray, function(tracksArrayKey, tracksArrayValue) {
                html += "<tr>"
                html += '<th>' + i++ + "</th>";
                html += "<td>" + tracksArrayValue.name + "</td>";
                html += "<td>" + tracksArrayValue.artists[0].name + "</td>";
                html += "<td>" + "<a href='http://open.spotify.com/track/"+ tracksArrayValue.id + "'target='_blank'>" + "Play" + "</href>" + "</td>";
                html += "</tr>";
              });
              $("#results table #spotify").html(html);
            }
            function displayYoutubeResults(videosArray) {
              var html = "";
              var i = 1;
              $.each(videosArray, function(videosArrayKey, videosArrayValue) {
                html += "<tr>"
                html += '<th>' + i++ + "</th>";
                html += "<td>" + videosArrayValue.snippet.title + "</td>";
                html += "<td>" + videosArrayValue.snippet.channelTitle + "</td>";
                html += "<td>" + "<a href='https://www.youtube.com/watch?v="+ videosArrayValue.id.videoId + "'target='_blank'>" + "Play" + "</href>" + "</td>";
                html += "</tr>";
              });
              $("#results table #youtube").html(html);
            }
});
