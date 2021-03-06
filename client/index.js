import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";
import { ThemeProvider } from "styled-components";
import { GlobalStyle as Theme } from "./utils/theme";
import Nav from "./components/common/Nav/Nav";
import Posts from "./pages/Posts/Posts";
import UserInfo from "./pages/UserInfo/UserInfo";
import Comments from "./pages/Comments/Comments";
import Grid from "./components/common/Grid/Grid";
import GridItem from "./components/common/Grid/GridItem";

function App() {
  const localStorageTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState({ theme: localStorageTheme || "light" });

  const handleTheme = () => {
    setTheme({ theme: theme.theme === "light" ? "dark" : "light" });
    setLocalStorage(theme.theme);
  };

  const setLocalStorage = (theme) => {
    if (theme === "light") {
      return localStorage.setItem("theme", "dark");
    }
    return localStorage.setItem("theme", "light");
  };

  return (
    <Grid cols="1% 98% auto">
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
              <Route path="/post" render={() => <Comments />} />
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
