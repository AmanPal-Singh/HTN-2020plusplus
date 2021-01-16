var express = require("express");
var app = express();
var http = require("http").createServer(app);
var path = require("path");
var public = path.join(__dirname, "public");
const axios = require('axios').default;

var activeRooms = [
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

app.get("/api/getPlaylist/:roomid", function (req, res) {
    const roomId = parseInt(req.params.roomid)
    const playlist = activeRooms.filter(function(item){
        return item.roomID == roomId;
    })[0]["queue"]
    res.json(playlist)
});

// Serve static files in the public directory
app.use(express.static("public"));

// Listen on port 3000
var port = 3000;
http.listen(port, function () {
    console.log("http://localhost:" + port);
});