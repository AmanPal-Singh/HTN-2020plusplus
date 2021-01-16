var express = require("express");
var app = express();
var request = require("request");
var http = require("http").createServer(app);
var path = require("path");
var public = path.join(__dirname, "public");
const querystring = require("qs");

const url = require("url");
const { response } = require("express");
const axios = require('axios').default;

let activeRooms = [
    {
        roomID: 123,
        userID: "borkboy420",
        authToken: "BQDjMlxYPCNmaC6z99NINqjgaOHFmywfTHP8buhg_rnWEQZOmSaZ0fh2WB6mG-YqTyH3SNjYBJZc1cPWFUv97P0GU8hbcpCkZTQNpeHlUSYp9hmi7OqZKBo6eouRwtaWzhVzhTHz7m5L2IH-TEg20PHU-pny4L2mLWyalH4ZfYxisuRWkh5Zf9i4-nETtbymEtv4NX_iQieWLLfHlipe7Doo",
        refreshToken: "WIP",
        queue: [
            {
                id: "3ee8Jmje8o58CHK66QrVC2",
                votes: 3
            },
            {
                id: "31I3Rt1bPa2LrE74DdNizO",
                votes: 2
            },
            {
                id: "46OFHBw45fNi7QNjSetITR",
                votes: 0
            },
        ]
    }
]

const client_id = '3b83df1eb5414ccfa16275dc089add12';
const redirect_uri = 'http://localhost:3000/callback.html'

const stateKey = "spotify_auth_state";
const refreshKey = "refresh_key";
const cookieOption = {
	// Comment out the following 2 lines while in development for the authoriazation flow to work properly
	// sameSite:'None',
	// secure: true
};


const client_secret = process.env.client_secret;


var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
// Array of rooms to temporarily ignore adding new songs to
var inactiveRoomQueues = []

// Add room name temporarily to list of rooms to not check queue, prevents duplicate add
function tempAddToList(name){
    inactiveRoomQueues.push(name)
    setTimeout(() => removeFromListByName(name),13000)
}

// helper function to remove an element from inactiveRoomQueues a list by value
function removeFromListByName(valueToRemove){
    inactiveRoomQueues = inactiveRoomQueues.filter(item => item !== valueToRemove)
}

// helper function to generate the structure of the auth header used in requests
function getAuthHeader(authToken){
    return {
        headers: {
            Authorization: "Bearer " + authToken
        }
    }
}

// Loop through all the active rooms and check if they are ready for the next song to be queued
function checkRooms() {
    for (let i = 0; i < activeRooms.length; i++) {
        checkQueue(activeRooms[i]["authToken"], activeRooms[i]["roomID"])
    }
}
// setInterval(checkRooms, 3000);

// Check if room is ready for next song to be queued
async function checkQueue(authToken, roomID) {
    const url = "https://api.spotify.com/v1/me/player"
    try{
        const response = await axios.get(url, getAuthHeader(authToken))
        const data = response.data
        const timeToEnd = data["item"]["duration_ms"] - data["progress_ms"]
        console.log(roomID, timeToEnd)
        if (timeToEnd < 10000){
            addToQueue(authToken, roomID,"spotify:track:3ee8Jmje8o58CHK66QrVC2")
        }
    } catch (e) {
        console.log("ERROR", e.message, e.response.data, e.response.status, e.response.headers);
    }
}

app.get('/userLogin', function (req, res){
    
    // use Spotify API to get request

    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    
    var scope = 'user-read-private user-top-read playlist-modify-public playlist-read-private playlist-read-collaborative app-remote-control user-modify-playback-state';
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      show_dialog: true,
    }));

    console.log("Logged In!");
});

app.get('/refreshLogin', function(req, res){
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
        },
        json: true
    }

    // send post request to get new token
    request.post(authOptions, function(error, response, body){
        if (!error && response.statusCode == 200){
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
    console.log("Token Refreshed!");
});

app.get("/logout", (req, res) => {
    res.clearCookie(refreshKey, cookieOption);
    res.status(200).send("successfully logged out!");
});


// Add song to end of queue
async function addToQueue(authToken, roomID, trackUID) {
    if (inactiveRoomQueues.includes(roomID)){
        console.log(roomID, "already added song to queue, skipping...")
        return
    }
    tempAddToList(roomID)
    const url = "https://api.spotify.com/v1/me/player/queue?uri=" + trackUID
    const config = getAuthHeader(authToken)
    try {
        const response = await axios.post(url, {}, config)
        const data = response.data
        if (!data){
            console.log(roomID, "succesfully queued ", trackUID)
        }
    } catch (e){
        console.log("ERROR", e.message, e.response.data, e.response.status, e.response.headers);
    }
}

// Homepage endpoint (not really useful right now)
app.get("/", function (req, res) {
    res.sendFile(path.join(public, "index.html"));
});


// Get room's playlist returns data in form of:
// [
//     {
//         id: "3ee8Jmje8o58CHK66QrVC2",
//         votes: 3
//     },
//     {
//         id: "46OFHBw45fNi7QNjSetITR",
//         votes: 0
//     },
// ]
app.get("/api/getPlaylist/:roomid", function (req, res) {
    const roomId = parseInt(req.params.roomid)
    const playlist = activeRooms.filter(function(item){
        return item.roomID == roomId;
    })[0]["queue"]
    res.json(playlist)
});

// Add song to playlist, example POST request
// http://localhost:3000/api/addToPlaylist/123?songId=46OFHBw45fNi7QNjSetITR
app.post("/api/addToPlaylist/:roomid", function (req, res) {
    const roomId = parseInt(req.params.roomid)
    const songId = req.query.songId
    activeRooms.filter(function(item){
        return item.roomID == roomId;
    })[0]["queue"].push({id:songId, votes: 1})
    console.log(roomId, "Added song", songId)
    res.json({added_song: songId})
});

// Serve static files in the public directory
app.use(express.static("public"));

// Listen on port 3000
var port = 3000;
http.listen(port, () => console.log(`Server listening on port: ${port}`));



app.get("/", function (req, res) {
    res.sendFile(path.join(public, "index.html"));
});

