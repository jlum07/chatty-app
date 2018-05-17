import React, {Component} from 'react';

class IncomingNotification extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="message system">
          {this.props.message.content}
        </div>
      </React.Fragment>
    );
  }
}
export default IncomingNotification;