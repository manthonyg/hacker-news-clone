import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import Nav from './components/Nav';
import Posts from './components/Posts';
// import UserInfo from './components/UserInfo';

function App() {
  return (
    <Router>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Roboto',
            weights: [400, 600, 800, '400i']
          },
          {
            font: 'Roboto Mono',
            weights: [400, 700]
          }
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
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
