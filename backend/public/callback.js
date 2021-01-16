
let re = /access_token=(.*)&token/g;
let accessToken = (re.exec(window.location.hash.substring(1)))[1];
console.log(accessToken)

const token= "BQDnyOMmXzWiGvP02vAH7yi3RNbJfsF7qo1cJQK7ugHqgDlZiS6ob7neHG35oaPAnHow-lAucz32bP1tOQTkpq1rEjztu6ZEefDIzSamrN9Bv4-FyxP7VezCiB0jON6tJ97J7qSUcb0CQ3EemTaIdF7MT_VEAM_-fLkl3NNYnmQ7G9rUSh7jFmxfJXJLyvI1ZRX-6GCet1N_-xk"

function makePlaylist(){
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const params = {
        name: "Fake News",
    }

    // const userId = getUserId()
    const userId = "borkboy420"

    const url = "https://api.spotify.com/v1/users/"+userId+"/playlists"

    axios.post(url, params, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function getUserId(){
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const url = "https://api.spotify.com/v1/me"


    var result = false
    axios.get(url, config)
        .then(function (response) {
            result = response["data"]["id"]
            console.log(result)
        })
        .catch(function (error) {
            console.log(error);
        });
    return false
}

function extendToken(){
    /* Spotify API access tokens expire relatively early, so this function should be called
    regularly to extend the access token using the refresh token given */
    

}