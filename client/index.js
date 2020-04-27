import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Posts from './components/Posts';
// import UserInfo from './components/UserInfo';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" render={() => <Posts type="top" />} />
        <Route path="/new" render={() => <Posts type="new" />} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
