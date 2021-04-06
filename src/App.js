import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
// import SignUp from './components/SignUp';
// import { Switch } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (

    <div className="app">
      <h1>What's app</h1>
      <div className="app_body"> 
      
      {/* <SignUp className="signup_box"/> */}
      
      <Router>
          {/* <Switch>  */}
                 
            <Sidebar/>
            <Chat roomID="4" userId="1"/>
            {/* <Route path="/rooms/:roomID">
              <Chat roomId={roomID} userId="1"/>
            </Route> */}
            {/* <Route path="/rooms/:roomID"  render={
          ({ match }) => (<Chat roomID={match.params.roomID}  userId="1" />)} /> */}

            {/* <Route path="/">
              <Chat/>
            </Route> */}
          {/* </Switch> */}
 
      </Router>
      </div>
    </div>
  );
}

export default App;
