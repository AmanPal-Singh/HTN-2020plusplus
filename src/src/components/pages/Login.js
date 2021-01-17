import React from 'react';
import useForm from '../../hooks/form';
import {useHistory} from 'react-router-dom';


const Login = () => {
    // const querystring = require("qs");
    const client_id = '3b83df1eb5414ccfa16275dc089add12';
    const redirect_uri = 'http://localhost:3001/loggedIn'
    const scope = 'user-read-private user-top-read playlist-modify-public playlist-read-private playlist-read-collaborative app-remote-control user-modify-playback-state user-read-recently-played';

    // var generateRandomString = function (length) {
    //     var text = '';
    //     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //
    //     for (var i = 0; i < length; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     return text;
    // };

    // const state = generateRandomString(16);

// res.cookie(stateKey, state);

    // window.location.replace('https://accounts.spotify.com/authorize?' +
    //     querystring.stringify({
    //         response_type: 'code',
    //         client_id: client_id,
    //         scope: scope,
    //         redirect_uri: redirect_uri,
    //         show_dialog: true,
    //     }));

    window.location.replace('https://accounts.spotify.com/authorize?'
        + 'client_id=' + client_id
        + '&response_type=' + 'token'
        + '&redirect_uri=' + redirect_uri
        + '&show_dialog=' + 'true'
        + '&scope=' + scope);


    return (
        <div className="login-container">
            <h1>Login to Spotify</h1>
        </div>
    );
}


export default Login;