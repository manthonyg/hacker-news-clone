import { createGlobalStyle } from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) =>
      props.theme.theme === "light" ? "#c3c3c3" : "#121212"};
      color: ${(props) =>
        props.theme.theme === "light" ? "#121212" : "#eeeeee"};
        font-family: 'Roboto', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;
