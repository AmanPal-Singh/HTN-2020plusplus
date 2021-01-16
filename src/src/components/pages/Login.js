import React, { useState } from 'react';
import useForm from '../../hooks/form';
import { useHistory } from 'react-router-dom';
import {logIn} from '../../main';

const Login = () => {
  // hooks
  const [error, setError] = useState(false);
  const history = useHistory();
  const [{ username, password }, onFormChange] = useForm({
    username: '',
    password: '',
  });

  // generate random room code and pray its not the same??
  const roomId = Math.floor(Math.random() * 10000); 

  const client_id = '5bacc656ab69429a852568b4140da742';
  const access_token ="access_token=BQD0qsPvWH7eXkTw-KViq5_jW4EkZ6w7XnH13EvfcB7vi9VbZGnAXfzCpaNBvlg507lgEsIEMSNs60i_zGC93tZzGdzb28AIzj0Yd00ar_3ETThJMMobArwrS5D2_5YAf-uUCXgN2cOLS6mvLIY91_nQkuuXvNKEBuCmZuOomtph3bmycKyVvV6im2yfH2iX2pzVCwjQuB93O9ob7XxmoH921v_HPfh2d49RPac3";
  const redirect_uri = `http://localhost:3000/room`
  const scope = 'user-read-private user-top-read playlist-modify-public playlist-read-private playlist-read-collaborative app-remote-control user-modify-playback-state';


  const onSubmit = () => {
    // do authentication here
    // if authentication works then redirect to `/room/${roomId}`
    // otherwise error
    // currrently user and host see the same page
    if (username !== '' && password !== '') {
      //logIn(client_id, redirect_uri, scope);
      console.log('login done');
      history.push(`/room/${roomId}`);
    } else {
      setError(true);
    }
    //console.log(`username: ${username}`);
    //console.log(`password: ${password}`);
  }

  let loading = false; // if loading, can disable fieldset 

  return (
    <div className="login-container">
      <h1>Login to Spotify</h1>
      <form className="login-form">
        <fieldset disabled={loading}>
          <div>
            <div>
              <label>username:</label>
              <input
                placeholder="enter username"
                value={username}
                onChange={onFormChange('username')}
              />
            </div>
            <div>
              <label>password:</label>
              <input
                type="password"
                placeholder="enter password"
                value={password}
                onChange={onFormChange('password')}
              />
            </div>
          </div>
        </fieldset>
      </form>
      {error && <span style={{color: "red"}}>Error: invalid username or password</span>}
      <button className="standard-button" onClick={onSubmit}>
        Login
      </button>
    </div>
  );
}

export default Login;