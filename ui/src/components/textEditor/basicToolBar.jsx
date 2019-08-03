import React,{Component} from 'react';
class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div 
          className = {this.props.className}
      />
    )
  }
}

class ToolBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {  
    let className, restProps;
    ({className, ...restProps} = this.props);    //... rest parameter  used for collect elements into an array
    return (
      <Menu
        { ...restProps }                                        //...spread syntaxc for 'expends' an array inito its elements
        className = {className}
      />
    )
  }
}

export default ToolBar;