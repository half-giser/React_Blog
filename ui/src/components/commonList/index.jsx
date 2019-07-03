import React, {Component} from 'react';

import './index.css';

class CommonList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    let commonList = this.props.targetList;
    let listElements = commonList.map((item,index) => {
      return <li key={index}>{item}</li>
    });

    return (
      <ul className="inner-unorder-list">{listElements}</ul>
    )
  }
}

export default CommonList;