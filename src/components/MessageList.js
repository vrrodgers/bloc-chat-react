import React, { Component } from "react";
import * as firebase from "firebase";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state ={
        messages: [{
            username: "",
            content: "",
            sentAt: "",
            roomId: "",
        }]
    };
        this.messageRef = this.props.firebase.database().ref('messages');
        // this.state.messages.sentAt = this.props.firebase.database.ServerValue.TimeStamp;
  }





  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }


  







  render(){
      return(
          

        <div className="message">
            {this.state.messages.map((message, index) => {
                    return
                     <div className="message" key={index} >
                        {message.content}
                    </div>
                })};
                    <p>message</p>
        </div>  
       

      )
           




  }


}


export default MessageList;
