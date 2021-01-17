import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {access_token} from '../config';

// sample image
import logo from '../logo.svg';

const Song = props => {
    const { type, info, title, artist, upvotes, room, id } = props;
    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    const [voteStatus, setVoteStatus] = useState(localStorage.getItem(`upvoteCookie${id}`) ? localStorage.getItem(`upvoteCookie${id}`) : 'notvoted');
    //console.log(voteStatus);

    useEffect(() => {
        console.log(voteStatus);
        localStorage.setItem(`upvoteCookie${id}`, voteStatus);
        console.log(localStorage);
    }, [id, voteStatus]);

    const toggle = () => {
        console.log("Great Shot!");
        setUpvoteCount(voteStatus === 'notvoted' ? upvoteCount+1 : upvoteCount-1);
        setVoteStatus(voteStatus === 'voted' ? 'notvoted' : 'voted');
        // update upvote count in backend too
    }

    const params = {}
    const config = {
        headers: {
          Authorization: "Bearer " + access_token,
        }
      }

    const requestAdd = async query => {
        // for now only search by track name
        const url = `http://localhost:3000/api/addToPlaylist/123?songId=${query}`;
        try {
          const response = await axios.post(url);
          console.log(response);
          console.log("called add")
          
          // outputHtml(formattedResult);
          
          // matchList.innerHTML = `<div></div>`;
          return;
        } 
        catch(error) {
          console.log(error);
        }
      };

    let add= (id) => {
        console.log("Great add!" + id);
        requestAdd(id);
        // upvoted = !upvoted;
        // this.setState({ upvoted: !this.state.upvoted });
    }


  return (
    <div class="grid-song">
        <div class="song-title">
            <img src={info? info.image[0].url : "../logo.svg"} className="track-img"></img>
            &nbsp;
            {info ? info.name : "Lost In the Woods"}
        </div>
        <div class="song-artist">
            {info? info.artists[0].name: "john wall"}
        </div>
        {props.type == "voted"?
            <div className="song-votes">
                <span className="badge badge-primary badge-pill">
                    14
                </span>
                <button onClick={() =>{toggle(info.id)}} id="upvote" type="button" className={true ? "fill btn btn-sm ml-2": "btn btn-sm ml-2"}>
                    <i className ="fa fa-arrow-up"></i>
                </button>
            </div>
            :
            <div className="song-votes">
                <button onClick={() =>{add(info.id)}} type="button" 
                    className={voteStatus === 'voted' ? "fill btn btn-sm ml-2": "btn btn-sm ml-2"}>
                    <i className ="fa fa-arrow-up" />
                </button>
            </div>
        }
    </div>
  );
}

export default Song;
