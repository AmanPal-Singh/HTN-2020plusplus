import React , {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Song from './Song';

const Playlist = props => {
  const { roomId } = props;
  const [authToken, setAuthToken] = useState();

  let url = "http://localhost:3000/api/getAuthToken/" + roomId;
  axios.get(url).then(response => {
    setAuthToken(response.data["authToken"]);
    console.log("autho here" + authToken)
  });

  const config = {
    headers: {
    Authorization: "Bearer " + authToken,
    }
  }
  const params = {}

  // HOOKS
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState();
  const [playlist, setPlaylist] = useState([]);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // -------------------------------
  // REFRESH PLAYLIST 
  // -------------------------------

  const requestPlaylist = async () => {
    const url = `http://localhost:3000/api/getPlaylist/${roomId}`;
    try {
      const response = await axios.get(url);
      console.log("called get playlist");
      console.log(response.data);
      setPlaylist(response.data);
      return;// response.data;
    } 
    catch(error) {
      console.log(error);
    }
  };


  useInterval(() => {
    requestPlaylist()
  }, 1000);


  // format data from fetch
  const rows = playlist.map((song) => 
    <li class="list-group-item d-flex justify-content-between align-items-center" key={song.id}>
      <Song authToken={authToken} type='playlist' roomId={roomId} upvotes={song.votes} id={song.id} />
    </li>
  );
  
  // -------------------------------
  // SEARCH REQUEST 
  // -------------------------------

  const formatResult = searchResult => {
    const trackitems = searchResult.data.tracks.items;
    const parsedResult = trackitems.map(function (track) {
      return {
        album: track.album,
        artists: track.artists,
        name: track.name,
        id: track.id,
        track_link: track.external_urls.spotify,
        artist_link: track.artists[0].external_urls.spotify,
        image: track.album.images,
      };
    });
    return parsedResult;
  }

  const request = async query => {
    // for now only search by track name
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=CA&limit=10`;
    try {
      if (query === "") {
        setMatches([]); 
        return;
      }
      console.log(config)
      const response = await axios.get(url, config, params);
      console.log(response);
      const formattedResult = formatResult(response);
      console.log(formattedResult);

      setMatches(formattedResult.map((song) => 
        <li class="list-group-item d-flex justify-content-between align-items-center" key={song.id}>
          <Song authToken={authToken} info={song} upvotes={0} roomId={roomId}></Song>
        </li>
      ));

      return formattedResult;
    } 
    catch(error) {
      console.log(error);
    }
  };

  // test request
  //var searchResults = request('IFLY');
  //console.log(searchResults);

  const handleChange = event => {
    setSearchTerm(event.target.value);
    request(searchTerm);
  };

  // -------------------------------
  // RENDER
  // -------------------------------

  return (
    <div>
      <div className="playlist-container">
        <ul class="mt-4 list-group">
          {rows}
          <li class="list-group-item d-flex justify-content-between align-items-center mt-5">
            <input
              id="search" type="text" class="form-control form-control-lg"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}/>
          </li>
          <div id="match-list">
            {matches}
          </div>
        </ul>
        <button className="standard-button" onClick={requestPlaylist}>
          Refresh
        </button>
      </div>
    </div>
  );
          }

export default Playlist;
