import React from 'react';
import Playlist from '../Playlist';
import QRCode from 'qrcode.react';

const Room = props => {
  const { roomId } = props;

  return (
    <div>
      <h1>Party Room</h1>
      <p>{`Welcome to room ${roomId}`}</p>
      <Playlist roomId={roomId} />
      <h2>QR Code </h2>
      <QRCode value={`placeholder/room/${roomId}`} />
    </div>
  );
}

export default Room;