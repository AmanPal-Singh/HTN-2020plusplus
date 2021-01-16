import './App.css';
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Room from './components/pages/Room';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" >
              <Login />
            </Route>
            <Route
              path="/room/:id"
              render={props => (
                <Room roomId={props.match.params.id} />
              )}
            />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
