import React,{Component} from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isActive = this.props.activeState;
    let curClassName = isActive ? "active" : "";

    return (
      <span className = {curClassName}>
        {this.props.children}
      </span>
    )
  }
}

export default Button;
