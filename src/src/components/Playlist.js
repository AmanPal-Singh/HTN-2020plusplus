import React from 'react';
// sample image
import logo from '../logo.svg';
import axios from 'axios';
const access_token ="BQDbgT48axNY_01XKFIZDg1_inM59vzgUdwIEzNss-wil1NS33FA9Xe0R1SVhA3uKOXMI5ivEzmMULg_QAmj5ZRG2Ng7ImxZOop0ne1ZLJtHf03xGQFqPVhl9gzFE14iNUQDslllYZhZj1Qyb4DsixCrWf7AUkiYMjiMDB6b1G0p7Z-2OLBzdHPXHS-ixjoWUzyqd-38-4v7R-6nZOZfFw70SmJa25_JjjFQOQND";

const Playlist = props => {
  const { roomId } = props;
  
  // search 
  const config = {
    headers: {
        Authorization: "Bearer " + access_token,
    }
  }
  const params = {};

  const request = async query => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=CA&limit=20`;
    try {
      const response = await axios.get(url, params, config);
      console.log(response);
    } 
    catch(error) {
      console.log(error);
    }
  }
  request('IFLY');

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

  // data
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
