import React from "react";
import renderer from "react-test-renderer";
import PostSkeleton from "../PostSkeleton";

it("renders correctly with all props", () => {
  const requiredProps = {
    numberOfSkeletons: 1,
    noEmoji: true,
  };

  const tree = renderer
    .create(
      <>
        <PostSkeleton {...requiredProps} />
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
