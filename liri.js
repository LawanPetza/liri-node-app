// DEPENDENCIES
// =====================================
// Read and set environment variables
require("dotenv").config();

// Import the Twitter NPM package.
var Twitter = require('twitter');

// Import the node-spotify-api NPM package.
var Spotify = require('node-spotify-api');

// Import the API keys
var keys = require("./keys.js");

var client = new Twitter(keys.twitter);

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

// Import the request npm package.
var request = require("request");

// Import the FS package for read/write.
var fs = require("fs");

var action = process.argv[2];

var value = "";
for ( var i = 3; i < process.argv.length; i++){
    value = value + process.argv[i] + " ";
}

switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "movie-this":
        movieThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "do-what-it-says":
        random();
        break;
}

// my-tweets function
function myTweets() {
    var params = { screen_name: 'WaanLawan', count:20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            // console.log(tweets[0]);
            for (var i = 0; i < tweets.length; i++) {
                console.log(' ');
                console.log("Created on: " + tweets[i].created_at);
                console.log([i + 1] + ". " + tweets[i].text)
                console.log(' ');
            }

        }
    });

} // end myTweets function

// movieThis function
function movieThis() {

    if (value === '') {
        value = 'Mr. Nobody.';
    } 

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    // console.log(movieName);
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        // console.log(response);
        var jsonData = JSON.parse(body);

        console.log(' ');
        console.log("Title of the movie: " + jsonData.Title);
        console.log("Release Year: " + jsonData.Year);
        console.log("The movie's rating is: " + jsonData.imdbRating);
        console.log("Rotten Tomatoes Rating is: " + jsonData.tomatoRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log(' ');
        }
    });
}

function spotifyThis() {
    // var song = process.argv[3];

    if (value === '') {
        value = 'The Sign';
    }

    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // Use a for loop to move through the items array and get the data you need 
        // var items = [];
        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
        }
        
        console.log(' ');
            console.log('Artist: ' + songs[0].artists[0].name);
            console.log('Song: ' + songs[0].name);
            console.log('Preview Link: ' + songs[0].preview_url);
            console.log('Album: ' + songs[0].album.name);
            console.log(' ');
    })
}

function random() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        console.log(data);
        if (error) {
            return console.log(error);
        }
        else {
            var output = data.split(",");

          


            if (output[0] === "spotify-this-song") {
                spotifyThis(output[1]);
            }
            if (output[0] === "movie-this") {
                movieThis(output[1]);
            }
        }
    });
} // end doWhatItSays function

