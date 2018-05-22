import React, { Component } from 'react';
import * as firebase from "firebase";
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import "./App.css";
import User from './components/User'
import * as ReactBootstrap from "react-bootstrap";
import {
  Col,
  Row,
  Grid,
  FormGroup,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";







 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBrw5tavXegHU5fEJY1J93KwuCv8DbBQFc",
    authDomain: "bloc-chat-react-25537.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-25537.firebaseio.com",
    projectId: "bloc-chat-react-25537",
    storageBucket: "bloc-chat-react-25537.appspot.com",
    messagingSenderId: "529129345532"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      activeRoomKey: ""
    };
    //this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  ActiveRoom(room) {
    this.setState({ activeRoom: room });
    this.setState({ activeRoomKey: room.key });
    const roomKey = room === "" ? "" : room.key;
    const roomTitle = room === "" ? "" : room.title;
   // userRef.update({currentRoom: roomKey, roomName: roomTitle});
    //console.log("ActiveRoom", room);
    /* const roomKey = room === "" ? "" : room.key;
    const roomTitle = room === "" ? "" : room.title; */
    //userRef.update({ currentRoom: roomKey, roomName: roomTitle });
    //  console.log(room);
  }

  selectRoom(room) {
    this.setState({
      activeRoomKey: room
    });
  }
  
   setUser(user){
      if (user === null) {
        return this.setState({ username: 'Guest' });
      } else {
        return this.setState({ username: user.displayName });
      }
    }



  render() {
   
    //console.log(this.state.activeRoomKey);

    return <Grid>
        <Row className="App show-grid">
          <div className="sidenav">
            <header>
              <h1 className="sidenavtext">Bloc Chat</h1>
              <User firebase={firebase} setUser={this.setUser.bind(this)} username={this.state.username} />
            </header>
            <Col md={4}>
              <aside className="sidenavtext">
                <RoomList firebase={firebase} activeRoom={this.state.activeRoom} selectRoom={this.selectRoom.bind(this)} />
              </aside>
            </Col>
          </div>
          <Col md={1}> </Col>
          <Col md={7}>
            <div className="content">
              <div className="content">
                <h2>{this.state.activeRoom.name}</h2>

                <div className="messagelist">
                  <MessageList firebase={firebase} activeRoom={this.state.activeRoom} activeRoomKey={this.state.activeRoomKey} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>;
  }
}





export default App;
