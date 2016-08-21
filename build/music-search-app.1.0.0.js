/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	$(document).ready(function () {
	    $("#results").hide();
	    $("#spotify-results").on("click", function () {
	        $("#spotify").show();
	        $("#spotify-tab").show();
	        $("#youtube").hide();
	        $("#youtube-tab").hide();
	        $("#youtube-results").removeClass("active");
	        $("#spotify-results").addClass("active");
	    });
	    $("#youtube-results").on("click", function () {
	        $("#youtube").show();
	        $("#youtube-tab").show();
	        $("#spotify").hide();
	        $("#spotify-tab").hide();
	        $("#spotify-results").removeClass("active");
	        $("#youtube-results").addClass("active");
	    });
	    $(document).keypress(function (e) {
	        if (e.which == 13) {
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
	    $("#search-form").submit(function (event) {
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
	            type: "track"
	        }, function (receivedApiData) {
	            console.log(receivedApiData);
	            if (receivedApiData.tracks.total == 0) {
	                alert("No Results for Spotify!");
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
	        }, function (receivedApiData) {
	            console.log(receivedApiData);
	            if (receivedApiData.pageInfo.totalResults == 0) {
	                alert("No results for YouTube!");
	            } else {
	                displayYoutubeResults(receivedApiData.items);
	            }
	        });
	    }

	    function displaySpotifyResults(tracksArray) {
	        $("#results").show();
	        var html = "";
	        var i = 1;
	        $.each(tracksArray, function (tracksArrayKey, tracksArrayValue) {
	            html += "<tr>";
	            html += '<th>' + i++ + "</th>";
	            html += "<td>" + tracksArrayValue.name + "</td>";
	            html += "<td>" + tracksArrayValue.artists[0].name + "</td>";
	            html += "<td>" + "<a href='http://open.spotify.com/track/" + tracksArrayValue.id + "'target='_blank'>" + "Play" + "</href>" + "</td>";
	            html += "</tr>";
	        });
	        $("#results table #spotify").html(html).fadeIn("slow");
	    }
	    function displayYoutubeResults(videosArray) {
	        var html = "";
	        var i = 1;
	        $.each(videosArray, function (videosArrayKey, videosArrayValue) {
	            html += "<tr>";
	            html += '<th>' + i++ + "</th>";
	            html += "<td>" + videosArrayValue.snippet.title + "</td>";
	            html += "<td>" + videosArrayValue.snippet.channelTitle + "</td>";
	            html += "<td>" + "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "'target='_blank'>" + "Play" + "</href>" + "</td>";
	            html += "</tr>";
	        });
	        $("#results table #youtube").html(html).fadeIn("slow");
	    }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=music-search-app.1.0.0.js.map
