import React from 'react';
// sample image
import logo from '../logo.svg';
import axios from 'axios';
import {access_token} from '../config';
import Song from './Song';

const Playlist = props => {
  const { roomId } = props;
  
  // search 
  const config = {
    headers: {
      Authorization: "Bearer " + access_token,
    }
  }
  const params = {}

  const formatResult = searchResult => {
    const trackitems = searchResult.data.tracks.items;
    const parsedResult = trackitems.map(function (track) {
      return {
        album: track.album,
        artists: track.artists,
        name: track.name,
        id: track.id,
        link: track.href,
        image: track.album.images,
      };
    });
    return parsedResult;
  }

  const request = async query => {
    // for now only search by track name
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=CA&limit=10`;
    try {
      const response = await axios.get(url, config, params);
      console.log(response);
      const formattedResult = formatResult(response);
      console.log(formattedResult);
      return formattedResult;
    } 
    catch(error) {
      console.log(error);
    }
  }

  const searchResults = request('IFLY');
  console.log(searchResults);

  // get data somehow
  console.log(`playlist roomId: ${roomId}`);

  // fake data for now
  const data = [
    {
      title: "song1",
      artist: "artist1",
      image: logo,
      id: 1,
    },
    {
      title: "song2",
      artist: "artist2",
      image: logo,
      id: 2,
    },
  ]

  // format data
  const rows = data.map((song) => 
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <Song roomId={roomId} upvotes={0} artist="John" title="Lost in the Woods" id={song.id} />
    </li>
  );

  return (
    <div>
      <div className="playlist-container">
        <ul class="mt-4 list-group">
          {rows}
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <input id="search" type="text" class="form-control form-control-lg"
              placeholder="name">    
            </input>
          </li>
          <div id="match-list"></div>
        </ul>
      </div>
      <button className="standard-button" onClick={request}>Request</button>
    </div>
  );
}

export default Playlist;
