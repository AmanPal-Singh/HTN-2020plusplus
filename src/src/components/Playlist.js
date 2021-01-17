import React , {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Song from './Song';

const Playlist = props => {
  const { roomId, authToken } = props;

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

  // -------------------------------
  // REFRESH PLAYLIST 
  // -------------------------------

  const requestPlaylist = async () => {
    const url = `http://localhost:3000/api/getPlaylist/${roomId}`;
    try {
      const response = await axios.get(url);
      // console.log("called get playlist");
      console.log("HELLO" + authToken);
      setPlaylist(response.data);
      return;// response.data;
    } 
    catch(error) {
      console.log(error);
    }
  };

  // NOTE: for some reason requestPlaylist will trigger itself to run in a loop
  // if you uncomment the refresh function here it will cause refresh to run every 1s or something
  // may break your computer?? but will appear as updating in real time
  // otherwise i set it up so you can refresh ONLY upon clicking a button
  // useEffect(()=> {
  //   refresh();
  // })

  const refresh = () => {
    requestPlaylist();
  }

  setInterval(requestPlaylist, 1000);

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
      const response = await axios.get(url, config, params);
      // console.log(response);
      const formattedResult = formatResult(response);
      // console.log(formattedResult);

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
        {/* <button className="standard-button" onClick={refresh}>
          Refresh
        </button> */}
      </div>
    </div>
  );
          }

export default Playlist;
