import React from 'react';
import Playlist from '../Playlist';
import QRCode from 'qrcode.react';
import axios from "axios";

const Room = props => {
    const {roomId} = props;
    let url = "http://localhost:3000/api/isActiveRoom/" + roomId;
    axios.get(url).then(response => {
        if (!response.data["isActiveRoom"]) {
            window.location.href = '/'
        }
    });

  return (
    <div class="container mt-5 col-md-8">
      <div className="banner">
        <div class="grid">
          <div class="item-one">
            <h1 id="green" >{`room ${roomId}`}</h1>
            <p id="green">scan the code to share!</p>
            <h3 id="green">Up next: </h3>
          </div>
          <div class="item-two">
            <QRCode value={`${url}`} />
          </div>
        </div>
      </div>
      <Playlist roomId={roomId}/>
    </div>
  );
}

export default Room;