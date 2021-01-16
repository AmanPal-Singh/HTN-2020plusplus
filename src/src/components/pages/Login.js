import React from 'react';
import useForm from '../../hooks/form';
import { useHistory } from 'react-router-dom';

const Login = () => {
  // hooks
  const history = useHistory();
  const [{ username, password }, onFormChange] = useForm({
    username: '',
    password: '',
  });
  
  // generate random room code and pray its not the same??
  const roomId = Math.floor(Math.random() * 10000); 

  const onSubmit = () => {
    // do authentication here
    // if authentication works then redirect to `/room/${roomId}`
    // otherwise error
    // currrently user and host see the same page
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

    history.push(`/room/${roomId}`);
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
      <button className="standard-button" onClick={onSubmit}>
        Login
      </button>
    </div>
  );
}

export default Login;