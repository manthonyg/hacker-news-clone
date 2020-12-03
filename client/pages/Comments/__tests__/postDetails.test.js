import React from "react";
import renderer from "react-test-renderer";
import Comments from "../Comments";

it("renders correctly with all props", () => {
  const requiredProps = {};
  const tree = renderer
    .create(
      <>
        <Comments {...requiredProps} />
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
