import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";
import { ThemeProvider } from "styled-components";
import { GlobalStyle as Theme } from "./utils/theme";
import Nav from "./components/Nav/Nav";
import Posts from "./components/Posts/Posts";
import UserInfo from "./components/UserInfo/UserInfo";
import PostDetails from "./components/PostDetails/PostDetails";
import Grid from "./components/common/Grid/Grid";
import GridItem from "./components/common/Grid/GridItem";

function App() {
  const [theme, setTheme] = useState({ theme: "dark" });

  const handleTheme = () => {
    setTheme({ theme: theme.theme === "light" ? "dark" : "light" });
  };
  return (
    <Grid cols="5% 90% auto" rows="30px auto">
      <Router>
        <ThemeProvider theme={theme}>
          <Theme />
          <GoogleFontLoader
            fonts={[
              {
                font: "Roboto",
                weights: [400, 600, 800, "400i"],
              },
              {
                font: "Roboto Mono",
                weights: [400, 700],
              },
              {
                font: "Manrope",
                weights: [400, 700],
              },
            ]}
            subsets={["cyrillic-ext", "greek"]}
          />
          <GridItem col="2" row="1">
            <Nav onClick={handleTheme} theme={theme} />
          </GridItem>
          <GridItem col="2" row="2">
            <Switch>
              <Route exact path="/" render={() => <Posts type="top" />} />
              <Route path="/user" render={() => <UserInfo />} />
              <Route path="/post" render={() => <PostDetails />} />
              <Route path="/best" render={() => <Posts type="best" />} />
              <Route path="/new" render={() => <Posts type="new" />} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </GridItem>
        </ThemeProvider>
      </Router>
    </Grid>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
