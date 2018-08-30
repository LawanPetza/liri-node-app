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

//store argument array
var arg = process.argv;
var action = process.argv[2];


//movie or song
var value = "";

for (var i = 3; i < process.argv.length; i++) {

    if (i > 3 && i < arg.length) {
        value = value + arg[i] + " ";
    } else {
        value = value + arg[i];
    }

}

// Function for determining which command is executed
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "movie-this":
        if (value) {
            movieThis(value)
        }
        else {
            movieThis("Mr. Nobody")
        }
        break;

    case "spotify-this-song":
        if (value) {
            spotifyThis(value)
        } else {
            spotifyThis("The Sign");
        }
        break;

    case "do-what-it-says":
        random();
        break;

    default:
        console.log("LIRI doesn't know that");

}

// Function for running a Twitter Search
function myTweets() {
    var params = { screen_name: 'WaanLawan', count: 20 };

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

} 

// Function for running a Movie Search
function movieThis(movieName) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
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
            console.log("Actors: " + jsonData.Actors);
            console.log("Plot: " + jsonData.Plot);
            console.log(' ');
        }
    });
}

var getArtistNames = function(artist){
    return artist.name;
}

function spotifyThis(songName) {

    spotify.search(
        {
            type: 'track',
            query: songName
        },

        function (err, data) {

            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
            

            console.log(' ');
            console.log(i);
            console.log('Artist: ' + songs[i].artists.map(getArtistNames));
            console.log('Song: ' + songs[i].name);
            console.log('Preview Link: ' + songs[i].preview_url);
            console.log('Album: ' + songs[i].album.name);
            console.log(' ');
        }
        })
}

// Function for running a command based on text file
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
} 

