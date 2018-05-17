import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-user-count">{this.props.numUsers} users online</div>
      </nav>
    );
  }
}
export default NavBar;