import React, {Component} from 'react';

import './index.css';
// import avatar from '../../images/avatar.jpg';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarName: "毅牯子"
    }
  }

  render() {
    return (
      <div className="avatar">
        <div className="avatar-container">
          {/* <img src={avatar} alt="blogHost" /> */}
        </div>
        <div className="nickname"> {this.state.avatarName} </div>
      </div>
    )
  }
}

export default Avatar;