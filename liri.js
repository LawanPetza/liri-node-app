require("dotenv").config();

var request = require("request");
function movieAPI () {

var movieName = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function (error, response, body) {
    console.log(response);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Title of the movie: " + JSON.parse(body).Title);


});
}
if (process.argv[2] === "movie-this") {
    movieAPI()
}
console.log(process.argv);