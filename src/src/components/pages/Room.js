import React, {useState} from 'react';
import Playlist from '../Playlist';
import QRCode from 'qrcode.react';
import axios from "axios";

const Room = props => {
    const {roomId} = props;
    const [authToken, setAuthToken] = useState();

    let url = "http://localhost:3000/api/isActiveRoom/" + roomId;
    axios.get(url).then(response => {
      // console.log("response!!!!!!!!!!!!!!!!!!")
      console.log(response.data);
        // if (!response.data["isActiveRoom"]) {
        //     window.location.href = '/'
        // }
    });

    // let authToken = null


    // const requestToken = async () => {
    //   try {
    //     let url = "http://localhost:3000/api/isActiveRoom/" + roomId;
        
    //     await axios.get(url).then(response => {
    //       console.log("token" + response.data["authToken"] )
    //     setAuthToken(response.data["authToken"]);

    //   //   if (!response.data["isActiveRoom"]) {
    //   //       window.location.href = '/'
    //   //   }
    //   // }
    
    // })} catch(error) {
    //     console.log(error);
    //   }
    // };

    // requestToken()
    url = "http://localhost:3000/api/getAuthToken/" + roomId;
    axios.get(url).then(response => {
        setAuthToken(response.data["authToken"]);
        console.log("autho here" + authToken)
    });

    // authToken="BQD8wfUWmx-ZAyr9mRy7yUxhy4f2DPi9YBf2_EV5Zw3YyF-V9EwfyDaVw3Pji5y4fa830cyP_jw1ZDgrEdUaImC0MrzekTwM1gbZVTFcUwYlxrlbRi95hmQrfVghJVnxSYkVlQVuHGCpS66s7zzzesSUSnEVEFfKEr9RsAt_QNLnOdZyKCghtAiQ34ugCYxtcPOX7RZSuYxK2lnuJu0XaC-8niTcP74NX0GGDppSFF0";

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
    
      <Playlist roomId={roomId} authToken={authToken}/>
    </div>
  );
}

export default Room;