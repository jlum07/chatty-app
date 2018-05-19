import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

// const uuidv4 = require('uuid/v4');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      numUsers: 0,
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  componentDidMount() {

    console.log("componentDidMount <App />");

    // Sets connection to websocket server
    this.socket = new WebSocket("ws://localhost:3001");

    // Display connected message once connected to websocket
    this.socket.onopen = function (event) {
      console.log("Connected to server");
    };

    this.socket.addEventListener("message", event => {

      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      let data = JSON.parse(event.data);

      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
            this.setState(previousState => ({
              messages: [...previousState.messages, data]
            }));
          break;
        case "incomingNotification":
          // handle incoming notification
            console.log(data);
            this.setState(previousState => ({
              messages: [...previousState.messages, data]
            }));
          break;
        case "userUpdate":
          // Updates usercount
          this.setState({
            numUsers: data.numUsers
          })
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }

    });

  }

  // Send message to websocket server
  sendMessage = (event) => {

    if (event.key === "Enter") {
      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      }
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }

  // Change current username
  changeUser = (newUsername) => {

    if (newUsername == "") {
      newUsername = "Anonymous";
    }

    let notification = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newUsername}`
    }

    this.setState({
      currentUser: {name: newUsername}
    });

    this.socket.send(JSON.stringify(notification));

  }

  render() {
    return (
      <React.Fragment>
        <NavBar numUsers={this.state.numUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} changeUser={this.changeUser} />
      </React.Fragment>
    );
  }
}
export default App;
