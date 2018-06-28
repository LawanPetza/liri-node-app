require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var request = require("request");
var fs = require("fs");

var action = process.argv[2];
var value = process.argv[3];

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
    var params = { screen_name: 'WaanLawan' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            // console.log(tweets[0]);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);

                console.log(tweets[i].text)
            }

        }
    });

} // end myTweets function

// movieThis function
function movieThis() {
    // Store all of the arguments in an array
    var nodeArgs = process.argv;
    // console.log("this is the command line " + process.argv);

    // Create an empty variable for holding the movie name
    var movieName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + " " + nodeArgs[i];
        }

        else {
            movieName += nodeArgs[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&tomatoes=true&y=&plot=short&apikey=trilogy";
    // console.log(movieName);
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        // console.log(response);

        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating is: " + JSON.parse(body).TomatoRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

    });
}
function random() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        console.log(data);
        if (error) {
            return console.log(error);
        }
        else {
            var output = data.split(" , ");

            for (var i = 0; i < output.length; i++) {

                // Print each element (item) of the array/
                console.log(output[i]);
            }


            if (output[0] === "spotify-this-song") {
                spotifyThis(output[1]);
            }
            if (output[0] === "movie-this") {
                movieThis(output[1]);
            }
        }
    });
} // end doWhatItSays function
function spotifyThis() {
    var song = process.argv[3];

    if (song === undefined) {
        song = 'The Sign'
    }

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // Use a for loop to move through the items array and get the data you need 
        var items = [];

        for (var i = 0; i < items.length; i++) {

            // Print each element (item) of the array/
            console.log(items[i]);
        }
        console.log(data.tracks.items[0]);
    })




}



