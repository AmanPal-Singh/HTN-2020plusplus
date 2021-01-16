import React from 'react';
// sample image
import logo from '../logo.svg';
import axios from 'axios';
import {access_token} from '../config';

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
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=CA&limit=20`;
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
    },
    {
      title: "song2",
      artist: "artist2",
      image: logo,
    },
  ]

  // format data
  const rows = data.map((song) => 
    <tr>
      <td>
        <div className="song-icon">
          <img src={song.image} />
        </div>
      </td>
      <td>{song.title}</td>
      <td>{song.artist}</td>
    </tr>
  );

  return (
    <div>
      <h2>Playlist</h2>
      <div className="playlist-container">
        <table className="playlist">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <button className="standard-button" onClick={request}>Request</button>
    </div>
  );
}

export default Playlist;
