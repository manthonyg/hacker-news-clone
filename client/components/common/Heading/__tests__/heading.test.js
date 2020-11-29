import React from "react";
import renderer from "react-test-renderer";
import Heading from "../Heading";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <>
        <Heading h5>Header</Heading>
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
