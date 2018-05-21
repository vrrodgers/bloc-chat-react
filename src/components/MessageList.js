import React, { Component } from "react";
import * as firebase from "firebase";
import RoomList from "./RoomList";
import {
  Col,
  FormGroup,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          username: "",
          content: "",
          sentAt: "",
          roomId: ""
        }
      ],
    };
    this.messageRef = this.props.firebase.database().ref("messages");
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleSubmit(e) {
    // how to get current date time
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    e.preventDefault();
    this.props.firebase.database().ref("messages");
    const messagesRef = firebase.database().ref("messages");
    const message = {
      content: this.state.content,
      username: "Guess-user ",
      sentAt: datetime ,
      roomId: this.props.activeRoomKey //add current room_id
    };
    //to add to database
    messagesRef.push(message);
    //to clear input field
    this.setState({
      content: ""
    });
  }
  handleChange(e) {
    this.setState({
       content: e.target.value,
       /* username: this.props.user.displayName,
       sentAt: this.props.firebase.database.ServerValue.TimeStamp */
       });
  }

  render() {
    let activeRoomKey = this.props.activeRoomKey;
    return (
      <div>
        {this.state.messages.map((message, index) => {
          if (activeRoomKey === "") {
            return null;
          } else if (message.roomId === activeRoomKey) {
            return <div className="message" key={index}>
                <p>
                  {message.username}
                  {message.content}
                </p>
              </div>;
          }
        })}

        <div className="MessageForm">
          <form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <FormControl className="form form-control-message" type="text" value={this.state.content} onChange={e => this.handleChange(e)} placeholder=" Enter Message" />
              <Button bsStyle="primary" className="form" type="submit">
                 Send Message
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    )}
}


export default MessageList;
