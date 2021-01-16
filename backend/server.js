var express = require("express");
var app = express();
var request = require("request");
var http = require("http").createServer(app);
var path = require("path");
var public = path.join(__dirname, "public");
const querystring = require("qs");

const url = require("url");
const { response } = require("express");


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



// Serve static files in the public directory
app.use(express.static("public"));


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



// Listen for Heroku port, otherwise just use 3000
var port = 3000;
http.listen(port, () => console.log(`Server listening on port: ${port}`));



app.get("/", function (req, res) {
    res.sendFile(path.join(public, "index.html"));
});

