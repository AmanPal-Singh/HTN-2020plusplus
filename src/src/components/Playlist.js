import React , {useState} from 'react';
// sample image
import logo from '../logo.svg';
import axios from 'axios';
import {access_token} from '../config';
import Song from './Song';

const Playlist = props => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState();

  const add = () => {
    console.log("Great Shot!");
    // upvoted = !upvoted;
    // this.setState({ upvoted: !this.state.upvoted });
  }

  // var songs;

  // var matches = [];
  var searchList = (<div></div>);
  

  const request = async query => {
    // for now only search by track name
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=CA&limit=10`;
    try {
      const response = await axios.get(url, config, params);
      console.log(response);
      const formattedResult = formatResult(response);
      console.log(formattedResult);
      
      
      // outputHtml(formattedResult);
      // matched(formattedResult);

      searchList = matches.map((match) => 
        <div class ="card card-body mb-1">
          <div class="grid-song">
            <div class="song-title">
                <img className="track-img" src={match.image[0].url}></img>
                &nbsp;
                ${match.album.name} ${match.id}
            </div>
            <div class="song-artist">
                ${match.artists[0].name}
            </div>

            <div class="song-votes">
            <button onClick={add} class="btn btn-sm ml-2">
              <i class="fa fa-lg fa-plus-circle" aria-hidden="true"></i>
            </button>
            </div>
        </div>
      </div>
      );

      setMatches = searchList;

      return formattedResult;
    } 
    catch(error) {
      console.log(error);
    }
  }
  var searchResults = request('IFLY');



  const handleChange = event => {
    setSearchTerm(event.target.value);
    searchResults = request(searchTerm);
  };

  

  // React.useEffect(() => {
  //   const results = people.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  // const matchList = document.getElementById('match-list');

  // const outputHtml = matches => {
    

  //   const html = matches.map(match => {
      
  //     return (
  //      `<div class ="card card-body mb-1">
  //         <div class="grid-song">
  //           <div class="song-title">
  //               <img class="track-img" src="${match.image[0].url}"></img>
  //               &nbsp;
  //               ${match.album.name} ${match.id}
  //           </div>
  //           <div class="song-artist">
  //               ${match.artists[0].name}
  //           </div>

  //           <div class="song-votes">
  //           <button onClick={add} class="btn btn-sm ml-2">
  //             <i class="fa fa-lg fa-plus-circle" aria-hidden="true"></i>
  //           </button>
  //           </div>
      
  //           </div>

  //      </div>
  //      `
  //      )
  //   }).join('');
  //   matchList.innerHTML = html;
  // }

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
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <Song type="voted"></Song>
    </li>
  );

  return (
    <div>
      <div className="playlist-container">
        <ul class="mt-4 list-group">
          {rows}
          <li class="list-group-item d-flex justify-content-between align-items-center">
            {/* <input id="search" type="text" class="form-control form-control-lg"
              placeholder="name">    
            </input> */}
            <input
            id="search" type="text" class="form-control form-control-lg"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
          </li>
          <div id="match-list">
            {matches}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Playlist;
