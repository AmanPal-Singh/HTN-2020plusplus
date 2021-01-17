import React, { useState, useEffect } from 'react';

// sample image
import logo from '../logo.svg';

const Song = props => {
    const [upvoted] = useState(false);
    const { title, artist, upvotes } = props;
    // var upvoted= false;

    let toggle= () => {
        console.log("Great Shot!");
        // upvoted = !upvoted;
        this.setState({ upvoted: !this.state.upvoted });
    }

  return (
    <div class="grid-song">
        <div class="song-title">
            <img src="../logo.svg"></img>
            &nbsp;
            Lost In the Woods
        </div>
        <div class="song-artist">John</div>
        <div class="song-votes">
            <span class="badge badge-primary badge-pill">
                14
            </span>
            <button onClick={toggle} id="upvote" type="button" className={true ? "fill btn btn-sm ml-2": "btn btn-sm ml-2"}>
                <i onclick="myFunction(this)" className ="fa fa-arrow-up"></i>
            </button>

        </div>
        

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
