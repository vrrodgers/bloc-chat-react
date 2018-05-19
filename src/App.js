import React, { Component } from 'react';
import * as firebase from "firebase";
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import "./App.css";
import * as ReactBootstrap from "react-bootstrap";






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
      activeRoomKey: "",
    };
    //  this.activeRoom = this.activeRoom.bind(this);
  }

     ActiveRoom(room){
       this.setState({activeRoom: room });
       this.setState({ activeRoomKey: room.key });
       /* const roomKey = room === "" ? "" : room.key;
       const roomTitle = room === "" ? "" : room.title; */
      //  userRef.update({currentRoom: roomKey, roomName: roomTitle});

       console.log(room);
     }

  render() {
    //  let roomlist;

    return (
      <div className="App">
        <div className="sidenav">
          <header>
            <h1 className="sidenavtext">Bloc Chat</h1>
          </header>
          <aside className="sidenavtext">
            <RoomList firebase={firebase} activeRoom={this.activeRoom} />
          </aside>
        </div>

        <div className="content">
          <div className="content">
            <h2>{this.state.activeRoom.name}</h2>

            <div className="messagelist">
              <MessageList firebase={firebase} activeRoomKey={this.state.activeRoom.content} />
            </div>
          </div>
        </div>
      </div>
    );
  }
      
}





export default App;
