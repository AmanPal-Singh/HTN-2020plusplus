import React from 'react';

class LoggedIn extends React.Component {
    componentDidMount() {
        let re = /access_token=(.*)&token/g;
        let accessToken = (re.exec(window.location.hash.substring(1)))[1];
        window.location.replace('http://localhost:3000/loggedIn?' + 'token=' + accessToken);
    }
    render() {
        return <h1>Hello</h1>;
    }
}

export default LoggedIn;
