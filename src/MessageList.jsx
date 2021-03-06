import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {

  render() {

    const messageList = this.props.messages.map((message) => {
      if (message.type === "incomingMessage") {
        return <Message message={message} key={message.id} />
      } else if (message.type === "incomingNotification")
        return <Notification message={message} key={message.id} />
    });

    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;