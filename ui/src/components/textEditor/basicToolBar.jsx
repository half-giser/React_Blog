import React,{Component} from 'react';
class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = {this.props.className}>
        {this.props.buttons}
      </div>
    )
  }
}

class ToolBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className, children;
    ({className, children} = this.props);    //... rest parameter  used for collect elements into an array

    return (
      <Menu
        buttons = {children}                          //...spread syntaxc for 'expends' an array inito its elements
        className = {className}
      />
    )
  }
}

export default ToolBar;
