import React, { Component } from "react";


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
        // console.log(snapshot);
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }

  

  render() {
    return(

        <div className="roomlist">
        <ul>

        {this.state.rooms.map((room, index) => {
        return (
            <div className="room" key={index} onClick={e => this.selectRoom(room, e)}>
            {room.name}
            </div>);
        })}
         </ul>
        </div>
    );
  }   
}
  










export default RoomList;