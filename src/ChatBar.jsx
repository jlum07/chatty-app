import React, {Component} from 'react';

class ChatBar extends Component {

  onEnter = (event) => {
    if (event.key === 'Enter') {
      if (event.target.className.includes('chatbar-username')) {
        if (event.target.value != this.props.currentUser.name) {
          this.props.changeUser(event.target.value);
        }
      } else if (event.target.className.includes('chatbar-message')) {
        this.props.sendMessage(event);
      }
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} onKeyPress={(event) => this.onEnter(event)} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onKeyPress={(event) => this.onEnter(event)} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;