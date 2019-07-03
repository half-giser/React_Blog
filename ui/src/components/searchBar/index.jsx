import React,{Component} from 'react';

import CommonList from '../commonList/index';
import './index.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchRecode : ["test search string"]
    };
  }

  render() {
    return (
      <div className="inner-search">
        <input type="text" placeholder="请输入搜索关键词"/>
        <div className="search-history">
          <CommonList targetList = { this.state.searchRecode }></CommonList>
        </div>
      </div>
    )
  }
}

export default SearchBar;