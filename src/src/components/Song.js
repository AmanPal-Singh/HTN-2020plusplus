import React, { useState, useEffect } from 'react';

// sample image
import logo from '../logo.svg';

const Song = props => {
    const [upvoted] = useState(false);
    const { type, info, title, artist, upvotes } = props;
    // var upvoted= false;

    let toggle= (id) => {
        console.log("Great Shot!" + id);
        // upvoted = !upvoted;
        // this.setState({ upvoted: !this.state.upvoted });
    }

    let add= (id) => {
        console.log("Great add!" + id);
        // upvoted = !upvoted;
        // this.setState({ upvoted: !this.state.upvoted });
    }



  return (
    <div class="grid-song">
        <div class="song-title">
            <img src={info? info.image[0].url : "../logo.svg"} className="track-img"></img>
            &nbsp;
            {info && info.album? info.album.name : "Lost In the Woods"}
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
