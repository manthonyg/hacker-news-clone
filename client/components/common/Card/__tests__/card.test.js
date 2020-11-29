import React from "react";
import renderer from "react-test-renderer";
import Card from "../Card";

it("renders correctly", () => {
  const tree = renderer.create(<Card>Click me</Card>).toJSON();
  expect(tree).toMatchSnapshot();
});
