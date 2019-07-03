import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faHome} from '@fortawesome/free-solid-svg-icons';

import './index.css';

class LinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          linkName: '主页',
          linkRoute: "/"
        },
        {
          linkName: '编辑页',
          linkRoute: "/editor"
        }
      ]
    }
  }

  render() {
    return (
      <ul className="mainList">
        {
          this.state.links.map((item,index) => {
            let label = index === 0 ? <label><FontAwesomeIcon icon={faHome} /></label> :  <label><FontAwesomeIcon icon={faEdit}/></label>;
            return (
              <li key={item.linkName}>
                <Link to={item.linkRoute} >{label}{item.linkName}</Link>
              </li> );
          })
        }
      </ul>
    );
  }
}

export default LinkList;