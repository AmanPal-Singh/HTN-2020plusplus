import React from 'react';
import Playlist from '../Playlist';
import QRCode from 'qrcode.react';

const Room = props => {
  const { roomId } = props;
  const url = window.location.href + roomId;

  return (
    <div class="container mt-5 col-md-8">
      <div class="grid">
        <div class="item-one">
          <h1 id="green" >{`room ${roomId}`}</h1>
          <p id="green">scan the code to share!</p>
          <p id="green">upvote and add songs</p>
        </div>
        <div class="item-two">
          <QRCode value={`${url}`} />
        </div>
      </div>
      <Playlist roomId={roomId} />
    </div>
  );
}

export default Room;