import React,{Component} from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    console.log(this.props);

    let isActive = this.props.activeState;
    let curClassName = isActive ? "active" : "";

    return (
      <span 
          ref = {this.ref}
          className = {curClassName}
      />
    )
  }
}

// class Icon extends Component {
//   constructor(props) {
//     super(props);
//     this.ref = React.createRef();
//   }

//   render() {
//     let originClassName = this.props.className;
//     let iconName = this.props.icon;
//     let curClassName = originClassName + iconName;

//     return (
//       <span
//       ref = {this.ref}
//       className = {curClassName}
//       />
//     )
//   }
// }

class Menu extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return (
      <div 
          ref={this.ref}
          className = {this.props.className}
      />
    )
  }
}

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {  
    let className,restProps;
    ({className,...restProps} = this.props);    //... rest parameter  used for collect elements into an array
    return (
      <Menu
        { ...restProps }    //...spread syntaxc for 'expends' an array inito its elements
        ref = {this.ref}
        className = {className}
      />
    )
  }
}

export {Button,ToolBar};