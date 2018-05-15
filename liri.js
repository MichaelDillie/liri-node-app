var dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

// Importing keys
var keys = require("./keys.js");

var nodeArgs = process.argv;
var command = process.argv[2];

var movieName = "";
var songName = "";
var twitterName = "";

// console.clear();

// Switch Statement
switch (command) {
    case "-t":
        myTweets();
        break;
    case "-s":
        spotifyThis();
        break;
    case "-m":
        movieThis();
        break;
    case "-d":
        doWhatTheySay();
        break;
    case "":
        noEntry();
        break;
    case "-help":
        help();
        break;
    default:
        wrongEntry();
}

// Wrong Entry
function wrongEntry() {
    console.log("*********************");
    console.log(command + " is not a command");
    console.log("*********************");
    console.log("COMMANDS");
    console.log("-t twitter username : Your tweets");
    console.log("-s song : Spotify song");
    console.log("-m movie : OMDB of movie");
    console.log("-d command : Will do what you say");
}

// No entry
function noEntry() {
    console.log("You need to enter a command");
}

// Twitter
function myTweets() {
    var client = new Twitter(keys.twitter);
    for (var i = 3; i < nodeArgs.length; i++) {
        twitterName += nodeArgs[i] + " ";
    }

    var params = {
        screen_name: twitterName,
        count: 10
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("----------------------------------------------------------------------");
                console.log("Created at: " + tweets[i].created_at);
                console.log("Tweet: " + tweets[i].text)
                console.log("----------------------------------------------------------------------");
            }
        }
    });
}

// Spotify
function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
    for (var i = 3; i < nodeArgs.length; i++) {
        songName += nodeArgs[i] + " ";
    }

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            console.log("----------------------------------------------------------------------");
            console.log("Song Name: " + songName.toUpperCase());
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
            console.log("URL: " + data.tracks.items[0].album.external_urls.spotify);
            console.log("----------------------------------------------------------------------");
        }
    });
}

// OMDB
function movieThis() {
    for (var i = 3; i < nodeArgs.length; i++) {
        movieName += nodeArgs[i] + " ";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
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
function doWhatTheySay() {
    for (var i = 3; i < nodeArgs.length; i++) {
        console.log(nodeArgs[i]);
    }
}