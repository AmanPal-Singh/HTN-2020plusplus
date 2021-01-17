import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {access_token} from '../config';

// sample image
import logo from '../logo.svg';


const Song = props => {
    const [upvoted] = useState(false);
    const { type, info, title, artist, upvotes } = props;
    // var upvoted= false;
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

    let toggle= (id) => {
        console.log("Great Shot!" + id);
        // upvoted = !upvoted;
        // this.setState({ upvoted: !this.state.upvoted });
    }

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
                <button onClick={() =>{add(info.id)}} type="button" className="btn btn-sm ml-2">
                <i className="fa fa-lg fa-plus-circle" aria-hidden="true"></i>
                </button>
            </div>
        }
    </div>
  );
}

// document.getElementById("upvote").addEventListener("click", function() {
//     console.log("hi");
//   });


{/* <div class="track">
        <div class="track_title">
            <img src="../logo.svg"></img>
            &nbsp;
            &nbsp;
            Lost In the Woods
        </div>
        <div class="track_artist">John</div>
        <div>
        <span class="badge badge-primary badge-pill">
            14

        </span>
        <button id="upvote" type="button" class="btn btn-sm ml-2">⬆</button>
        </div>
        

    </div> */}

export default Song;
