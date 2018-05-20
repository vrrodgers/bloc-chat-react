import React, { Component } from "react";
import * as firebase from "firebase";
import {
  Col,
  FormGroup,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";






class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
      activeRoomKey: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      // console.log(snapshot);
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }
  

  handleSubmit(e) {
    e.preventDefault();
    this.props.firebase.database().ref("rooms");
    const roomsRef = firebase.database().ref("rooms");
    const room = {
      name: this.state.newRoomName
    };
    roomsRef.push(room);
    this.setState({
      newRoomName: ""
    });
      this.state.newChatRoom = "";
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  handleDelete(e) {
    for (var i = 0; i < this.state.rooms.length; i++) {
      if (this.state.rooms[i] === e) {
        delete this.state.rooms[i];
      }
    }
    this.setState({ rooms: this.state.room });
    console.log(this.state.room);
  }
  selectRoom(room) {
    this.setState({
        activeRoomKey: room
    })
  }
  render() {
    return (
      <div className="roomlist">
          {this.state.rooms.map((room, index) => {
            return <div className="room" key={index} onClick={e => this.selectRoom(room.key)}>
                {room.name}
              </div>
              ;
          })}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.newChatRoom}
            onChange={e => this.handleChange(e)}
            placeholder=" New Room"
          />

          <Button type="submit" >Create Room</Button>
           <h5>current room # {this.state.activeRoomKey}</h5>
        </form>
      </div>
    );
  }
}
  

  










export default RoomList;