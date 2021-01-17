import React, { useEffect, useState } from 'react';

const Song = props => {
    const { title, artist, upvotes, id } = props;
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

    return (
        <div class="grid-song">
            <div class="song-title">
                <img src="../logo.svg"></img>
                &nbsp;
                {title}
            </div>
            <div class="song-artist">{artist}</div>
            <div class="song-votes">
                <span class="badge badge-primary badge-pill">{upvoteCount}</span>
                <button onClick={toggle} id="upvote" type="button" 
                    className={voteStatus === 'voted' ? "fill btn btn-sm ml-2": "btn btn-sm ml-2"}>
                    <i className ="fa fa-arrow-up" />
                </button>

            </div>
            

        </div>
    );
}

export default Song;
