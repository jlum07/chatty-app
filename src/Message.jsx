import React, {Component} from 'react';

class Message extends Component {

  render() {

    return (
      <React.Fragment>
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>

        {/*}
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        */}
      </React.Fragment>
    );

  }
}
export default Message;