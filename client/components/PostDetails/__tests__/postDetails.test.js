import React from "react";
import renderer from "react-test-renderer";
import PostDetails from "../PostDetails";

it("renders correctly with all props", () => {
  const requiredProps = {};
  const tree = renderer
    .create(
      <>
        <PostDetails {...requiredProps} />
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
