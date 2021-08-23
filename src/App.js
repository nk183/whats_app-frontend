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
  Link,
  withRouter
} from "react-router-dom";

function App() {
  return (

    <div className="app">
      <h1>What's app</h1>
      <div className="app_body"> 

        <Sidebar/>
      
        <Switch> 
        <Route exact  path="/rooms" component={withRouter(Chat)}/>
          
          <Route path="/">
            <Chat/>
          </Route>
        </Switch>
 
      </div>
    </div>
  );
}

export default App;
