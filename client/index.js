import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import Posts from './components/Posts';
import UserInfo from './components/UserInfo';
import './index.css';

function App() {
  return (
    <>
      <Nav />
      <UserInfo />
      <Posts />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
