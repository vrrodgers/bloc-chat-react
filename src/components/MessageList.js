import React, { Component } from "react";
import * as firebase from "firebase";
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
      ]
    };
    this.messageRef = this.props.firebase.database().ref("messages");
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TimeStamp;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.firebase.database().ref("messages");
    const messagesRef = firebase.database().ref("messages");
    const message = {
      content: this.state.content,
      username: "testbil ",
      sentAt: this.state.messages.sentAt,
      roomId: "-LC_VNQnUP4ZC81UIdm2" //add current roomid
    };
    //to add to database
    messagesRef.push(message);
    //to clear input field
    this.setState({
      content: ""
    });
  }
  handleChange(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    const activeRoomKey = this.props.activeRoomKey;

    return <div>
        {this.state.messages.map((message, index) => {
          if (activeRoomKey === "") {
            return null;
          } else if (message.roomId === activeRoomKey) {
            return <div className="message" key={index}>
                {message.username}:
                {message.content}
              </div>;
          }
        })}
        <div className="MessageForm">
          <textarea className="messageField" name="message" rows="3" />
          <input type="submit" />
        </div>
      </div>;
  }
}


export default MessageList;
