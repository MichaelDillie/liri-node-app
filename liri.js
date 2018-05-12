require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

// Importing keys
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeArgs = process.argv;
var command = process.argv[2];

var movieName = "";


// Twitter
if(command === "my-tweets") {

}

// Spotify
else if(command === "spotify-this-song") {

}

// OMDB
else if(command === "movie-this") {
    for(var i = 3; i < nodeArgs.length; i++) {
        movieName += nodeArgs[i] + " ";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            console.log("-----------------------------------------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("----------------------------------------------------------------------");
        }
    });
}

// Do What It Says

else if(command === "do-what-it-says") {
    for(var i = 3; i < nodeArgs.length; i++) {
        console.log(nodeArgs[i]);
    }
}