import React from 'react';
const axios = require('axios');

// sample image
import logo from '../logo.svg';

const Playlist = props => {
  const { roomId } = props;
  
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

  const request = () => {
    console.log('request start');
    axios.get
  }

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
