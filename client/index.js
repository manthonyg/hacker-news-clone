import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Nav from './components/Nav/Nav';
import Posts from './components/Posts/Posts';
import UserInfo from './components/UserInfo/UserInfo';
import PostDetails from './components/PostDetails/PostDetails';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props =>
      props.theme.theme === 'light' ? 'white' : '#121212'};
      color: ${props =>
        props.theme.theme === 'light' ? '#212121' : '#eeeeee'};
        font-family: 'Roboto', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

function App() {
  const [theme, setTheme] = useState({ theme: 'light' });

  const handleTheme = () => {
    setTheme({ theme: theme.theme === 'light' ? 'dark' : 'light' });
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GoogleFontLoader
          fonts={[
            {
              font: 'Roboto',
              weights: [400, 600, 800, '400i']
            },
            {
              font: 'Roboto Mono',
              weights: [400, 700]
            },
            {
              font: 'Manrope',
              weights: [400, 700]
            }
          ]}
          subsets={['cyrillic-ext', 'greek']}
        />
        <Nav onClick={handleTheme} theme={theme} />
        <Switch>
          <Route exact path="/" render={() => <Posts type="top" />} />
          <Route path="/user" render={() => <UserInfo />} />
          <Route path="/post" render={() => <PostDetails />} />
          <Route path="/new" render={() => <Posts type="new" />} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
