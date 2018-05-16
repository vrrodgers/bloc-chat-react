import React, { Component } from 'react';
import * as firebase from "firebase";
import RoomList from './components/RoomList';
import "./App.css";





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
  }

   

  render() {
    let roomlist;
    return <div className="App sidenav">
        <header>
          <h1 className="sidenavtext">Bloc Chat</h1>
        </header>
        <aside className="sidenavtext">
          <RoomList firebase={firebase} />
        </aside>
        <main />
      </div>;  
  }

}





export default App;
