require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys.js")


var spotify = new Spotify(keys.spotify)
var client = new Twitter(keys.twitter);

function tweetsAPI() {
    var params = { screen_name: 'WaanLawan' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets[0]);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text)
            }

        }
    });

}

var request = require("request");
function movieAPI() {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;
    console.log("this is the command line " + process.argv);

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

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(movieName);
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        console.log(response);

        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating is: " + JSON.parse(body).Rating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

    });
}
if (process.argv[2] === "movie-this") {
    movieAPI()
}
else if (process.argv[2] === "my-tweets") {
    tweetsAPI()
}
console.log(process.argv);
console.log(process.argv);
