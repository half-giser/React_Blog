import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//Custom Component Import
import Client from "./Client";
import LinkList from './components/linkList/index';
import Avatar from './components/avatar/index';
import SearchBar from './components/searchBar/index';
import {TextEditor} from './components/textEditor';
// import FancyButton from './components/reusable';

import './App.css';

const Tech = ({ match }) => {
  return <div>Current Route: {match.params.tech}</div>
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  async componentDidMount() {
    Client.getSummary(summary => {
      this.setState({ title: summary.content });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <aside className="architecture">
            <Avatar></Avatar>
            <LinkList></LinkList>
          </aside>
          <div className="main-content">
            <h1>Welcome to {this.state.title}!</h1>
            <div className="route-container">
              <Route exact path="/" component={SearchBar}></Route>
              <Route path="/editor" component={TextEditor}></Route>
              <Route path="/:tech" component={Tech} />
            </div>
            <div>
              <h2>Check out the project on GitHub for more information</h2>
              <h3>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/yohangz/java-play-react-seed">
                  java-play-react-seed
                </a>
              </h3>
            </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
