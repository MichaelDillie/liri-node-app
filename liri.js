var dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

// Importing keys
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;
var command = process.argv[2];

var movieName = "";


// Twitter
if(command === "my-tweets") {
    var client = new Twitter(keys.twitter);
    var params = { screen_name: "myfaketwit2", count: 10 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

      if (!error) {
        var data = []; //empty array to hold data
        for (var i = 0; i < tweets.length; i++) {
          data.push({
              'created at: ' : tweets[i].created_at,
              'Tweets: ' : tweets[i].text,
          });
        }
        console.log(data);
      }
    });

}

// Spotify
else if(command === "spotify-this-song") {
    spotify.search({ type: 'track', query: 'All the Small Things' })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
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
            // console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("----------------------------------------------------------------------");
            console.log(queryUrl);
        }
    });
}

// Do What It Says

else if(command === "do-what-it-says") {
    for(var i = 3; i < nodeArgs.length; i++) {
        console.log(nodeArgs[i]);
    }
}