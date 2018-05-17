import React, { Component } from "react";
import * as firebase from "firebase";
class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const roomsRef = firebase.database().ref('rooms');
    const room = {
      name: this.state.newRoomName
    };
    roomsRef.push(room);
    this.setState({
      newRoomName: ''
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }
  selectRoom(room) {
    this.props.activeRoom(room);
  }
  render() {
    return <div className="roomlist">
        <ul>
          {this.state.rooms.map((room, index) => {
            return <div className="room" key={index} onClick={e => this.selectRoom(room, e)}>
                {room.name}
              </div>;
          })}
        </ul>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" value={this.state.newChatRoom} onChange={e => this.handleChange(e)} placeholder=" New Room" />

          <input type="submit" value="Create Room" />
        </form>
      </div>;
  }
}
  










export default RoomList;