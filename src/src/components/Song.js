import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Song = props => {
    const { id, upvotes, type, roomId, authToken } = props;
    
    // HOOKS
    const [info, setInfo] = useState(!!props.info ? props.info : null);
    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    
    const [voteStatus, setVoteStatus] = useState(localStorage.getItem(`upvoteCookie${id}`) ? localStorage.getItem(`upvoteCookie${id}`) : 'notvoted');

    // CONFIG FOR API REQUESTS
    const config = {
        headers: {
        Authorization: "Bearer " + authToken,
        }
    }
    const params = {}

    // -------------------------------
    // UPVOTE 
    // -------------------------------

    useEffect(() => {
        console.log(voteStatus);
        localStorage.setItem(`upvoteCookie${id}`, voteStatus);
        console.log(localStorage);
        console.log("UPVOTES" + upvotes)
        console.log(upvoteCount)
    }, [id, voteStatus]);

    const requestAddUpvote = async (id, type) => {
        const url = `http://localhost:3000/api/songVote/${roomId}?songId=${id}&voteType=${type}`;
        try {
            const response = await axios.post(url);
            console.log(response);
            console.log("called requestAddUpvote");
            return;
        } 
        catch(error) {
            console.log(error);
        }
    }

    const toggle = () => {
        console.log("Great Shot!");
        setUpvoteCount(voteStatus === 'notvoted' ? upvoteCount+1 : upvoteCount-1);
        // upvoteCount = voteStatus === 'notvoted' ? upvoteCount+1 : upvoteCount-1;
        
        
        setVoteStatus(voteStatus === 'voted' ? 'notvoted' : 'voted');
        // update upvote count in backend too
        requestAddUpvote(id, voteStatus === 'notvoted' ? 'up' : 'down');
    }

    // -------------------------------
    // ADDING A SONG TO THE PLAYLIST 
    // -------------------------------

    const requestAdd = async id => {
        const url = `http://localhost:3000/api/addToPlaylist/${roomId}?songId=${id}`;
        try {
          const response = await axios.post(url);
          console.log(response);
          console.log("called add")
          return;
        } 
        catch(error) {
          console.log(error);
        }
      };

    let add = () => {
        console.log("Great add! " + info.id);
        requestAdd(info.id);
    }   

    // -------------------------------
    //  FETCH SONG INFO FROM ID
    // -------------------------------

    const formatResult = searchResult => {
        const trackitems = searchResult.data.tracks;
        const parsedResult = trackitems.map((track) => {
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
    
    const requestSongInfo = async songId => {
        // setUpvoteCount(upvoteCount)
        console.log("COUNT HERE", upvoteCount);
         
        // for now only search by track name
        const url = `https://api.spotify.com/v1/tracks?ids=${songId}`;
        try {
          const response = await axios.get(url, config, params);
          console.log("called get song info: ");
          console.log(response);
          const formattedResponse = formatResult(response);
          console.log(formattedResponse[0]);
          setInfo(formattedResponse[0]);
          return formattedResponse;
        } 
        catch(error) {
          console.log(error);
        }
    };
    
    if (!info) {
        requestSongInfo(id);
    }

    // -------------------------------
    // RENDER
    // -------------------------------


    return (
        <div class="grid-song">
            <div class="song-title">
                <img src={info? info.image[0].url : "../logo.svg"} alt="" className="track-img" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {info && (
                    <a className="link" href={info? info.track_link : '/'} >
                        {info.name}
                    </a>
                )}
            </div>
            <div class="song-artist">
                {info && (
                    <a className="link" href={info? info.artist_link : '/'} >
                        {info.artists[0].name}
                    </a>
                )}
            </div>
            {type === 'playlist' ?
                <div className="song-votes">
                    <span className="badge badge-primary badge-pill">
                        {/* {upvoteCount} */}
                        {upvotes}
                    </span>
                    <button onClick={toggle} id="upvote" type="button" 
                        className={voteStatus === 'voted' ? "fill btn btn-sm ml-2": "btn btn-sm ml-2"}>
                        <i className ="fa fa-arrow-up"></i>
                    </button>
                </div>
                :
                <div className="song-votes">
                    <button onClick={add} type="button" >
                        <i className ="fa fa-plus" />
                    </button>
                </div>
            }
        </div>
    );
}

export default Song;
