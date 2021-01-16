const client_id = '3b83df1eb5414ccfa16275dc089add12';
const redirect_uri = 'http://localhost:3000/callback.html'
// const redirect_uri = 'https://ianramzy.com'
const scope = 'user-read-private user-top-read playlist-modify-public playlist-read-private playlist-read-collaborative app-remote-control user-modify-playback-state user-read-playback-state';

function logIn() {
    window.location = 'https://accounts.spotify.com/authorize?'
        + 'client_id=' + client_id
        + '&response_type=' + 'token'
        + '&redirect_uri=' + redirect_uri
        + '&scope=' + scope;
}