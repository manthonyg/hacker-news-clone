import React from "react";
import renderer from "react-test-renderer";
import Grid from "../Grid";

it("renders correctly", () => {
  const tree = renderer
    .create(<Grid cols="95% 5% auto" rows="10% 80% auto"></Grid>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
