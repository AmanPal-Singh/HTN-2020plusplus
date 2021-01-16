import React, { useState } from 'react';
import useForm from '../../hooks/form';
import { useHistory } from 'react-router-dom';
import { client_id, redirect_uri, scope } from '../../config';

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

  // put here temporarily to generate access tokens
  function logIn() {
    window.location = 'https://accounts.spotify.com/authorize?'
        + 'client_id=' + client_id
        + '&response_type=' + 'token'
        + '&redirect_uri=' + redirect_uri
        + '&scope=' + scope;
  }

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