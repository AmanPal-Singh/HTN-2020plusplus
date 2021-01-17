import React from 'react';
import useForm from '../../hooks/form';
import {useHistory} from 'react-router-dom';


const Login = () => {
    const querystring = require("qs");
    const client_id = '3b83df1eb5414ccfa16275dc089add12';
    const redirect_uri = 'http://localhost:3000/callback.html'
    const client_secret = 'fa0c1020fea44e7c80e8796972f0a93c'
    const scope = 'user-read-private user-top-read playlist-modify-public playlist-read-private playlist-read-collaborative app-remote-control user-modify-playback-state';

    var generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    const state = generateRandomString(16);

// res.cookie(stateKey, state);

    window.location.replace('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            show_dialog: true,
        }));


    return (
        <div className="login-container">
            <h1>Login to Spotify</h1>
        </div>
    );
}


export default Login;