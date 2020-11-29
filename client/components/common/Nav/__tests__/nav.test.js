import React from "react";
import renderer from "react-test-renderer";
import Nav from "../Nav";
import RenderWithRouter from "../../../../test_utils/renderWithRouter";

it("renders correctly", () => {
  const testTheme = { color: "red" };
  const tree = renderer
    .create(
      <RenderWithRouter>
        <Nav theme={testTheme}></Nav>
      </RenderWithRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
