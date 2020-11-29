import React from "react";
import renderer from "react-test-renderer";
import Flex from "../Flex";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <>
        <Flex>Flex content</Flex>
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
